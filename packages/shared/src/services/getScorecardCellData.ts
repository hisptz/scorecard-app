import { Fn } from "@iapps/function-analytics";
import { uniq } from "lodash";

export default async function getScorecardCellData({
	orgUnit,
	periods,
	dataSources,
}: any) {
	try {
		const previousPeriods = periods?.map((id: any) => {
			return;
		});
		const allPeriods = uniq([...periods, ...previousPeriods]);
		return await new Fn.Analytics()
			.setOrgUnit(orgUnit)
			.setPeriod(allPeriods?.join(";"))
			.setData(dataSources.join(";"))
			.get();
	} catch (e) {
		console.error(e);
	}
}

export async function getHighlightedIndicatorsData({
	orgUnits,
	periods,
	highlightedIndicators,
}: any) {
	try {
		return await new Fn.Analytics()
			.setOrgUnit(orgUnits?.join(";"))
			.setPeriod(periods?.join(";"))
			.setData(highlightedIndicators?.join(";"))
			.get();
	} catch (e) {
		console.error(e);
	}
}
