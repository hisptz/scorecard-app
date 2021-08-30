export const dataTypes = {
    DATA_ELEMENT: 'dataElement',
    PROGRAM_INDICATOR: 'programIndicator',
    DATASET_REPORTING_RATES: 'dataSet',
    ATTRIBUTES: 'attribute',
    CONSTANTS: 'constant',
    VARIABLE: 'variable',
    UNDEFINED: 'undefined'
}

export const dataSourceTypes = {
    INDICATOR: 'indicator',
    DATA_ELEMENT: 'dataElement'
}

//structure of dataElemet in store is
// [
//     {
//         "id":"dfds3ds.fdaf",
//         "val":"value from api",
//         "exprPart":"num/den",
//     }
// ]
