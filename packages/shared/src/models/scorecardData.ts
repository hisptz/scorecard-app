import { Fn } from "@iapps/function-analytics";
import { Period } from "@iapps/period-utilities";
import mapLimit from "async/mapLimit";
import {
	chunk,
	compact,
	differenceBy,
	find,
	flatten,
	forIn,
	fromPairs,
	groupBy,
	head,
	isEmpty,
	last,
	pickBy,
	reduce,
	sortBy,
	toPairs,
	uniq,
	uniqBy,
} from "lodash";
import { BehaviorSubject, of } from "rxjs";
import { map, take } from "rxjs/operators";
import $ from "jquery";
import { TableSort } from "../constants";

export default class ScorecardDataEngine {
	engine;
	_cancelled = false;
	_totalRequests = 0;
	_progress = 0;
	_progress$ = new BehaviorSubject();
	_dataEntities = {};
	_dataEntities$ = new BehaviorSubject(this._dataEntities);
	dataEntities$ = this._dataEntities$.asObservable();
	_previousPeriods = [];
	_calendar;

	constructor() {
		this._cancelled = false;
	}

	_loading$ = new BehaviorSubject();

	get loading$() {
		return this._loading$.asObservable();
	}

	get _canLoadData() {
		return (
			this._selectedOrgUnits?.length > 0 &&
			this._selectedPeriods?.length > 0 &&
			(this._selectedData.normalDataItems?.length > 0 ||
				this._selectedData.customDataItems?.length > 0)
		);
	}

	setDataQueryEngine(engine) {
		this.engine = engine;
		return this;
	}

	setPeriodType(periodType) {
		this._periodType = periodType;
		this._selectedPeriods = this._getSelectedPeriods(
			this._selectedPeriods,
			periodType,
		);
		return this;
	}

	refresh() {
		this.reset(false);
		this.load();
		return this;
	}

	setPeriods(periods: any) {
		let previousPeriods: any = [];
		this._selectedPeriods = uniqBy(
			(periods || []).map((period: any) => {
				const currentPeriod = new Period()
					.setPreferences({ allowFuturePeriods: true })
					.setCalendar(this._calendar)
					.getById(period?.id);
				previousPeriods = [...previousPeriods, currentPeriod?.lastPeriod];
				return currentPeriod || period;
			}),
			"id",
		);
		previousPeriods.forEach((previousPeriod: any) => {
			const currentPeriod = find(this._selectedPeriods, [
				"id",
				previousPeriod?.id,
			]);
			if (!currentPeriod) {
				this._selectedPeriods = compact([
					...this._selectedPeriods,
					previousPeriod,
				]);
			}
		});
		this._previousPeriods =
			compact(
				differenceBy(previousPeriods, periods, "id")?.map((period: any) => {
					return period?.id;
				}),
			) ?? [];
		return this;
	}

	setCalendar(calendar: any) {
		this._calendar = calendar;
		return this;
	}

	setDataGroups(dataGroups: any) {
		this._selectedData = this._getSelectedData(dataGroups);
		return this;
	}

	setOrgUnits(orgUnits: any) {
		this._selectedOrgUnits = orgUnits;
		return this;
	}

