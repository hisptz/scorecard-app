export function getTableWidth(periods = [], dataGroups = []) {
    const noOfPeriods = periods?.length || 1;
    const noOfDataSources = dataGroups.reduce((prevValue, currentValue) => prevValue + currentValue.dataHolders?.length, 0)
    return (noOfDataSources * noOfPeriods * 102) + 350;      //350 accounts for the static orgUnit and expand icon. 2px is for the border
}
