import {Fn} from "@iapps/function-analytics";
import {Period} from "@iapps/period-utilities";
import mapLimit from "async/mapLimit";
import {chunk, find, flatten, uniq, uniqBy} from "lodash";
import {BehaviorSubject, of} from "rxjs";
import {map} from "rxjs/operators";

export default class ScorecardDataEngine {
    _loading$ = new BehaviorSubject();
    _dataEntities = {};
    _dataEntities$ = new BehaviorSubject(this._dataEntities);
    dataEntities$ = this._dataEntities$.asObservable();

    constructor() {
        if (!ScorecardDataEngine?.instance) {
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
                const currentPeriod = new Period().getById(period?.id);
                previousPeriods = [...previousPeriods, currentPeriod?.lastPeriod];
                return currentPeriod || period;
            }),
            "id"
        );

        previousPeriods.forEach((previousPeriod) => {
            const currentPeriod = find(this._selectedPeriods, [
                "id",
                previousPeriod?.id,
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

    _updateDataEntities(rows) {
        (rows || []).forEach((row) => {
            const dataEntityId = `${row?.dx?.id}_${row?.ou?.id}_${row?.pe?.id}`;
            const previousPeriod = find(this._selectedPeriods, [
                "id",
                row?.pe?.id,
            ])?.lastPeriod;

            const previousPeriodRow = rows.find(
                (previousRow) =>
                    previousRow?.dx?.id === row?.dx?.id &&
                    previousRow?.ou?.id === row?.ou?.id &&
                    previousRow?.pe?.id === previousPeriod?.id
            );

            this._dataEntities = {
                ...(this._dataEntities || {}),
                [dataEntityId]: {
                    current: row.value,
                    previous: previousPeriodRow?.value,
                },
            };

            this._dataEntities$.next(this._dataEntities);
            this._loading$.next(false);
        });
    }

    load() {
        if (this._canLoadData) {
            this._getScorecardData({
                selectedOrgUnits: this._selectedOrgUnits.map((orgUnit) => orgUnit?.id),
                selectedPeriods: this._selectedPeriods.map((period) => period?.id),
                selectedData: this._selectedData,
            });
        }
    }

    get loading$() {
        return this._loading$.asObservable();
    }

    get(id) {
        return this.dataEntities$.pipe(
            map((dataEntities) => (dataEntities ? dataEntities[id] : null))
        );
    }

    get _canLoadData() {
        return (
            this._selectedOrgUnits?.length > 0 &&
            this._selectedPeriods?.length > 0 &&
            (this._selectedData.normalDataItems?.length > 0 ||
                this._selectedData.customDataItems?.length > 0)
        );
    }

    _getScorecardData(selections) {
        const {selectedOrgUnits, selectedPeriods, selectedData} = selections;
        const {normalDataItems, customDataItems} = selectedData;

        this._getNormalScorecardData({
            selectedOrgUnits,
            selectedPeriods,
            selectedDataItems: normalDataItems,
        });

        this._getCustomScorecardData({
            selectedOrgUnits,
            selectedPeriods,
            selectedDataItems: customDataItems,
        });
    }

    _getAnalyticsData(selections) {
        let dx = [];
        let ou = [];
        let pe = [];

        (selections || []).forEach((selection) => {
            const availableData =
                this._dataEntities[`${selection.dx}_${selection.ou}_${selection.pe}`];

            if (!availableData) {
                dx = [...dx, selection.dx];
                ou = [...ou, selection.ou];
                pe = [...pe, selection.pe];
            }
        });

        dx = uniq(dx);
        ou = uniq(ou);
        pe = uniq(pe);

        if (dx?.length === 0 && ou?.length === 0 && pe?.length === 0) {
            return of(null).toPromise();
        }

        return new Fn.Analytics()
            .setOrgUnit(ou?.join(";"))
            .setPeriod(pe?.join(";"))
            .setData(dx.join(";"))
            .postProcess((analytics) => {
                this._updateDataEntities(analytics?.rows);
            })
            .get();
    }

    _getNormalScorecardData(selections) {
        const {selectedOrgUnits, selectedPeriods, selectedDataItems} = selections;

        let selectionList = [];

        selectedOrgUnits.forEach((orgUnit) => {
            const dataItemList = chunk(
                selectedDataItems.map((dataItem) => {
                    return selectedPeriods.map((period) => {
                        return {
                            dx: dataItem.id,
                            ou: orgUnit,
                            pe: period,
                        };
                    });
                }),
                2
            );

            dataItemList.forEach((selectedDataList) => {
                selectionList = [...selectionList, flatten(selectedDataList)];
            });
        });

        mapLimit(
            selectionList,
            10,
            (selection, callback) => {
                this._getAnalyticsData(selection)
                    .then((result) => {
                        callback(null, result);
                    })
                    .catch((error) => {
                        callback(error, null);
                    });
            },
            (totalErr, totalRes) => {
            }
        );
    }

    _getCustomScorecardData(selections) {
        const {selectedOrgUnits, selectedPeriods, selectedDataItems} = selections;
        if (selectedDataItems?.length === 0)
            return new Promise((resolve) => resolve(null));

        // TODO Add implementation when there is custom indicator
        new Promise((resolve) => resolve(null)).then(() => {
        });
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
