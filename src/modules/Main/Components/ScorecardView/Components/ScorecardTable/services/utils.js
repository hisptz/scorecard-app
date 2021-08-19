export function getTableWidthWithDataGroups(periods = [], dataGroups = [], averageColumn) {
    const noOfPeriods = periods?.length || 1;
    const noOfDataSources = dataGroups.reduce((prevValue, currentValue) => prevValue + currentValue.dataHolders?.length, 0)
    return (noOfDataSources * noOfPeriods * 102) + 350 + (averageColumn ? 102: 0);      //350 accounts for the static orgUnit and expand icon. 2px is for the border
}

export function getTableWidthWithOrgUnit(periods, orgUnits, averageColumn) {
    const noOfPeriods = periods?.length || 1;
    const noOfOrgUnits = orgUnits.length || 1;
    return (noOfOrgUnits * noOfPeriods * 102) + 350 + (averageColumn ? 102: 0) ;
}
