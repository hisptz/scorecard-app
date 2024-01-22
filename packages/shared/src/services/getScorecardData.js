import { Fn } from "@iapps/function-analytics";
import { Period } from "@iapps/period-utilities";
import { flatten } from "lodash";

export default async function getScorecardData(scorecard) {
  const selectedOrgUnits = _getSelectedOrgUnits(scorecard.orgUnitSelection);
  const { currentPeriods, previousPeriods } = _getSelectedPeriods(
    scorecard.periodSelection,
    scorecard.periodType
  );
  const selectedData = _getSelectedData(scorecard.dataSelection);

  return Promise.all([
    _getScorecardData({
      selectedOrgUnits,
      selectedPeriods: currentPeriods,
      selectedData,
    }),
    _getScorecardData({
      selectedOrgUnits,
      selectedPeriods: previousPeriods,
      selectedData,
    }),
  ]);
}

function _getScorecardData(selections) {
  const { selectedOrgUnits, selectedPeriods, selectedData } = selections;
  const { normalDataItems, customDataItems } = selectedData;

  return new Promise((resolve, reject) => {
    Promise.all([
      _getNormalScorecardData({
        selectedOrgUnits,
        selectedPeriods,
        selectedDataItems: normalDataItems,
      }),
      _getCustomScorecardData({
        selectedOrgUnits,
        selectedPeriods,
        selectedDataItems: customDataItems,
      }),
    ])
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function _getNormalScorecardData(selections) {
  const { selectedOrgUnits, selectedPeriods, selectedDataItems } = selections;
  return new Fn.Analytics()
    .setOrgUnit(selectedOrgUnits?.join(";"))
    .setPeriod(selectedPeriods?.join(";"))
    .setData(selectedDataItems.map((dataItem) => dataItem.id).join(";"))
    .get();
}

function _getCustomScorecardData(selections) {
  const { selectedOrgUnits, selectedPeriods, selectedDataItems } = selections;
  if (selectedDataItems?.length === 0) {
    return new Promise((resolve) => resolve(null));
  }

  // TODO Add implementation when there is custom indicator
  new Promise((resolve) => resolve(null));
}

// TODO Derive selected period from period selection if supplied
function _getSelectedPeriods(periodSelection, periodType) {
  try {
    const periods = new Period().setPreferences({ allowFuturePeriods: true })?.setType(periodType)?.get()?.list();
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
  if (orgUnitSelection.userOrgUnit) {
    orgUnitString = ["USER_ORGUNIT"];
  }
  if (orgUnitSelection.userSubUnit) {
    orgUnitString = [...orgUnitString, "USER_ORGUNIT_CHILDREN"];
  }
  if (orgUnitSelection.userSubX2Unit) {
    orgUnitString = [...orgUnitString, "USER_ORGUNIT_GRANDCHILDREN"];
  }
  if (orgUnitSelection?.orgUnitIds?.length > 0) {
    orgUnitString = orgUnitSelection?.orgUnitIds;
  }

  return orgUnitString;
}

function _getSelectedData(dataSelection) {
  const selectedItems = flatten(
    dataSelection?.dataGroups.map((dataGroup) =>
      flatten(
        (dataGroup?.dataHolders || []).map(
          (dataHolder) => dataHolder.dataSources
        )
      )
    )
  );
  return {
    normalDataItems: selectedItems.filter(
      (selectedItem) => selectedItem.type !== "functionRule"
    ),
    customDataItems: selectedItems.filter(
      (selectedItem) => selectedItem.type === "functionRule"
    ),
  };
}
