import { ScorecardTableConstants } from "../constants";

export function getTableWidthWithDataGroups(
	periods = [],
	dataGroups = [],
	averageColumn: any,
) {
	return getColSpanDataGroups(periods, dataGroups, averageColumn) * 105 + 200; //350 accounts for the static orgUnit and expand icon. 2px is for the border
}

export function getColSpanDataGroups(
	periods = [],
	dataGroups = [],
	averageColumn: any,
) {
	const noOfPeriods = periods?.length || 1;
	const noOfDataSources = dataGroups.reduce(
		(prevValue: any, currentValue: any) =>
			prevValue + currentValue.dataHolders?.length,
		0,
	);
	return noOfDataSources * noOfPeriods + (averageColumn ? 1 : 0); //350 accounts for the static orgUnit and expand icon. 2px is for the border
}

export function getTableWidthWithOrgUnit(
	periods: any,
	orgUnits: any,
	averageColumn: any,
) {
	return getColSpanWithOrgUnit(periods, orgUnits, averageColumn) * 105 + 200;
}

export function getColSpanWithOrgUnit(
	periods: any,
	orgUnits: any,
	averageColumn: any,
) {
	const noOfPeriods = periods?.length || 1;
	const noOfOrgUnits = orgUnits.length || 1;
	return noOfOrgUnits * noOfPeriods + (averageColumn ? 1 : 0);
}

function getDataCellsWidth(screenWidth: any, colSpan: any) {
	return ScorecardTableConstants.CELL_WIDTH * colSpan;
}

export function getNameCellWidth(screenWidth: any, colSpan: any) {
	const dataCellsWidth = getDataCellsWidth(screenWidth, colSpan);
	const width = 100 - (dataCellsWidth / screenWidth) * 100;
	if (width > 30) {
		return `30%`;
	}
	if (width > 10) {
		return `${Math.abs(width)}%`;
	}
	return `${200}px`;
}

export function getIncreasingStatus(
	current: any,
	previous: any,
	effectiveGap: any,
) {
	const parsedCurrentValue = parseFloat(current);
	const parsedPreviousValue = parseFloat(previous);
	if (
		Math.abs(parsedCurrentValue - parsedPreviousValue) >= parseInt(effectiveGap)
	) {
		if (parsedCurrentValue > parsedPreviousValue) {
			return "increasing";
		}
		if (parsedCurrentValue < parsedPreviousValue) {
			return "decreasing";
		}
	}
	return null;
}