	_updateDataEntities(rows: any) {
		(rows || []).forEach((row: any) => {
			const dataEntityId = `${row?.dx?.id}_${row?.ou?.id}_${row?.pe?.id}`;
			const previousPeriod = find(this._selectedPeriods, ["id", row?.pe?.id])
				?.lastPeriod;

			const previousPeriodRow = rows.find(
				(previousRow: any) =>
					previousRow?.dx?.id === row?.dx?.id &&
					previousRow?.ou?.id === row?.ou?.id &&
					previousRow?.pe?.id === previousPeriod?.id,
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
			this._loading$.next(true);
			this._cancelled = false;
			this._progress = 0;
			this._progress$.next(this._progress);
			this._getScorecardData({
				selectedOrgUnits: this._selectedOrgUnits.map(
					(orgUnit: any) => orgUnit?.id,
				),
				selectedPeriods: this._selectedPeriods.map((period: any) => period?.id),
				selectedData: this._selectedData,
			});
		}
	}

	getProgress() {
		return this._progress$.pipe(
			map((progress: any) => {
				return Math.floor((progress / this._totalRequests) * 100);
			}),
		);
	}

	isRowEmpty(orgUnitId = "") {
		return this.dataEntities$.pipe(
			map((dataEntities) => {
				const orgUnitsData = pickBy(dataEntities, (val, key) =>
					key.match(RegExp(orgUnitId)),
				);
				return isEmpty(orgUnitsData);
			}),
		);
	}

	isDataSourcesRowEmpty(dataSources = []) {
		return this.dataEntities$.pipe(
			map((dataEntities) => {
				const orgUnitsData = pickBy(
					dataEntities,
					(_, key) =>
						key.match(RegExp(head(dataSources))) ||
						key.match(RegExp(last(dataSources))),
				);
				return isEmpty(orgUnitsData);
			}),
		);
	}

	sortOrgUnitsByDataAndPeriod({ dataSource, period, sortType }: any) {
		return this.dataEntities$.pipe(
			take(1),
			map((dataEntities) => {
				if (sortType === TableSort.DEFAULT) {
					return [];
				}
				const requiredDataEntities = pickBy(dataEntities, (value, key) => {
					const [dx, , pe] = key.split("_");
					return dx === dataSource && pe === period;
				});

				const sortedOrgUnits = sortBy(toPairs(requiredDataEntities), [
					(value) => +last(value)?.current,
				]);

				if (sortType === TableSort.DESC) {
					return sortedOrgUnits.reverse().map(([key]) => key?.split("_")[1]);
				}
				return sortedOrgUnits.map(([key]) => key?.split("_")[1]);
			}),
		);
	}

	sortOrgUnitsByData({ dataSource, periods = [], sortType }: any) {
		return this.dataEntities$.pipe(
			take(1),
			map((dataEntities) => {
				if (sortType === TableSort.DEFAULT) {
					return [];
				}
				const requiredDataEntities = pickBy(dataEntities, (value, key) => {
					const [dx, , pe] = key.split("_");
					return dx === dataSource && periods.includes(pe);
				});
				const groupedValues = groupBy(
					toPairs(requiredDataEntities),
					(value) => (head(value)?.split("_"))[1],
				);
				const averageValues: any = {};

				forIn(groupedValues, (value, key) => {
					averageValues[key] = reduce(
						value,
						(acc, arr) => {
							return acc + last(arr)?.current / periods?.length;
						},
						0,
					);
				});

				const sortedValues = sortBy(toPairs(averageValues), [
					(value) => last(value),
				]);

				if (sortType === TableSort.DESC) {
					return sortedValues?.map(([ou]) => ou)?.reverse();
				}
				return sortedValues?.map(([ou]) => ou);
			}),
		);
	}

	sortDataSourceByOrgUnitAndPeriod({ orgUnit, period, sortType }: any) {
		return this.dataEntities$.pipe(
			take(1),
			map((dataEntities) => {
				if (sortType === TableSort.DEFAULT) {
					return [];
				}
				const requiredDataEntities = pickBy(dataEntities, (value, key) => {
					const [, ou, pe] = key.split("_");
					return ou === orgUnit && pe === period;
				});
				const sortedOrgUnits = sortBy(toPairs(requiredDataEntities), [
					(value) => parseInt(last(value)?.current),
				]);
				if (sortType === TableSort.DESC) {
					return sortedOrgUnits.reverse().map(([key]) => key?.split("_")[0]);
				}
				return sortedOrgUnits.map(([key]) => key?.split("_")[0]);
			}),
		);
	}

	sortDataSourceByOrgUnit({ periods, orgUnit, sortType }: any) {
		return this.dataEntities$.pipe(
			take(1),
			map((dataEntities) => {
				if (sortType === TableSort.DEFAULT) {
					return [];
				}
				const requiredDataEntities = pickBy(dataEntities, (value, key) => {
					const [, ou, pe] = key.split("_");
					return ou === orgUnit && periods.includes(pe);
				});
				const groupedValues = groupBy(
					toPairs(requiredDataEntities),
					(value) => (head(value)?.split("_"))[0],
				);
				const averageValues: any = {};

				forIn(groupedValues, (value, key) => {
					averageValues[key] = reduce(
						value,
						(acc, arr) => {
							return acc + last(arr)?.current / periods?.length;
						},
						0,
					);
				});

				const sortedValues = sortBy(toPairs(averageValues), [
					(value) => last(value),
				]);

				if (sortType === TableSort.DESC) {
					return sortedValues?.map(([ou]) => ou)?.reverse();
				}
				return sortedValues?.map(([ou]) => ou);
			}),
		);
	}

	getOrgUnitAverage(orgUnitId = "") {
		return this.dataEntities$.pipe(
			map((dataEntities) => {
				const orgUnitsData = pickBy(dataEntities, (val, key) => {
					const [, ou, pe] = key.split("_");
					return (
						ou === orgUnitId &&
						!this._previousPeriods.includes(pe) &&
						!!find(this._selectedPeriods, (period: any) => period?.id === pe)
					);
				});
				const noOfOrgUnits = Object.keys(orgUnitsData).length;

				if (
					compact(
						Object.values(orgUnitsData).map(({ current }: any) => current),
					)?.length === 0
				) {
					return undefined;
				}
				return reduce(
					orgUnitsData,
					(result, value) => {
						return (result ?? 0) + value.current / noOfOrgUnits;
					},
					0,
				);
			}),
		);
	}

	getDataSourceAverage(dataSources = []) {
		return this.dataEntities$.pipe(
			map((dataEntities) => {
				const data: any = {};
				for (const dataSource of dataSources) {
					const dataSourcesData = pickBy(dataEntities, (_, key) => {
						const [dx, ou, pe] = key.split("_");
						return (
							dataSource === dx &&
							!this._previousPeriods.includes(pe) &&
							!!find(
								this._selectedPeriods,
								(period: any) => period?.id === pe,
							) &&
							this._selectedOrgUnits
								?.map((orgUnit: any) => orgUnit?.id)
								.includes(ou)
						);
					});
					const noOfDataSources = Object.keys(dataSourcesData).length;
					if (
						compact(
							Object.values(dataSourcesData).map(({ current }) => current),
						)?.length === 0
					) {
						data[dataSource] = undefined;
					} else {
						data[dataSource] = reduce(
							dataSourcesData,
							(result, value) => {
								return (result ?? 0) + value.current / noOfDataSources;
							},
							0,
						);
					}
				}

				return data;
			}),
		);
	}

	getOrgUnitColumnAverage({ period, orgUnit }: any) {
		return this.dataEntities$.pipe(
			map((dataEntities) => {
				const orgUnitsData = pickBy(dataEntities, (val, key) => {
					const [, ou, pe] = key.split("_");
					return ou === orgUnit && pe === period;
				});
				const noOfOrgUnits = Object.keys(orgUnitsData).length;
				if (
					compact(
						Object.values(orgUnitsData).map(({ current }: any) => current),
					)?.length === 0
				) {
					return undefined;
				}
				return reduce(
					orgUnitsData,
					(result, value) => {
						return (result ?? 0) + value.current / noOfOrgUnits;
					},
					0,
				);
			}),
		);
	}

	getDataSourceColumnAverage({ period, dataSources, orgUnits }: any) {
		return this.dataEntities$.pipe(
			map((dataEntities) => {
				const data = {};

				for (const dataSource of dataSources) {
					const dataSourcesData = pickBy(dataEntities, (val, key) => {
						const [dx, ou, pe] = key.split("_");
						return dataSource === dx && pe === period && orgUnits?.includes(ou);
					});
					const noOfDataSources = Object.keys(dataSourcesData).length;
					if (
						compact(
							Object.values(dataSourcesData).map(({ current }: any) => current),
						)?.length === 0
					) {
						data[dataSource] = undefined;
					} else {
						data[dataSource] = reduce(
							dataSourcesData,
							(result, value) => {
								return (result ?? 0) + value.current / noOfDataSources;
							},
							0,
						);
					}
				}
				return data;
			}),
		);
	}

	getOverallAverage(orgUnits: any) {
		return this.dataEntities$.pipe(
			map((dataEntities) => {
				if (!isEmpty(dataEntities)) {
					const selectedDataEntities = pickBy(dataEntities, (value, key) => {
						const [, ou, pe] = key.split("_");
						return (
							orgUnits?.includes(ou) &&
							!this._previousPeriods.includes(pe) &&
							!!find(this._selectedPeriods, (period: any) => period?.id === pe)
						);
					});
					const noOfDataEntities = Object.keys(selectedDataEntities).length;
					if (
						compact(
							Object.values(selectedDataEntities).map(({ current }) => current),
						)?.length === 0
					) {
						return undefined;
					}
					return reduce(
						selectedDataEntities,
						(result, value) => {
							return (result ?? 0) + value.current / noOfDataEntities;
						},
						0,
					);
				}
			}),
		);
	}

	getAllOrgUnitData(orgUnits: any) {
		return this.dataEntities$.pipe(
			map((dataEntities) => {
				return pickBy(dataEntities, (value, key) => {
					const [, ou] = key.split("_");
					return orgUnits?.includes(ou);
				});
			}),
		);
	}

	get(id: any) {
		return this.dataEntities$.pipe(
			map((dataEntities) => (dataEntities ? dataEntities[id] : null)),
		);
	}

	reset(cancel = false) {
		this._totalRequests = 0;
		this._progress = 0;
		this._progress$ = new BehaviorSubject();
		this._loading$ = new BehaviorSubject();
		this._dataEntities = {};
		this._dataEntities$ = new BehaviorSubject(this._dataEntities);
		this.dataEntities$ = this._dataEntities$.asObservable();
		this._previousPeriods = [];
		this._dataEntities = {};
		this._cancelled = cancel;
	}

	_getScorecardData(selections: any) {
		const { selectedOrgUnits, selectedPeriods, selectedData } = selections;
		const { normalDataItems, customDataItems } = selectedData;

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

	_getAnalyticsData(selections: any) {
		if (!this._cancelled) {
			let dx: any = [];
			let ou: any = [];
			let pe: any = [];

			(selections || []).forEach((selection: any) => {
				const availableData = this._dataEntities[
					`${selection.dx}_${selection.ou}_${selection.pe}`
				];

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
				.postProcess((analytics: any) => {
					this._updateDataEntities(analytics?.rows);
				})
				.get();
		}
		return of(null).toPromise();
	}

	_getCustomAnalyticsData(selections: any) {
		if (!this._cancelled) {
			let dx: any = [];
			let ou: any = [];
			let pe: any = [];

			(selections || []).forEach((selection: any) => {
				const availableData = this._dataEntities[
					`${selection.dx}_${selection.ou}_${selection.pe}`
				];

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

			return getCustomFunctionAnalytics(this.engine, {
				functions: dx,
				orgUnits: ou,
				periods: pe,
			});
		}
		return of(null).toPromise();
	}

	_getNormalScorecardData(selections: any) {
		const { selectedOrgUnits, selectedPeriods, selectedDataItems } =
			selections ?? {};

		let selectionList: any = [];

		selectedOrgUnits.forEach((orgUnit: any) => {
			const dataItemList = chunk(
				selectedDataItems.map((dataItem: any) => {
					return selectedPeriods.map((period: any) => {
						return {
							dx: dataItem.id,
							ou: orgUnit,
							pe: period,
						};
					});
				}),
				2,
			);

			dataItemList.forEach((selectedDataList) => {
				selectionList = [...selectionList, flatten(selectedDataList)];
			});
		});

		this._totalRequests = selectionList?.length;

		mapLimit(
			selectionList,
			10,
			(selection: any, callback: any) => {
				this._getAnalyticsData(selection)
					.then((result: any) => {
						this._progress = this._progress + 1;
						this._progress$.next(this._progress);
						callback(null, result);
					})
					.catch((error: any) => {
						callback(error, null);
					});
			},
			(totalErr: any, totalRes: any) => {
				this._loading$.next(false);
			},
		);
	}

	_getCustomScorecardData(selections: any) {
		window.$ = $;
		const { selectedOrgUnits, selectedPeriods, selectedDataItems } =
			selections ?? {};
		if (selectedDataItems?.length === 0) {
			return new Promise((resolve) => resolve(null));
		}

		let selectionList: any = [];

		selectedOrgUnits.forEach((orgUnit: any) => {
			const dataItemList = chunk(
				selectedDataItems.map((dataItem: any) => {
					return selectedPeriods.map((period: any) => {
						return {
							dx: dataItem.id,
							ou: orgUnit,
							pe: period,
						};
					});
				}),
				2,
			);
			dataItemList.forEach((selectedDataList) => {
				selectionList = [...selectionList, flatten(selectedDataList)];
			});
		});

		mapLimit(selectionList, 10, (selection: any, callback: any) => {
			this._getCustomAnalyticsData(selection)
				.then((result) => {
					this._updateDataEntities(
						result?.rows?.map(([dx, pe, ou, value]: any) =>
							fromPairs([
								["dx", { id: dx }],
								["pe", { id: pe }],
								["ou", { id: ou }],
								["value", `${value}`],
							]),
						) ?? [],
					);
					this._progress = this._progress + 1;
					this._progress$.next(this._progress);
					callback(null, result);
				})
				.catch((error: any) => {
					callback(error, null);
				});
		});
	}

	_getSelectedPeriods(periods: any, periodType: any) {
		if (periods?.length > 0) {
			return periods;
		}

		try {
			const periods = new Period()
				?.setPreferences({ allowFuturePeriods: true })
				.setType(periodType)
				?.get()
				?.list();
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

	_getSelectedData(dataGroups: any) {
		const selectedItems = flatten(
			(dataGroups || []).map((dataGroup: any) =>
				flatten(
					(dataGroup?.dataHolders || []).map(
						(dataHolder: any) => dataHolder.dataSources,
					),
				),
			),
		);
		return {
			normalDataItems: selectedItems.filter(
				(selectedItem: any) => selectedItem.type !== "customFunction",
			),
			customDataItems: selectedItems.filter(
				(selectedItem: any) => selectedItem.type === "customFunction",
			),
		};
	}
}
