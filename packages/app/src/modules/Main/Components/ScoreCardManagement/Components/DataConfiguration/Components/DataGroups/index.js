import i18n from "@dhis2/d2-i18n";
import {DataSelection} from "@scorecard/shared";
import {ScorecardConfigEditState,} from "@scorecard/shared";
import {filter, findIndex, isEmpty, last, remove, set} from "lodash";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Droppable} from "react-beautiful-dnd";
import {Controller, useFormContext} from "react-hook-form";
import {useRecoilValue, useResetRecoilState} from "recoil";
import {SearchedGroupsState} from "../../DataGroupArea";
import DataGroup from "./Components/DataGroup";

export default function DataGroups() {
    const {setValue, watch} = useFormContext();
    const dataSelection = watch("dataSelection");
    const searchedGroups = useRecoilValue(SearchedGroupsState);
    const updateDataSelection = useCallback((updatedDataSelection) => {
        setValue("dataSelection", updatedDataSelection);
    }, [setValue])

    const resetEditState = useResetRecoilState(ScorecardConfigEditState);
    const {dataGroups: groups} = dataSelection || new DataSelection();
    const [expanded, setExpanded] = useState(last(groups)?.id);

    const handleAccordionChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const onDeleteGroup = (id) => {
        const updatedGroupList = [...groups];
        remove(updatedGroupList, ["id", id]);
        updateDataSelection(
            DataSelection.set(dataSelection, "dataGroups", updatedGroupList)
        );
        resetEditState();
    };

    const onGroupUpdate = (index, newGroupData) => {
        const updatedGroupList = [...groups];
        set(updatedGroupList, [index], newGroupData);
        updateDataSelection(
            DataSelection.set(dataSelection, "dataGroups", updatedGroupList)
        );
    };

    const filteredGroups = useMemo(() => {
        if (isEmpty(searchedGroups)) {
            return groups;
        } else {
            return filter(groups, ({id}) => searchedGroups.includes(id));
        }
    }, [searchedGroups, groups]);

    useEffect(() => {
        setExpanded(last(filteredGroups)?.id);
    }, [filteredGroups, filteredGroups.length]);


    return (
        <Droppable droppableId={"group-area"}>
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    <div>
                        {filteredGroups?.map((group) => {
                                const groupIndex = findIndex(groups, ["id", group.id]);
                                return <Controller
                                    key={group.id}
                                    id={group.id}
                                    rules={{
                                        validate: {
                                            isNotEmpty: (value) => !isEmpty(value?.dataHolders) || i18n.t("Please select at least one data source for this group")
                                        }
                                    }}
                                    name={`dataSelection.dataGroups.${groupIndex}`}
                                    render={({field, fieldState}) => (
                                        <DataGroup
                                            {...field}
                                            error={fieldState.error}
                                            onGroupUpdate={onGroupUpdate}
                                            onDelete={onDeleteGroup}
                                            index={groupIndex}
                                            group={group}
                                            expanded={expanded}
                                            handleAccordionChange={handleAccordionChange}
                                        />
                                    )}
                                />
                            }
                        )}
                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    );
}
