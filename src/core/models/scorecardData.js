import {Fn} from "@iapps/function-analytics";
import {Period} from "@iapps/period-utilities";
import mapLimit from "async/mapLimit";
import {
    chunk,
    find,
    flatten,
    forIn,
    groupBy,
    head,
    isEmpty,
    last,
    pickBy,
    reduce,
    sortBy,
    toPairs,
    uniq,
    uniqBy
} from "lodash";
import {BehaviorSubject, of} from "rxjs";
import {map, take} from "rxjs/operators";
import {TableSort} from "../constants/tableSort";

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
        });
    }

    load() {
        if (this._canLoadData) {
            this._loading$.next(true)
            this._getScorecardData({
                selectedOrgUnits: this._selectedOrgUnits.map((orgUnit) => orgUnit?.id),
                selectedPeriods: this._selectedPeriods.map((period) => period?.id),
                selectedData: this._selectedData,
            });
        }
    }

    isRowEmpty(orgUnitId = '') {
        return this.dataEntities$.pipe(
            map((dataEntities) => {
                const orgUnitsData = pickBy(dataEntities, (val, key) => key.match(RegExp(orgUnitId)))
                return isEmpty(orgUnitsData)
            })
        );
    }

    isDataSourcesRowEmpty(dataSources = []) {
        return this.dataEntities$.pipe(
            map((dataEntities) => {
                const orgUnitsData = pickBy(dataEntities, (_, key) => key.match(RegExp(head(dataSources))) || key.match(RegExp(last(dataSources))))
                return isEmpty(orgUnitsData)
            })
        );
    }

    sortOrgUnitsByDataAndPeriod({dataSource, period, sortType}) {
        return this.dataEntities$.pipe(take(1), map(dataEntities => {
            if (sortType === TableSort.DEFAULT) {
                return []
            }
            const requiredDataEntities = pickBy(dataEntities, (value, key) => {
                const [dx, , pe] = key.split('_');
                return dx === dataSource && pe === period
            })
            const sortedOrgUnits = sortBy(toPairs(requiredDataEntities), [(value) => last(value)?.current])

            if (sortType === TableSort.DESC) {
                return sortedOrgUnits.reverse().map(([key]) => key?.split('_')[1])
            }
            return sortedOrgUnits.map(([key]) => key?.split('_')[1])
        }))
    }

    sortOrgUnitsByData({dataSource, periods = [], sortType}) {
        return this.dataEntities$.pipe(take(1), map(dataEntities => {
            if (sortType === TableSort.DEFAULT) {
                return []
            }
            const requiredDataEntities = pickBy(dataEntities, (value, key) => {
                const [dx, , pe] = key.split('_');
                return dx === dataSource && periods.includes(pe)
            })
            const groupedValues = groupBy(toPairs(requiredDataEntities), (value) => (head(value)?.split('_'))[1])
            const averageValues = {}

            forIn(groupedValues, (value, key) => {
                averageValues[key] = reduce(value, (acc, arr) => {
                    return acc + (last(arr)?.current / periods?.length)
                }, 0)
            })

            const sortedValues = sortBy(toPairs(averageValues), [(value) => last(value)])

            if (sortType === TableSort.DESC) {
                return sortedValues?.map(([ou]) => ou)?.reverse()
            }
            return sortedValues?.map(([ou]) => ou)
        }))
    }

    sortDataSourceByOrgUnitAndPeriod({orgUnit, period, sortType}) {
        return this.dataEntities$.pipe(take(1), map(dataEntities => {
            if (sortType === TableSort.DEFAULT) {
                return []
            }
            const requiredDataEntities = pickBy(dataEntities, (value, key) => {
                const [, ou, pe] = key.split('_');
                return ou === orgUnit && pe === period
            })
            const sortedOrgUnits = sortBy(toPairs(requiredDataEntities), [(value) => parseInt(last(value)?.current)])
            if (sortType === TableSort.DESC) {
                return sortedOrgUnits.reverse().map(([key]) => key?.split('_')[0])
            }
            return sortedOrgUnits.map(([key]) => key?.split('_')[0])
        }))
    }

    sortDataSourceByOrgUnit({periods, orgUnit, sortType}) {
        return this.dataEntities$.pipe(take(1), map(dataEntities => {
            if (sortType === TableSort.DEFAULT) {
                return []
            }
            const requiredDataEntities = pickBy(dataEntities, (value, key) => {
                const [, ou, pe] = key.split('_');
                return ou === orgUnit && periods.includes(pe)
            })
            const groupedValues = groupBy(toPairs(requiredDataEntities), (value) => (head(value)?.split('_'))[0])
            const averageValues = {}

            forIn(groupedValues, (value, key) => {
                averageValues[key] = reduce(value, (acc, arr) => {
                    return acc + (last(arr)?.current / periods?.length)
                }, 0)
            })

            const sortedValues = sortBy(toPairs(averageValues), [(value) => last(value)])

            if (sortType === TableSort.DESC) {
                return sortedValues?.map(([ou]) => ou)?.reverse()
            }
            return sortedValues?.map(([ou]) => ou)
        }))

    }

    getOrgUnitAverage(orgUnitId = '') {
        return this.dataEntities$.pipe(
            map((dataEntities) => {
                const orgUnitsData = pickBy(dataEntities, (val, key) => key.match(RegExp(orgUnitId)))
                const noOfOrgUnits = Object.keys(orgUnitsData).length
                return reduce(orgUnitsData, (result, value) => {
                    return (result ?? 0) + (value.current / noOfOrgUnits)
                }, 0);
            })
        );
    }

    getDataSourceAverage(dataSources = []) {
        return this.dataEntities$.pipe(
            map((dataEntities) => {
                const dataSourcesData = pickBy(dataEntities, (_, key) => key.match(RegExp(head(dataSources))) || key.match(RegExp(last(dataSources))))
                const noOfDataSources = Object.keys(dataSourcesData).length;
                return reduce(dataSourcesData, (result, value) => {
                    return (result ?? 0) + (value.current / noOfDataSources)
                }, 0);
            })
        );
    }

    getOrgUnitColumnAverage({period, orgUnit}) {
        return this.dataEntities$.pipe(
            map((dataEntities) => {
                const orgUnitsData = pickBy(dataEntities, (val, key) => {
                    const [, ou, pe] = key.split('_')
                    return ou === orgUnit && pe === period
                })
                const noOfOrgUnits = Object.keys(orgUnitsData).length
                return reduce(orgUnitsData, (result, value) => {
                    return (result ?? 0) + (value.current / noOfOrgUnits)
                }, 0);
            })
        );
    }

    getDataSourceColumnAverage({period, dataSources, orgUnits}) {
        return this.dataEntities$.pipe(
            map((dataEntities) => {
                const dataSourcesData = pickBy(dataEntities, (val, key) => {
                    const [dx, ou, pe] = key.split('_')
                    return dataSources.includes(dx) && pe === period && orgUnits?.includes(ou)
                })
                const noOfDataSources = Object.keys(dataSourcesData).length
                return reduce(dataSourcesData, (result, value) => {
                    return (result ?? 0) + (value.current / noOfDataSources)
                }, 0);
            })
        );
    }

    getOverallAverage(orgUnits) {
        return this.dataEntities$.pipe(
            map((dataEntities) => {
                if (!isEmpty(dataEntities)) {
                    const selectedDataEntities = pickBy(dataEntities, (value, key) => {
                        const [, ou,] = key.split('_')
                        return orgUnits?.includes(ou)
                    })
                    const noOfDataEntities = Object.keys(selectedDataEntities).length
                    return reduce(selectedDataEntities, (result, value) => {
                        return (result ?? 0) + (value.current / noOfDataEntities)
                    }, 0);
                }
            })
        );
    }

    getAllOrgUnitData(orgUnits) {
        return this.dataEntities$.pipe(
            map((dataEntities) => {
                return pickBy(dataEntities, (value, key) => {
                    const [, ou,] = key.split('_')
                    return orgUnits?.includes(ou)
                })
            })
        );
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

    reset() {
        this._dataEntities = {}
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
                this._loading$.next(false)
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
