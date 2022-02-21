import {cloneDeep, find, findIndex, head, last, set} from "lodash";
import {useCallback, useMemo} from "react";
import {useFormContext} from "react-hook-form";
import {useRecoilCallback} from "recoil";
import ScorecardIndicatorGroup from "../../../../../../../core/models/scorecardIndicatorGroup";
import ScorecardIndicatorHolder from "../../../../../../../core/models/scorecardIndicatorHolder";
import {ScorecardConfigEditState} from "../../../../../../../core/state/scorecard";
import {updateListFromDragAndDrop} from "../../../../../../../shared/utils/dnd";


export default function useDataGroupLayout({handleAccordionChange, index}) {
    const {watch, setValue} = useFormContext();

    const path = useMemo(() => ["dataSelection", "dataGroups", index].join("."), [index]);

    const group = watch(path);
    const {id, dataHolders} = group ?? new ScorecardIndicatorGroup();
    const setGroup = useCallback(
        (updatedGroup) => {
            setValue(path, updatedGroup);
        },
        [path, setValue],
    );

    const onLink = (indexOfMergedHolder, indexOfTheDeletedHolder) => {
        const dataSourceToLink = head(
            dataHolders[indexOfTheDeletedHolder]?.dataSources
        );
        const mergedHolder = ScorecardIndicatorHolder.linkDataSource(
            dataHolders[indexOfMergedHolder],
            dataSourceToLink
        );
        const updatedHolderList = [...dataHolders];
        updatedHolderList.splice(indexOfMergedHolder, 1, mergedHolder);
        updatedHolderList.splice(indexOfTheDeletedHolder, 1);
        setGroup(
            ScorecardIndicatorGroup.set(group, "dataHolders", updatedHolderList)
        );
    };

    const onUnlink = (id) => {
        //get the linked holder by id
        const dataHolder = find(dataHolders, ["id", id]);
        const dataHolderIndex = findIndex(dataHolders, ["id", id]);
        //create a new holder for the last dataSource
        const newDataHolder = new ScorecardIndicatorHolder({
            dataSources: [last(dataHolder?.dataSources)],
        });
        const dataHolderToModify = cloneDeep(dataHolder);
        const modifiedDataHolder = ScorecardIndicatorHolder.set(
            dataHolderToModify,
            "dataSources",
            dataHolderToModify?.dataSources?.splice(0, 1)
        );
        const updatedHolderList = [...dataHolders];
        set(updatedHolderList, [dataHolderIndex], modifiedDataHolder);
        updatedHolderList.splice(dataHolderIndex, 0, newDataHolder);
        setGroup(
            ScorecardIndicatorGroup.set(group, "dataHolders", updatedHolderList)
        );
    };

    const onDragEnd = useRecoilCallback(({set}) => (result) => {
        const {destination, source} = result || {};
        setGroup(ScorecardIndicatorGroup.set(
            group,
            "dataHolders",
            updateListFromDragAndDrop(
                group?.dataHolders,
                source?.index,
                destination?.index
            )
        ));
        set(ScorecardConfigEditState, (prevState) => {
            if (prevState.selectedDataHolderIndex === source?.index) {
                return {
                    ...prevState,
                    selectedDataHolderIndex: destination?.index,
                };
            }
            return prevState;
        });
    });

    const onExpand = (event, newExpanded) => {
        handleAccordionChange(id)(event, newExpanded);
    };

    return {
        onLink,
        onUnlink,
        onDragEnd,
        onExpand,
    }

}
