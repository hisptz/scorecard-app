import { Fn } from "@iapps/function-analytics";
import { uniq } from "lodash";
import { Period } from "period-utilities";

export default async function getScorecardCellData({
  orgUnit,
  periods,
  dataSources,
}) {
  try {
    const previousPeriods = periods?.map((id) => {
      const period = new Period().setPreferences({ allowFuturePeriods: true }).getById(id);
      return period?.lastPeriod?.id;
    });
    const allPeriods = uniq([...periods, ...previousPeriods]);
    return await new Fn.Analytics()
      .setOrgUnit(orgUnit)
      .setPeriod(allPeriods?.join(";"))
      .setData(dataSources.join(";"))
      .get();
  } catch (e) {
    console.log(e);
  }
}

export async function getHighlightedIndicatorsData({
  orgUnits,
  periods,
  highlightedIndicators,
}) {
  try {
    return await new Fn.Analytics()
      .setOrgUnit(orgUnits?.join(";"))
      .setPeriod(periods?.join(";"))
      .setData(highlightedIndicators?.join(";"))
      .get();
  } catch (e) {
    console.log(e);
  }
}
