import { generateLegendDefaults, getScorecardSummary } from "@scorecard/shared";
import { cloneDeep, find, isEmpty, set } from "lodash";

export function resetLegends(groups: any, legendDefinitions: any) {
	const newGroups = cloneDeep(groups);
	if (newGroups) {
		newGroups?.forEach((group: any) => {
			group?.dataHolders?.forEach((dataHolder: any) => {
				dataHolder?.dataSources?.forEach((dataSource: any) => {
					set(
						dataSource,
						"legends",
						generateLegendDefaults(
							getNonDefaultLegendDefinitions(legendDefinitions),
						),
					);
					if (!isEmpty(dataSource.specificTargets)) {
						dataSource.specificTargets.forEach(
							(specificTarget: any) => {
								set(
									specificTarget,
									"legends",
									generateLegendDefaults(
										getNonDefaultLegendDefinitions(
											legendDefinitions,
										),
									),
								);
							},
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
			(legendDefinition: any) => !legendDefinition.isDefault,
		) ?? []
	);
}

export function getDefaultLegendDefinitions(legendDefinitions: any) {
	return (
		legendDefinitions?.filter(
			(legendDefinition: any) => legendDefinition.isDefault,
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
