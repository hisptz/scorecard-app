import { map } from "async";
import { compact, find, fromPairs, has } from "lodash";
import { getDataSourceDetails } from "./dataSource";
import { uid } from "./utils";
import { OldLegendDefinition, OldScorecardSchema, OldUserGroup, OrgUnitSettings } from "app/src/modules/ScorecardMigration/schemas/old";
import { useDataEngine } from "@dhis2/app-runtime";
import { ScorecardConfig } from "@hisptz/dhis2-analytics";

export async function migrateScorecard({ oldScorecard, engine }: { oldScorecard: OldScorecardSchema, engine: ReturnType<typeof useDataEngine> }): Promise<ScorecardConfig> {
	try {
		if (oldScorecard) {
			return {
				id: oldScorecard?.id,
				title: oldScorecard?.header?.title,
				subtitle: oldScorecard?.header?.sub_title,
				description: oldScorecard?.header?.description,
				sharing: {
					owner: oldScorecard?.user?.id,
					external: false,
					public: getScorecardPublicAccess(oldScorecard.user_groups)?.access,
					users: {},
					userGroups: getScorecardUserGroupAccesses(oldScorecard.user_groups)
				},
				customHeader: oldScorecard?.header?.template?.content,
				periodSelection: getScorecardPeriodSelection(
					oldScorecard.selected_periods,
					oldScorecard.periodType
				),
				orgUnitSelection: getScorecardOrgUnitSelection(
					oldScorecard.orgunit_settings
				),
				dataSelection: await getScorecardDataSelection(
					oldScorecard.data_settings,
					engine
				),
				additionalLabels: oldScorecard.additional_labels,
				legendDefinitions: getScorecardLegendDefinitions(
					oldScorecard?.legendset_definitions
				),
				options: {
					title: true,
					legend: oldScorecard?.header?.show_legend_definition,
					emptyRows: oldScorecard?.empty_rows,
					averageRow: oldScorecard?.show_average_in_row,
					itemNumber: true,
					averageColumn: oldScorecard?.show_average_in_column,
					showHierarchy: oldScorecard?.show_hierarchy,
					averageDisplayType: oldScorecard?.average_selection?.toUpperCase() as any,
					highlightedIndicators: oldScorecard?.highlighted_indicators?.display
				},
				highlightedIndicators: await map(
					oldScorecard?.highlighted_indicators?.definitions || [],
					async (indicator: any) =>
						await getScorecardDataSource(indicator, engine)
				)
			};
		}
	} catch (e) {
		console.error(e);
	}
}

function getScorecardLegendDefinitions(oldScorecardLegendDefinitions: OldLegendDefinition[]) {
	return (oldScorecardLegendDefinitions || []).map((legendDefinition: OldLegendDefinition) => {
		const hasDefaultProps = has(legendDefinition, "default");
		return hasDefaultProps
			? {
				id: legendDefinition.definition,
				color: legendDefinition.color,
				name: legendDefinition.definition,
				isDefault: legendDefinition.default
			}
			: {
				id: legendDefinition.color,
				color: legendDefinition.color,
				name: legendDefinition.definition
			};
	});
}

function getScorecardPeriodSelection(
	oldScorecardPeriodSelections: any,
	periodType: string
) {
	return {
		periods: oldScorecardPeriodSelections?.map((period: { id: string; name: string; }) => ({
			id: period.id,
			name: period.name
		})),
		type: periodType
	};
}

async function getScorecardDataSelection(
	oldScorecardDataSelections: any,
	engine: any
) {
	return {
		dataGroups: await map(
			oldScorecardDataSelections?.indicator_holder_groups || [],
			async (dataGroup: any) => {
				return {
					id: dataGroup?.id,
					style: {
						color: "#000000",
						backgroundColor: dataGroup.background_color
					},
					title: dataGroup?.name,
					dataHolders: compact(
						await map(
							dataGroup?.indicator_holder_ids,
							async (holderId: any) => {
								return await getScorecardDataHolder(
									oldScorecardDataSelections.indicator_holders,
									holderId,
									engine
								);
							}
						)
					)
				};
			}
		)
	};
}

async function getScorecardDataHolder(
	dataHolders: any,
	holderId: any,
	engine: any
) {
	const dataHolder = find(dataHolders, ["holder_id", holderId]);
	return dataHolder
		? {
			id: dataHolder.holder_id,
			dataSources: await map(
				dataHolder.indicators ?? [],
				async (indicator: any) => {
					return await getScorecardDataSource(indicator, engine);
				}
			)
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
						: legendSet.min
			};
		}),
		highIsGood: indicator?.high_is_good,
		showColors: indicator?.legend_display,
		effectiveGap: indicator?.arrow_settings?.effective_gap || 5,
		displayArrows: indicator?.arrow_settings?.display
	};
}

function getScorecardOrgUnitSelection(oldScorecardOrgUnitSelections: OrgUnitSettings) {
	return {
		groups:
			oldScorecardOrgUnitSelections?.selected_groups?.map(
				(group: any) => group?.id
			) || [],
		levels:
			oldScorecardOrgUnitSelections?.selected_levels?.map(
				(level: any) => level?.id
			) || [],
		orgUnits: oldScorecardOrgUnitSelections?.selected_orgunits?.map(
			(selectedOrgUnit: any) => ({ id: selectedOrgUnit.id })
		),

		userOrgUnit: Boolean(
			find(oldScorecardOrgUnitSelections?.selected_user_orgunit, [
				"id",
				"USER_ORGUNIT"
			])
		),
		userSubUnit: Boolean(
			find(oldScorecardOrgUnitSelections?.selected_user_orgunit, [
				"id",
				"USER_ORGUNIT_CHILDREN"
			])
		),
		userSubX2Unit: Boolean(
			find(oldScorecardOrgUnitSelections?.selected_user_orgunit, [
				"id",
				"USER_ORGUNIT_GRANDCHILDREN"
			])
		)
	};
}

function getScorecardPublicAccess(oldScorecardUserGroups: OldUserGroup[]) {
	const publicAccess = find(oldScorecardUserGroups, ["id", "all"]);
	return {
		id: "public",
		type: "public",
		access: getScorecardAccess(publicAccess),
		displayName: "Public"
	};
}

function getScorecardUserGroupAccesses(oldScorecardUserGroups: OldUserGroup[]): Record<string, { id: string; access: string; name: string; displayName: string; }> {
	const userGroupsOnly = oldScorecardUserGroups?.filter(
		(userGroup) => userGroup.id !== "all"
	);
	return fromPairs(userGroupsOnly?.map((userGroup: OldUserGroup) => {
		return [
			userGroup.id,
			{
				id: userGroup?.id,
				access: getScorecardAccess(userGroup),
				name: userGroup.name,
				displayName: userGroup.name
			}
		];
	}));
}

function getScorecardAccess(oldScorecardUserGroup: OldUserGroup) {
	const access = "------";
	if (oldScorecardUserGroup?.see) {
		access.replace("_", "r");
	}
	if (oldScorecardUserGroup?.edit) {
		access.replace("_", "w");
	}

	return access;
}
