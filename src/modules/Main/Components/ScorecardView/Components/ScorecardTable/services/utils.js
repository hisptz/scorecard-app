export function getTableWidth(periods = [], dataGroups = [], screenWidth = 1366) {
    const noOfPeriods = periods?.length || 1;
    const noOfDataSources = dataGroups.reduce((prevValue, currentValue) => prevValue + currentValue.dataHolders?.length, 1)
    const width = noOfDataSources * noOfPeriods * 200
    return width > screenWidth ? width : screenWidth -34;
}
