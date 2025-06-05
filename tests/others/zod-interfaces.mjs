import { FlowMCP } from "../../src/index.mjs"
import { SchemaImporter } from 'schemaimporter'


const schemas = await SchemaImporter
    .loadFromFolder( {
        excludeSchemasWithImports: true,
        excludeSchemasWithRequiredServerParams: false,
        addAdditionalMetaData: true,
        outputType: null
    } )

schemas
    .forEach( ( { schema, namespace, fileName } ) => {
        console.log( `🧩 ${namespace} → ${fileName}` )
        const interfaces = FlowMCP
            .getZodInterfaces(  { schema } )

        Object
            .entries( interfaces )
            .forEach( ( [ key, value ] ) => {
                const { toolName, description, zod } = value
                console.log( ` - ${key} (${toolName})` )

            } )
        // console.log( '\n' )
    } )