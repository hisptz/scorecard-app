import i18n from "@dhis2/d2-i18n";
import {Button, Checkbox} from "@dhis2/ui";
import AddIcon from "@material-ui/icons/Add";
import PropTypes from "prop-types";
import React from "react";
import {DragDropContext} from "react-beautiful-dnd";
import {useFormContext} from "react-hook-form";
import {useRecoilCallback, useRecoilState} from "recoil";
import DataSelection from "../../../../../../core/models/dataSelection";
import {ScorecardConfigDirtyState, ScorecardConfigEditState,} from "../../../../../../core/state/scorecard";
import {updateListFromDragAndDrop} from "../../../../../../shared/utils/dnd";
import DataGroups from "./Components/DataGroups";

export default function DataGroupArea({onGroupAdd}) {
    const {setValue, watch} = useFormContext();
    const dataSelection = watch("dataSelection");
    const [targetOnLevels, updateTargetOnLevels] = useRecoilState(
        ScorecardConfigDirtyState("targetOnLevels")
    );

    const onDragEnd = useRecoilCallback(
        ({set}) =>
            (result) => {
                const {destination, source} = result ?? {};
                setValue("dataSelection", DataSelection.set(dataSelection, "dataGroups", [
                    ...updateListFromDragAndDrop(
                        dataSelection?.dataGroups,
                        source?.index,
                        destination?.index
                    ),
                ]))
                set(ScorecardConfigEditState, (prevState) => {
                    if (prevState.selectedGroupIndex === source?.index) {
                        return {
                            ...prevState,
                            selectedGroupIndex: destination?.index,
                        };
                    }
                    return prevState;
                });
            },
        [dataSelection, setValue]
    );

    return (
        <div className="column h-100">
            <div className="row space-between pr-16 pt-16 target-on-level-selector ">
                <p style={{margin: 0}} className="pl-16">
                    {i18n.t("Set Target on Levels")}
                </p>
                <Checkbox
                    dataTest={"set-target-selection"}
                    checked={targetOnLevels}
                    onChange={() => updateTargetOnLevels((prevState) => !prevState)}
                />
            </div>
            <h4 className="pl-16">{i18n.t("Groups")}</h4>
            <div style={{maxHeight: '60vh', overflowY: 'auto', flex: 1}}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <DataGroups/>
                </DragDropContext>
            </div>
            <div className="p-8 column" style={{alignItems: "start"}}>
                <Button
                    onClick={onGroupAdd}
                    icon={<AddIcon/>}
                    dataTest="scocecard-add-group-button"
                    className="scorecard-add-group-button"
                >
                    {i18n.t("Add Group")}
                </Button>
            </div>
        </div>
    );
}

DataGroupArea.propTypes = {
    onGroupAdd: PropTypes.func.isRequired,
};
