

export const dataTypes={
    DATA_ELEMENT:0,
    PROGRAM_INDICATOR:1,
    DATASET_REPORTING_RATES:2,
    ATTRIBUTES:3,
    CONSTANTS:4,
    VARIABLE:5,
    UNDEFINED:'undefined'
}

export const dataSourceTypes={
    INDICATOR: 0,
    DATA_ELEMENT: 1
}

//structure of dataElemet in store is
// [
//     {
//         "id":"dfds3ds.fdaf",
//         "val":"value from api",
//         "exprPart":"num/den",
//     }
// ]