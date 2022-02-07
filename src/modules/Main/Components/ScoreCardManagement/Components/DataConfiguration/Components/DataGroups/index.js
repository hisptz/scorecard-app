import i18n from "@dhis2/d2-i18n";
import {isEmpty, last, remove, set} from "lodash";
import React, {useCallback, useEffect, useState} from "react";
import {Droppable} from "react-beautiful-dnd";
import {useFormContext, Controller} from "react-hook-form";
import {useRecoilValue, useResetRecoilState} from "recoil";
import DataSelection from "../../../../../../../../core/models/dataSelection";
import {ScorecardConfigEditState,} from "../../../../../../../../core/state/scorecard";
import { dataSelector } from "../../DataGroupArea";
import DataGroup from "./Components/DataGroup";

export default function DataGroups() {
    const {setValue, watch} = useFormContext();
    const dataSelection = watch("dataSelection");
    const filteredIndicator = useRecoilValue(dataSelector);
    const updateDataSelection = useCallback((updatedDataSelection) => {
        setValue("dataSelection", updatedDataSelection);
    }, [setValue])

    const resetEditState = useResetRecoilState(ScorecardConfigEditState);
    const {dataGroups: groups} = dataSelection || new DataSelection();
    const [expanded, setExpanded] = useState(last(groups)?.id);

    const handleAccordionChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    useEffect(() => {
        setExpanded(last(groups)?.id);
    }, [groups.length]);

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
useEffect(()=>{
  if(filteredIndicator.length > 0){
    updateDataSelection(
        DataSelection.set(dataSelection, "dataGroups", filteredIndicator)
    );
  }
},[filteredIndicator])
    

    return (
        <Droppable droppableId={"group-area"}>
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    <div>
                        {groups?.map((group, index) => (
                            <Controller
                                key={group.id}
                                rules={{
                                    validate: {
                                        isNotEmpty: (value) => !isEmpty(value?.dataHolders) || i18n.t("Please select at least one data source for this group")
                                    }
                                }}
                                name={`dataSelection.dataGroups.${index}`}
                                render={({field, fieldState}) => (
                                    <DataGroup
                                        {...field}
                                        error={fieldState.error}
                                        onGroupUpdate={onGroupUpdate}
                                        onDelete={onDeleteGroup}
                                        index={index}
                                        group={group}
                                        expanded={expanded}
                                        handleAccordionChange={handleAccordionChange}
                                    />
                                )}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    );
}
