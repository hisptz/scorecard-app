export function getTableWidth(periods = [], dataGroups = [], screenWidth = 1366) {
    const noOfPeriods = periods?.length || 1;
    const noOfDataSources = dataGroups.reduce((prevValue, currentValue) => prevValue + currentValue.dataHolders?.length, 0)
    const width = (noOfDataSources * noOfPeriods * 202) + 350; //350 accounts for the static orgUnit and expand icon. 2px is for the border
    return width > screenWidth ? width : screenWidth -34;
}
