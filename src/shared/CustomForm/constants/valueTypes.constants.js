

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
    COLOR_PICKER: {
        name: 'COLOR_PICKER',
        formName: 'colorpicker'
    },
    ICON_PICKER: {
        name: 'ICON_PICKER',
        formName: 'iconpicker'
    }
}

export default DHIS2ValueTypes;
