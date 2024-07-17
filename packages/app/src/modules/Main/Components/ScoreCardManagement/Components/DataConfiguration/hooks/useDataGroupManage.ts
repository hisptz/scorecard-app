import {
	ScorecardIndicator,
	ScorecardIndicatorGroup,
	ScorecardIndicatorHolder,
} from "@scorecard/shared";
import {
	OrgUnitLevels,
	ScorecardConfigDirtyState,
	ScorecardConfigEditState,
} from "@scorecard/shared";
import { generateLegendDefaults, uid } from "@scorecard/shared";
import { cloneDeep, filter, fromPairs, isEmpty } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";

export default function useDataGroupManage({ index, expanded }: any) {
	const { watch, setValue } = useFormContext();
	const orgUnitLevels: any = useRecoilValue(OrgUnitLevels);
	const targetOnLevels = useRecoilValue(
		ScorecardConfigDirtyState("targetOnLevels"),
	);
	const [scorecardEditorState, setScorecardEditorState] = useRecoilState(
		ScorecardConfigEditState,
	);
	const path = useMemo(
		() => ["dataSelection", "dataGroups", index].join("."),
		[index],
	);

	const group = watch(path);
	const setGroup = useCallback(
		(updatedGroup: any) => {
			try {
				setValue(path, updatedGroup);
			} catch (e) {
				console.error(e);
			}
		},
		[path, setValue],
	);

	const legendDefinitions = watch("legendDefinitions");
	const filteredLegendDefinitions = useMemo(
		() => filter(legendDefinitions, ({ isDefault }) => !isDefault),
		[legendDefinitions],
	);

	const { title, id, dataHolders } = group ?? new ScorecardIndicatorGroup();

	const [titleEditOpen, setTitleEditOpen] = useState(false);
	const [titleEditValue, setTitleEditValue] = useState(title);

	const onDataSourceAdd = (addedDataSources: any) => {
		//Assigns each of the selected indicator to its own holder
		const newDataSources = addedDataSources?.map(
			(dataSource: any) =>
				new ScorecardIndicatorHolder({
					id: uid(),
					dataSources: [
						new ScorecardIndicator({
							...dataSource,
							label: dataSource.displayName,
							name: dataSource.displayName,
							legends: targetOnLevels
								? fromPairs([
										...(orgUnitLevels?.map(({ id }: any) => [
											id,
											generateLegendDefaults(
												filteredLegendDefinitions,
												100,
												true,
											),
										]) ?? []),
								  ])
								: generateLegendDefaults(filteredLegendDefinitions, 100, true),
						}),
					],
				}),
		);
		const updatedDataSources = [...dataHolders, ...newDataSources];
		setGroup(
			ScorecardIndicatorGroup.set(group, "dataHolders", updatedDataSources),
		);
	};

	const onDataSourceDelete = (deletedDataSourceIndex: any) => {
		try {
			if (
				scorecardEditorState.selectedDataHolderIndex === deletedDataSourceIndex
			) {
				setScorecardEditorState((prevState: any) => ({
					...prevState,
					selectedDataHolderIndex: undefined,
				}));
			}
			const updatedDataSources = cloneDeep(dataHolders) || [];
			if (!isEmpty(updatedDataSources)) {
				updatedDataSources.splice(deletedDataSourceIndex, 1);
				setGroup(
					ScorecardIndicatorGroup.set(group, "dataHolders", updatedDataSources),
				);
			}
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		if (expanded === id) {
			setScorecardEditorState((prevState: any) => {
				return {
					...prevState,
					selectedDataHolderIndex: undefined,
					selectedGroupIndex: index,
				};
			});
		}
	}, [expanded]);
	//Only want to run this effect when the expanded state changes, DO NOT ADD TO EFFECT DEPENDENCIES!

	const onTitleEditSubmit = (_: any, event: any) => {
		event.stopPropagation();
		if (isEmpty(titleEditValue.trim())) {
			setTitleEditValue(title);
			setTitleEditOpen(false);
		} else {
			setGroup(ScorecardIndicatorGroup.set(group, "title", titleEditValue));
			setTitleEditOpen(false);
		}
	};

	return {
		onDataSourceDelete,
		onDataSourceAdd,
		onTitleEditSubmit,
		titleEditOpen,
		titleEditValue,
		setTitleEditValue,
		setTitleEditOpen,
		group,
	};
}
