import { useBoolean } from "usehooks-ts";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ScorecardConfig } from "@hisptz/dhis2-analytics";
import { useCallback, useMemo } from "react";
import { customChunk } from "../components/DataGroups/components/DataGroup/utils";
import { DropResult } from "react-beautiful-dnd";
import { head } from "lodash";
import { uid } from "@hisptz/dhis2-utils";

export default function useDataGroupLayout({
											   index
										   }: { index: number }) {
	const { value: expanded, toggle: toggleExpansion } = useBoolean(false);
	// @ts-ignore
	const { fields, remove, insert, replace, swap, move } = useFieldArray<ScorecardConfig, `dataSelection.dataGroups.${number}.dataHolders`>({
		name: `dataSelection.dataGroups.${index}.dataHolders`
	});
	const { getValues, setValue } = useFormContext<ScorecardConfig>();

	const dataHolderChunks = useMemo(() => {
		const dataHolders = getValues(`dataSelection.dataGroups.${index}.dataHolders`);
		return customChunk(dataHolders);
	}, [fields]);

	const onDragEnd = useCallback((result: DropResult) => {
		const { source, destination } = result ?? {};

		console.log({
			result
		});
		if (source && destination) {
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

	return {
		toggleExpansion,
		onLink,
		onUnlink,
		onDragEnd,
		expanded,
		dataHolders: fields,
		dataHolderChunks,
		remove
	};
}
