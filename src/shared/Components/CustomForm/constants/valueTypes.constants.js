

const DHIS2ValueTypes = {
    INTEGER: {
        name: 'INTEGER',
        formName: 'number',
    },
    TRUE_ONLY: {
        name: 'TRUE_ONLY',
        formName: 'checkbox'
    },
    TEXT: {
        name: 'TEXT',
        formName: 'text'
    },
    NUMBER: {
        name: 'NUMBER',
        formName: 'number'
    },
    DATE: {
        name: 'DATE',
        formName: 'date'
    },
    LONG_TEXT: {
        name: 'LONG_TEXT',
        formName: 'textarea'
    },
    LEGEND_DEFINITION: {
        name: 'LEGEND_DEFINITION',
        formName: 'legendDefinition'
    },
    RICH_TEXT: {
        name: 'RICH_TEXT',
        formName: 'richText'
    },
    LEGEND_MIN_MAX:{
        name: 'LEGEND_MIN_MAX',
        formName: 'legendMinMax'
    },
    MULTIPLE_FIELDS:{
        name: 'MULTIPLE_FIELDS',
        formName: 'multipleFields'
    }
}

export default DHIS2ValueTypes;
