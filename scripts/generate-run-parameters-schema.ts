#!/usr/bin/env ts-node

import * as fs from 'fs'
import * as path from 'path'
import * as ts from 'typescript'

// Read and parse the API file
const apiFilePath = path.join(__dirname, '../src/codegen/api.ts')
const sourceFile = ts.createSourceFile(
    apiFilePath,
    fs.readFileSync(apiFilePath, 'utf8'),
    ts.ScriptTarget.Latest,
    true
)

interface PropertyInfo {
    name: string
    type: string
    optional: boolean
    comment?: string
    defaultValue?: string
}

// Extract JSDoc comments and default values
function extractJSDocInfo(node: ts.Node): {
    comment?: string
    defaultValue?: string
} {
    const result: { comment?: string; defaultValue?: string } = {}

    // Get JSDoc comments
    const jsDocTags = ts.getJSDocTags(node)
    const jsDocComments = ts.getJSDocCommentsAndTags(node)

    for (const comment of jsDocComments) {
        if (ts.isJSDoc(comment)) {
            if (comment.comment) {
                result.comment =
                    typeof comment.comment === 'string'
                        ? comment.comment
                        : comment.comment.map(part => part.text).join('')
            }

            // Look for @default tag
            for (const tag of comment.tags || []) {
                if (
                    tag.tagName &&
                    tag.tagName.text === 'default' &&
                    tag.comment
                ) {
                    result.defaultValue =
                        typeof tag.comment === 'string'
                            ? tag.comment
                            : tag.comment.map((part: any) => part.text).join('')
                }
            }
        }
    }

    return result
}

// Convert TypeScript type to Zod schema
function typeToZodSchema(
    typeNode: ts.TypeNode,
    propertyInfo: PropertyInfo
): string {
    const { name, optional, defaultValue } = propertyInfo

    switch (typeNode.kind) {
        case ts.SyntaxKind.StringKeyword:
            if (defaultValue !== undefined) {
                // Clean up the default value if it's already quoted
                const cleanDefault =
                    defaultValue.startsWith('"') && defaultValue.endsWith('"')
                        ? defaultValue.slice(1, -1)
                        : defaultValue
                return optional
                    ? `z.string().optional().default(${JSON.stringify(cleanDefault)})`
                    : `z.string().default(${JSON.stringify(cleanDefault)})`
            }
            return optional ? 'z.string().optional()' : 'z.string()'

        case ts.SyntaxKind.NumberKeyword:
            if (defaultValue !== undefined) {
                const numDefault = isNaN(Number(defaultValue))
                    ? defaultValue
                    : Number(defaultValue)
                return optional
                    ? `z.coerce.number().optional().default(${numDefault})`
                    : `z.coerce.number().default(${numDefault})`
            }
            return optional
                ? 'z.coerce.number().optional()'
                : 'z.coerce.number()'

        case ts.SyntaxKind.BooleanKeyword:
            if (defaultValue !== undefined) {
                const boolDefault =
                    defaultValue === 'true' || defaultValue === 'false'
                        ? defaultValue === 'true'
                        : Boolean(defaultValue)
                return optional
                    ? `z.coerce.boolean().optional().default(${boolDefault})`
                    : `z.coerce.boolean().default(${boolDefault})`
            }
            return optional
                ? 'z.coerce.boolean().optional()'
                : 'z.coerce.boolean()'

        case ts.SyntaxKind.ArrayType:
            const arrayType = typeNode as ts.ArrayTypeNode
            const elementType = arrayType.elementType
            if (elementType.kind === ts.SyntaxKind.StringKeyword) {
                return optional
                    ? 'z.array(z.string()).optional()'
                    : 'z.array(z.string())'
            }
            return optional
                ? 'z.array(z.unknown()).optional()'
                : 'z.array(z.unknown())'

        case ts.SyntaxKind.TypeReference:
            const typeRef = typeNode as ts.TypeReferenceNode
            let typeName: string
            if (ts.isIdentifier(typeRef.typeName)) {
                typeName = typeRef.typeName.text
            } else {
                typeName = propertyInfo.type
            }

            // Handle specific known types
            if (
                typeName === 'RunTemplateAssets' ||
                typeName === 'Extensions' ||
                typeName === 'FormTestingConfig'
            ) {
                return optional
                    ? 'z.record(z.unknown()).optional()'
                    : 'z.record(z.unknown())'
            }
            if (typeName.includes('WorkQueueItem')) {
                return optional
                    ? 'z.array(z.record(z.unknown())).optional()'
                    : 'z.array(z.record(z.unknown()))'
            }

            return optional ? 'z.unknown().optional()' : 'z.unknown()'

        default:
            // For object types and other complex types, use z.record(z.unknown())
            if (defaultValue === '{}') {
                return optional
                    ? 'z.record(z.unknown()).optional().default({})'
                    : 'z.record(z.unknown()).default({})'
            }
            return optional
                ? 'z.record(z.unknown()).optional()'
                : 'z.record(z.unknown())'
    }
}

// Find the RunParameters interface
function findRunParametersInterface(sourceFile: ts.SourceFile): PropertyInfo[] {
    const properties: PropertyInfo[] = []

    function visit(node: ts.Node) {
        if (
            ts.isInterfaceDeclaration(node) &&
            node.name.text === 'RunParameters'
        ) {
            for (const member of node.members) {
                if (
                    ts.isPropertySignature(member) &&
                    member.name &&
                    ts.isIdentifier(member.name)
                ) {
                    const propertyName = member.name.text
                    const isOptional = !!member.questionToken
                    const typeNode = member.type

                    if (typeNode) {
                        const jsDocInfo = extractJSDocInfo(member)
                        const typeText = typeNode.getText()

                        properties.push({
                            name: propertyName,
                            type: typeText,
                            optional: isOptional,
                            comment: jsDocInfo.comment,
                            defaultValue: jsDocInfo.defaultValue,
                        })
                    }
                }
            }
        }
        ts.forEachChild(node, visit)
    }

    visit(sourceFile)
    return properties
}

