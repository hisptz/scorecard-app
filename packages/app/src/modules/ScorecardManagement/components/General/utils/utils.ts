import { generateLegendDefaults, getScorecardSummary } from "@scorecard/shared";
import { cloneDeep, find, isEmpty, set } from "lodash";
import { LegendDefinition, ScorecardDataGroup, ScorecardDataHolder, ScorecardDataSource, SpecificTarget } from "@hisptz/dhis2-analytics";

export function resetLegends(groups: ScorecardDataGroup[], legendDefinitions: LegendDefinition[]) {
	const newGroups = cloneDeep(groups);
	if (newGroups) {
		newGroups?.forEach((group: any) => {
			group?.dataHolders?.forEach((dataHolder: ScorecardDataHolder) => {
				dataHolder?.dataSources?.forEach((dataSource: ScorecardDataSource) => {
					set(
						dataSource,
						"legends",
						generateLegendDefaults(
							getNonDefaultLegendDefinitions(legendDefinitions),
							dataSource.weight,
							dataSource.highIsGood
						)
					);
					if (!isEmpty(dataSource.specificTargets)) {
						dataSource.specificTargets.forEach(
							(specificTarget: SpecificTarget) => {
								set(
									specificTarget,
									"legends",
									generateLegendDefaults(
										getNonDefaultLegendDefinitions(
											legendDefinitions
										),
										dataSource.weight,
										dataSource.highIsGood
									)
								);
							}
						);
					}
				});
			});
		});
	}
	return newGroups;
}

export function getNonDefaultLegendDefinitions(legendDefinitions: any) {
	return (
		legendDefinitions?.filter(
			(legendDefinition: any) => !legendDefinition.isDefault
		) ?? []
	);
}

export async function titleDoesNotExist(engine: any, id: any, title: any) {
	const { summary } = await getScorecardSummary(engine);
	if (isEmpty(summary)) {
		return true;
	}
	const scorecard = find(summary, { title });
	if (scorecard) {
		return scorecard.id === id;
	}
	return !scorecard;
}
