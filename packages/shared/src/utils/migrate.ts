import { map } from "async";
import { compact, find, has } from "lodash";
import { getDataSourceDetails } from "./dataSource";
import { uid } from "./utils";

export async function migrateScorecard(oldScorecard: any, engine: any) {
	try {
		if (oldScorecard) {
			return {
				id: oldScorecard?.id,
				name: oldScorecard?.header?.title,
				title: oldScorecard?.header?.title,
				subtitle: oldScorecard?.header?.sub_title,
				description: oldScorecard?.header?.description,
				user: { id: oldScorecard?.user?.id },
				periodType: oldScorecard?.periodType,
				customHeader: oldScorecard?.header?.template?.content,
				publicAccess: getScorecardPublicAccess(oldScorecard?.user_groups),
				userAccesses: [],
				userGroupAccesses: getScorecardUserGroupAccesses(
					oldScorecard?.user_groups,
				),
				targetOnLevels: false,
				periodSelection: getScorecardPeriodSelection(
					oldScorecard.selected_periods,
					oldScorecard.periodType,
				),
				orgUnitSelection: getScorecardOrgUnitSelection(
					oldScorecard.orgunit_settings,
				),
				dataSelection: await getScorecardDataSelection(
					oldScorecard.data_settings,
					engine,
				),
				additionalLabels: oldScorecard.additional_labels,
				legendDefinitions: getScorecardLegendDefinitions(
					oldScorecard?.legendset_definitions,
				),
				options: {
					title: true,
					legend: oldScorecard?.header?.show_legend_definition,
					emptyRows: oldScorecard?.empty_rows,
					averageRow: oldScorecard?.show_average_in_row,
					itemNumber: true,
					averageColumn: oldScorecard?.show_average_in_column,
					showHierarchy: oldScorecard?.show_hierarchy,
					averageDisplayType: oldScorecard?.average_selection?.toUpperCase(),
					highlightedIndicators: oldScorecard?.highlighted_indicators?.display,
				},
				highlightedIndicators: await map(
					oldScorecard?.highlighted_indicators?.definitions || [],
					async (indicator: any) =>
						await getScorecardDataSource(indicator, engine),
				),
			};
		}
	} catch (e) {
		console.error(e);
	}
}

function getScorecardLegendDefinitions(oldScorecardLegendDefinitions: any) {
	return (oldScorecardLegendDefinitions || []).map((legendDefinition: any) => {
		const hasDefaultProps = has(legendDefinition, "default");
		return hasDefaultProps
			? {
					id: legendDefinition.definition,
					color: legendDefinition.color,
					name: legendDefinition.definition,
					isDefault: legendDefinition.default,
			  }
			: {
					id: legendDefinition.color,
					color: legendDefinition.color,
					name: legendDefinition.definition,
			  };
	});
}

function getScorecardPeriodSelection(
	oldScorecardPeriodSelections: any,
	periodType: any,
) {
	return {
		periods: oldScorecardPeriodSelections.map((period: any) => ({
			id: period.id,
			name: period.name,
		})),
		type: periodType,
	};
}

async function getScorecardDataSelection(
	oldScorecardDataSelections: any,
	engine: any,
) {
	return {
		dataGroups: await map(
			oldScorecardDataSelections?.indicator_holder_groups || [],
			async (dataGroup: any) => {
				return {
					id: dataGroup?.id,
					style: {
						color: "#000000",
						backgroundColor: dataGroup.background_color,
					},
					title: dataGroup?.name,
					dataHolders: compact(
						await map(
							dataGroup?.indicator_holder_ids,
							async (holderId: any) => {
								return await getScorecardDataHolder(
									oldScorecardDataSelections.indicator_holders,
									holderId,
									engine,
								);
							},
						),
					),
				};
			},
		),
	};
}

async function getScorecardDataHolder(
	dataHolders: any,
	holderId: any,
	engine: any,
) {
	const dataHolder = find(dataHolders, ["holder_id", holderId]);
	return dataHolder
		? {
				id: dataHolder.holder_id,
				dataSources: await map(
					dataHolder.indicators ?? [],
					async (indicator: any) => {
						return await getScorecardDataSource(indicator, engine);
					},
				),
		  }
		: undefined;
}

async function getScorecardDataSource(indicator: any, engine: any) {
	const { name, type } =
		(await getDataSourceDetails(engine, indicator.id)) ?? {};

	return {
		id: indicator.id,
		name: indicator.title ?? name,
		type: type ?? "customFunction",
		label: indicator.title,
		weight: indicator.weight,
		legends: indicator.legendset.map((legendSet: any) => {
			return {
				id: uid(),
				legendDefinitionId: legendSet?.color,
				endValue:
					typeof legendSet?.max === "string"
						? parseFloat(legendSet?.max)
						: legendSet?.max,
				startValue:
					typeof legendSet?.min === "string"
						? parseFloat(legendSet?.min)
						: legendSet.min,
			};
		}),
		highIsGood: indicator?.high_is_good,
		showColors: indicator?.legend_display,
		effectiveGap: indicator?.arrow_settings?.effective_gap || 5,
		displayArrows: indicator?.arrow_settings?.display,
	};
}

function getScorecardOrgUnitSelection(oldScorecardOrgUnitSelections: any) {
	return {
		groups:
			oldScorecardOrgUnitSelections?.selected_groups?.map(
				(group: any) => group?.id,
			) || [],
		levels:
			oldScorecardOrgUnitSelections?.selected_levels?.map(
				(level: any) => level?.id,
			) || [],
		orgUnits: oldScorecardOrgUnitSelections?.selected_orgunits?.map(
			(selectedOrgUnit: any) => ({ id: selectedOrgUnit.id }),
		),

		userOrgUnit: Boolean(
			find(oldScorecardOrgUnitSelections?.selected_user_orgunit, [
				"id",
				"USER_ORGUNIT",
			]),
		),
		userSubUnit: Boolean(
			find(oldScorecardOrgUnitSelections?.selected_user_orgunit, [
				"id",
				"USER_ORGUNIT_CHILDREN",
			]),
		),
		userSubX2Unit: Boolean(
			find(oldScorecardOrgUnitSelections?.selected_user_orgunit, [
				"id",
				"USER_ORGUNIT_GRANDCHILDREN",
			]),
		),
	};
}

function getScorecardPublicAccess(oldScorecardUserGroups: any) {
	const publicAccess = find(oldScorecardUserGroups, ["id", "all"]);
	return {
		id: "public",
		type: "public",
		access: getScorecardAccess(publicAccess),
		displayName: "Public",
	};
}

function getScorecardUserGroupAccesses(oldScorecardUserGroups: any) {
	const userGroupsOnly = oldScorecardUserGroups?.filter(
		(userGroup: any) => userGroup.id !== "all",
	);
	return userGroupsOnly?.map((userGroup: any) => {
		return {
			id: userGroup?.id,
			type: "userGroup",
			access: getScorecardAccess(userGroup),
			displayName: userGroup?.name,
		};
	});
}

function getScorecardAccess(oldScrocardUserGroup: any) {
	if (oldScrocardUserGroup?.see) {
		return "r-----";
	}

	return "------";
}