// Generate the Zod schema code
function generateZodSchema(properties: PropertyInfo[]): string {
    // Include all properties from the RunParameters interface since they're all part of StartRunRequestDTO['parameters']
    const userConfigurableProps = properties

    const schemaProperties = userConfigurableProps
        .map(prop => {
            // Create appropriate type node based on the actual type text
            let typeNode: ts.TypeNode
            if (prop.type === 'string') {
                typeNode = ts.factory.createKeywordTypeNode(
                    ts.SyntaxKind.StringKeyword
                )
            } else if (prop.type === 'number') {
                typeNode = ts.factory.createKeywordTypeNode(
                    ts.SyntaxKind.NumberKeyword
                )
            } else if (prop.type === 'boolean') {
                typeNode = ts.factory.createKeywordTypeNode(
                    ts.SyntaxKind.BooleanKeyword
                )
            } else if (prop.type === 'string[]') {
                typeNode = ts.factory.createArrayTypeNode(
                    ts.factory.createKeywordTypeNode(
                        ts.SyntaxKind.StringKeyword
                    )
                )
            } else if (prop.type.includes('[]')) {
                typeNode = ts.factory.createArrayTypeNode(
                    ts.factory.createKeywordTypeNode(
                        ts.SyntaxKind.UnknownKeyword
                    )
                )
            } else if (prop.type === 'object') {
                typeNode = ts.factory.createKeywordTypeNode(
                    ts.SyntaxKind.ObjectKeyword
                )
            } else {
                // For complex types like RunTemplateAssets, Extensions, etc.
                typeNode = ts.factory.createTypeReferenceNode(prop.type)
            }

            const zodType = typeToZodSchema(typeNode, prop)

            let result = ''
            if (prop.comment) {
                result += `        /**\n         * ${prop.comment}\n`
                if (prop.defaultValue !== undefined) {
                    result += `         * @default ${prop.defaultValue}\n`
                }
                result += `         */\n`
            }
            result += `        ${prop.name}: ${zodType},`

            return result
        })
        .join('\n')

    return `const defaultRunParameters = {
    path: '',
    depth: 3,
    duration: 0,
    stopAfterFlows: false,
    workQueueConfig: 'default',
    formTestingConfig: {},
    fastTestTables: false,
    extraHTTPHeaders: {},
    skipComponents: '',
    stopOnFlowError: false,
    enableModeling: true,
    useDatasetsForForms: false,
    fastTestLinks: false,
    pageLoadTimeout: 3000,
    actionRetryAttempts: 1,
    testableDomains: [],
    assets: {
        rules: [],
        data: [],
        activities: [],
    },
    extensions: {
        accessibility: false,
        brokenLinks: false,
        resources: false,
        performance: false,
        functional: false,
    },
    workQueue: [],
    name: '',
    _id: '',
} satisfies StartRunRequestDTO['parameters']

export const RunParametersSchema = z
    .object({
${schemaProperties}
    })
    .default(defaultRunParameters)`
}

// Generate the complete file content
function generateFileContent(zodSchema: string): string {
    return `import { z } from 'zod'
import yaml from 'js-yaml'
import { StartRunRequestDTO } from '../codegen/api'

${zodSchema}

export type RunParameters = z.infer<typeof RunParametersSchema>

/**
 * Parse and validate run parameters from a github actions workflow
 *
 * @param parameters The raw parameters obtained from the workflow file
 *
 * @throws if \`parameters\` is not valid JSON or YAML
 * @throws if \`parameters\` does not match the {@link RunParametersSchema expected schema}
 */
export const getRunParameters = (parameters: string): RunParameters => {
    // No parameters provided, use defaults
    if (!parameters) return RunParametersSchema.parse({})

    let parsed: unknown

    // users will likely be using yaml, so we'll try that first
    try {
        parsed = yaml.load(parameters)
    } catch {
        // try JSON next
        try {
            parsed = JSON.parse(parameters)
        } catch (e) {
            const error =new TypeError(
                'Unable to parse run parameters from your workflow file. ' +
                    'Please ensure that your parameters are valid JSON or YAML objects.'
            );
            (error as any).cause = e
            throw error
        }
    }

    const validated = RunParametersSchema.parse(parsed)
    return validated
}
`
}

// Main execution
function main() {
    console.log('🔍 Analyzing RunParameters interface...')

    const properties = findRunParametersInterface(sourceFile)
    if (properties.length === 0) {
        console.error('❌ RunParameters interface not found in API file')
        process.exit(1)
    }

    console.log(
        `📋 Found ${properties.length} properties in RunParameters interface`
    )

    const zodSchema = generateZodSchema(properties)
    const fileContent = generateFileContent(zodSchema)

    const outputPath = path.join(
        __dirname,
        '../src/inputs/run-parameters.inputs.ts'
    )
    fs.writeFileSync(outputPath, fileContent)

    console.log('✅ Successfully generated RunParametersSchema!')
    console.log(`📁 Updated: ${outputPath}`)
}

if (require.main === module) {
    main()
}
