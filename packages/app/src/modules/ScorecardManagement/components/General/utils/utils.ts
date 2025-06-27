import { cloneDeep, isEmpty, set } from "lodash";
import { LegendDefinition, ScorecardDataGroup, ScorecardDataHolder, ScorecardDataSource, SpecificTarget } from "@hisptz/dhis2-scorecard";
import { useDataEngine } from "@dhis2/app-runtime";
import { DATASTORE_NAMESPACE, generateLegendDefaults } from "../../../../../shared";

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
							{
								legendDefinitions: getNonDefaultLegendDefinitions(legendDefinitions),
								weight: dataSource.weight,
								highIsGood: dataSource.highIsGood
							}
						)
					);
					if (!isEmpty(dataSource.specificTargets)) {
						dataSource.specificTargets?.forEach(
							(specificTarget: SpecificTarget) => {
								set(
									specificTarget,
									"legends",
									generateLegendDefaults(
										{
											legendDefinitions: getNonDefaultLegendDefinitions(legendDefinitions),
											weight: dataSource.weight,
											highIsGood: dataSource.highIsGood
										}
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


const query: any = {
	titleCheck: {
		resource: `dataStore/${DATASTORE_NAMESPACE}`,
		params: ({ title }: { title: string }) => ({
			fields: ["title", "id"],
			filter: `title:eq:${title}`
		})
	}
};

export async function checkTitleAvailability({ title, id, engine }: { engine: ReturnType<typeof useDataEngine>, id?: string, title?: string }) {
	if (!title) {
		return false;
	}

	if (id) {
		return true;
	}

	const response = await engine.query(query, {
		variables: {
			title
		}
	});

	const results = (response.titleCheck as { entries: Record<string, unknown>[] })?.entries;
	if (isEmpty(results)) {
		return true;
	}
	if (results.length > 1) {
		return false;
	}

	const existingConfig = results.find((result) => result.id === id);
	return !!existingConfig;
}
