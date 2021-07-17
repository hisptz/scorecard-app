import { Period } from "@iapps/period-utilities";
export default async function getScorecardData(scorecard) {
  const selectedOrgUnits = _getSelectedOrgUnits(scorecard.orgUnitSelection);
  const { currentPeriods, previousPeriods } = _getSelectedPeriods(
    scorecard.periodSelection,
    scorecard.periodType
  );

  return Promise.all([
    _getScorecardData({ selectedOrgUnits, selectedPeriods: currentPeriods }),
    _getScorecardData({ selectedOrgUnits, selectedPeriods: previousPeriods }),
  ]);
}

function _getScorecardData(selections) {
  const { selectedOrgUnits, selectedPeriods } = selections;
  console.log(selectedOrgUnits, selectedPeriods);

  // TODO Set Data selection
  return new Promise((resolve, reject) =>
    resolve({ data: { value: "previous" } })
  );
}

function _getSelectedPeriods(periodSelection, periodType) {
  try {
    const periods = new Period()?.setType(periodType)?.get()?.list();
    const currentPeriod = periods ? periods[0] : null;
    return {
      currentPeriods: currentPeriod ? [currentPeriod.id] : [],
      previousPeriods: currentPeriod?.lastPeriod
        ? [currentPeriod.lastPeriod?.id]
        : [],
    };
  } catch (e) {
    console.warn(e);
    return null;
  }
}

function _getSelectedOrgUnits(orgUnitSelection) {
  let orgUnitString = [];
  if (orgUnitSelection.userOrgUnit) orgUnitString = ["USER_ORGUNIT"];
  if (orgUnitSelection.userSubUnit)
    orgUnitString = [...orgUnitString, "USER_ORGUNIT_CHILDREN"];
  if (orgUnitSelection.userSubX2Unit)
    orgUnitString = [...orgUnitString, "USER_ORGUNIT_GRANDCHILDREN"];
  if (orgUnitSelection?.orgUnitIds?.length > 0)
    orgUnitString = orgUnitSelection?.orgUnitIds;

  return orgUnitString;
}
