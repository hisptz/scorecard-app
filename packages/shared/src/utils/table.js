import {ScorecardTableConstants} from "../constants";

export function getTableWidthWithDataGroups(
    periods = [],
    dataGroups = [],
    averageColumn
) {
    return getColSpanDataGroups(periods, dataGroups, averageColumn) * 105 + 200; //350 accounts for the static orgUnit and expand icon. 2px is for the border
}

export function getColSpanDataGroups(
    periods = [],
    dataGroups = [],
    averageColumn
) {
    const noOfPeriods = periods?.length || 1;
    const noOfDataSources = dataGroups.reduce(
        (prevValue, currentValue) => prevValue + currentValue.dataHolders?.length,
        0
    );
    return noOfDataSources * noOfPeriods + (averageColumn ? 1 : 0); //350 accounts for the static orgUnit and expand icon. 2px is for the border
}

export function getTableWidthWithOrgUnit(periods, orgUnits, averageColumn) {
    return getColSpanWithOrgUnit(periods, orgUnits, averageColumn) * 105 + 200;
}

export function getColSpanWithOrgUnit(periods, orgUnits, averageColumn) {
    const noOfPeriods = periods?.length || 1;
    const noOfOrgUnits = orgUnits.length || 1;
    return noOfOrgUnits * noOfPeriods + (averageColumn ? 1 : 0);
}

function getDataCellsWidth(screenWidth, colSpan) {
    return ScorecardTableConstants.CELL_WIDTH * colSpan;
}

export function getNameCellWidth(screenWidth, colSpan) {
    const dataCellsWidth = getDataCellsWidth(screenWidth, colSpan);
    const width = 100 - (dataCellsWidth / screenWidth) * 100;
    if (width > 30) {
        return `30%`
    }
    if (width > 10) {
        return `${Math.abs(width)}%`;
    }
    return `${200}px`;

}

export function getIncreasingStatus(current, previous, effectiveGap) {
    const parsedCurrentValue = parseFloat(current);
    const parsedPreviousValue = parseFloat(previous);
    if (Math.abs((parsedCurrentValue - parsedPreviousValue)) >= parseInt(effectiveGap)) {
        if (parsedCurrentValue > parsedPreviousValue) {
            return "increasing";
        }
        if (parsedCurrentValue < parsedPreviousValue) {
            return "decreasing";
        }
    }
    return null;
}
