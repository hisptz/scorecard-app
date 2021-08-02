import { flatten, uniqBy, find } from "lodash";
import { Period } from "@iapps/period-utilities";
import { Fn } from "@iapps/function-analytics";
import { BehaviorSubject } from "rxjs";
import { switchMap, filter, map } from "rxjs/operators";
export default class ScorecardDataEngine {
  _loading$ = new BehaviorSubject();
  constructor() {
    if (!ScorecardDataEngine.instance) {
      ScorecardDataEngine.instance = this;
    }

    return ScorecardDataEngine.instance;
  }

  setPeriodType(periodType) {
    this._periodType = periodType;
    this._selectedPeriods = this._getSelectedPeriods(
      this._selectedPeriods,
      periodType
    );

    return this;
  }

  setPeriods(periods) {
    let previousPeriods = [];
    this._selectedPeriods = uniqBy(
      (periods || []).map((period) => {
        const currentPeriod = new Period().getById(period.id);
        previousPeriods = [...previousPeriods, currentPeriod.lastPeriod];
        return currentPeriod || period;
      }),
      "id"
    );

    previousPeriods.forEach((previousPeriod) => {
      const currentPeriod = find(this._selectedPeriods, [
        "id",
        previousPeriod.id,
      ]);

      if (!currentPeriod) {
        this._selectedPeriods = [...this._selectedPeriods, previousPeriod];
      }
    });
    return this;
  }

  setDataGroups(dataGroups) {
    this._selectedData = this._getSelectedData(dataGroups);
    return this;
  }

  setOrgUnits(orgUnits) {
    this._selectedOrgUnits = orgUnits;
    return this;
  }

  load() {
    if (!this._loading && this._canLoadData()) {
      this._loading = true;
      this._loading$.next(this._loading);

      this._getScorecardData({
        selectedOrgUnits: this._selectedOrgUnits.map((orgUnit) => orgUnit.id),
        selectedPeriods: this._selectedPeriods.map((period) => period.id),
        selectedData: this._selectedData,
      })
        .then((res) => {
          this._loading = false;
          this._loading$.next(this._loading);

          const rows = flatten(
            (res || [])
              .filter((analytics) => analytics)
              .map((analytics) => {
                return analytics.rows;
              })
          );

          rows.forEach((row) => {
            const dataEntityId = `${row?.dx?.id}_${row?.ou?.id}_${row?.pe?.id}`;
            const previousPeriod = find(this._selectedPeriods, [
              "id",
              row?.pe?.id,
            ])?.lastPeriod;

            const previousPeriodRow = rows.find(
              (previuosRow) =>
                previuosRow?.dx?.id === row?.dx?.id &&
                previuosRow?.ou?.id === row?.ou?.id &&
                previuosRow?.pe?.id === previousPeriod?.id
            );

            this._dataEntities = {
              ...(this._dataEntities || {}),
              [dataEntityId]: {
                current: row.value,
                previous: previousPeriodRow?.value,
              },
            };
          });
        })
        .catch((error) => {
          this._loading = false;
          this._loading$.next(this._loading);
          this._loadingError = error;
        });
    }
  }

  get loading$() {
    return this._loading$.asObservable();
  }

  get dataEntities$() {
    return this._dataEntities$.asObservable();
  }

  get(id) {
    return this._loading$.asObservable().pipe(
      filter((loading) => !loading),
      map(() => (this._dataEntities ? this._dataEntities[id] : null))
    );
  }

  _canLoadData() {
    return (
      this._selectedOrgUnits.length > 0 &&
      this._selectedPeriods.length > 0 &&
      (this._selectedData.normalDataItems.length > 0 ||
        this._selectedData.customDataItems.length > 0)
    );
  }

  _getScorecardData(selections) {
    const { selectedOrgUnits, selectedPeriods, selectedData } = selections;
    const { normalDataItems, customDataItems } = selectedData;

    return new Promise((resolve, reject) => {
      Promise.all([
        this._getNormalScorecardData({
          selectedOrgUnits,
          selectedPeriods,
          selectedDataItems: normalDataItems,
        }),
        this._getCustomScorecardData({
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

  _getNormalScorecardData(selections) {
    const { selectedOrgUnits, selectedPeriods, selectedDataItems } = selections;
    return new Fn.Analytics()
      .setOrgUnit(selectedOrgUnits?.join(";"))
      .setPeriod(selectedPeriods?.join(";"))
      .setData(selectedDataItems.map((dataItem) => dataItem.id).join(";"))
      .get();
  }

  _getCustomScorecardData(selections) {
    const { selectedOrgUnits, selectedPeriods, selectedDataItems } = selections;
    if (selectedDataItems?.length === 0)
      return new Promise((resolve) => resolve(null));

    // TODO Add implementation when there is custom indicator
    new Promise((resolve) => resolve(null));
  }

  _getSelectedPeriods(periods, periodType) {
    if (periods?.length > 0) {
      return periods;
    }

    try {
      const periods = new Period()?.setType(periodType)?.get()?.list();
      const currentPeriod = periods ? periods[0] : null;
      return [
        currentPeriod,
        ...(currentPeriod?.lastPeriod ? [currentPeriod?.lastPeriod] : []),
      ];
    } catch (e) {
      console.warn(e);
      return null;
    }
  }

  _getSelectedData(dataGroups) {
    const selectedItems = flatten(
      (dataGroups || []).map((dataGroup) =>
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
}
