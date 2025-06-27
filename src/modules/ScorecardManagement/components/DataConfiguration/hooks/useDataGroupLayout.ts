import { useBoolean } from "usehooks-ts";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { ScorecardConfig, ScorecardLegend } from "@hisptz/dhis2-scorecard";
import { useCallback, useMemo } from "react";
import { customChunk } from "../components/DataGroups/components/DataGroup/utils";
import { DropResult } from "react-beautiful-dnd";
import { flattenDeep, head } from "lodash";
import { uid } from "@hisptz/dhis2-utils";
import { getNonDefaultLegendDefinitions } from "../../General/utils/utils";
import { SelectedDataItem } from "@hisptz/dhis2-ui";
import { useClearSelectedDataState, useSelectedData } from "../states/selectionState";
import { generateLegendDefaults } from "../../../../../shared";

export default function useDataGroupLayout({
											   index
										   }: { index: number }) {
	const { value: expanded, toggle: toggleExpansion } = useBoolean(false);

	const { fields, remove, insert, replace, move, append } = useFieldArray<ScorecardConfig, `dataSelection.dataGroups.${number}.dataHolders`>({
		name: `dataSelection.dataGroups.${index}.dataHolders`
	});
	const { getValues, setValue } = useFormContext<ScorecardConfig>();
	const selectedData = useSelectedData();
	const clearSelectedData = useClearSelectedDataState();
	const nonDefaultLegendDefinitions = getNonDefaultLegendDefinitions(getValues("legendDefinitions"));
	const group = useWatch<ScorecardConfig, `dataSelection.dataGroups.${number}`>({
		name: `dataSelection.dataGroups.${index}`
	});

	const onDataItemAdd = (items: SelectedDataItem[]) => {
		for (const item of items) {
			append({
				id: uid(),
				dataSources: [
					{
						id: item.id,
						highIsGood: true,
						type: item.type,
						label: item.displayName,
						name: item.displayName,
						weight: 100,
						showColors: true,
						displayArrows: false,
						effectiveGap: 5,
						legends: generateLegendDefaults({ legendDefinitions: nonDefaultLegendDefinitions, weight: 100, highIsGood: true }) as unknown as ScorecardLegend[],
						specificTargetsSet: false,
						specificTargets: []
					}
				]
			});
		}
	};

	const dataHolderChunks = useMemo(() => {
		const dataHolders = getValues(`dataSelection.dataGroups.${index}.dataHolders`);
		return customChunk(dataHolders);
	}, [fields]);

	const onDragEnd = useCallback((result: DropResult) => {

		const { source, destination } = result ?? {};
		if (source && destination) {
			if (source.index === selectedData?.holderIndex && index === selectedData?.groupIndex) {
				clearSelectedData();
			}
			move(source.index, destination.index);
		}

	}, [insert, replace]);

	const onLink = (index1: number, index2: number) => {
		//We need to set the first data source of the second index to the second data source of the first and remove the second data holder
		const dataHolder = getValues(`dataSelection.dataGroups.${index}.dataHolders.${index1}`);
		const secondDataHolder = getValues(`dataSelection.dataGroups.${index}.dataHolders.${index2}`);
		setValue(`dataSelection.dataGroups.${index}.dataHolders.${index1}`, {
			...dataHolder,
			dataSources: [
				...dataHolder.dataSources,
				head(secondDataHolder.dataSources)!
			]
		});
		remove(index2);
	};

	const onUnlink = (index: number) => {
		//Create a new data holder and send the second data item of the split data holder to the new data holder
		const dataHolder = getValues(`dataSelection.dataGroups.${index}.dataHolders.${index}`);
		if (dataHolder.dataSources.length > 1) {
			const [first, second] = dataHolder.dataSources;
			setValue(`dataSelection.dataGroups.${index}.dataHolders.${index}`, {
				...dataHolder,
				dataSources: [
					first
				]
			});
			//We insert the new data holder right under the existing one
			insert(index + 1, {
				id: uid(),
				dataSources: [
					second
				]
			});
		}

	};

	const selectedDataItems = useMemo(() => {
		return flattenDeep(group.dataHolders.map(({ dataSources }) => dataSources.map(({ id }) => id)));
	}, [group]);

	const onDelete = (holderIndex: number) => {
		if (selectedData?.holderIndex === holderIndex && selectedData?.groupIndex === index) {
			clearSelectedData();
		}
		//We need to remove the actual data from group
		const updatedGroup = {
			...group,
			dataHolders: group.dataHolders.toSpliced(holderIndex, 1)
		};

		setValue(`dataSelection.dataGroups.${index}`, updatedGroup);

		remove(holderIndex);
	};

	return {
		group,
		selectedDataItems,
		onDataItemAdd,
		toggleExpansion,
		onLink,
		onUnlink,
		onDragEnd,
		expanded,
		dataHolders: fields,
		dataHolderChunks,
		onDelete
	};
}
