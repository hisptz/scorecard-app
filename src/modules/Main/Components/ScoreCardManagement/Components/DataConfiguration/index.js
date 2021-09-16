import i18n from '@dhis2/d2-i18n'
import {Button, Checkbox} from "@dhis2/ui";
import AddIcon from "@material-ui/icons/Add";
import {isEmpty} from "lodash";
import React from "react";
import {DragDropContext} from "react-beautiful-dnd";
import {useRecoilCallback, useRecoilState} from "recoil";
import DataSelection from "../../../../../../core/models/dataSelection";
import {ScorecardConfigDirtyState, ScorecardConfigEditState,} from "../../../../../../core/state/scorecard";
import {updateListFromDragAndDrop} from "../../../../../../shared/utils/dnd";
import DataGroups from "./Components/DataGroups";
import DataSourceConfiguration from "./Components/DataGroups/Components/DataSourceConfiguration";
import Instructions from "./Components/Instructions";
import PreviewScorecardTable from "./Components/PreviewScorecardTable";
import {generateNewGroupData} from "./utils";


export default function DataConfigurationScorecardForm() {
    const [dataSelection, updateDataSelection] = useRecoilState(
        ScorecardConfigDirtyState("dataSelection")
    );
    const [targetOnLevels, updateTargetOnLevels] = useRecoilState(
        ScorecardConfigDirtyState("targetOnLevels")
    );

    const {dataGroups: groups} = dataSelection ?? new DataSelection();

    const onGroupAdd = () => {
        updateDataSelection((prevState = []) =>
            DataSelection.set(prevState, "dataGroups", [
                ...prevState?.dataGroups,
                generateNewGroupData(groups),
            ])
        );

    };

    const onDragEnd = useRecoilCallback(
        ({set}) => (result) => {
            const {destination, source} = result ?? {};
            set(ScorecardConfigDirtyState("dataSelection"), (prevState = []) =>
                DataSelection.set(prevState, "dataGroups", [
                    ...updateListFromDragAndDrop(
                        prevState?.dataGroups,
                        source?.index,
                        destination?.index
                    ),
                ])
            );
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
        []);


    return (
        <div className="row" style={{height: "100%"}}>
            <div className="col-md-4 col-sm-6 p-16 ">
                <div
                    className=" container-bordered column"
                    style={{minHeight: "100%"}}
                >
                    {isEmpty(groups) ? (
                        <div style={{margin: 'auto'}}>
                            <Button
                                onClick={onGroupAdd}
                                icon={<AddIcon/>}
                                dataTest="scocecard-add-group-button"
                                primary
                            >
                                {i18n.t('Add Group')}
                            </Button>
                        </div>
                    ) : (
                        <div className="column h-100">
                            <div className="row space-between pr-16 pt-16 ">
                                <p style={{margin: 0}} className="pl-16">
                                    {i18n.t('Set Target on Levels')}
                                </p>
                                <Checkbox
                                 dataTest={'set-target-selection'}
                                    checked={targetOnLevels}
                                    onChange={() => updateTargetOnLevels((prevState) => !prevState)}
                                />
                            </div>
                            <h4 className="pl-16">{i18n.t('Groups')}</h4>
                            <DragDropContext onDragEnd={onDragEnd}>
                                <DataGroups/>
                            </DragDropContext>
                            <div className="p-8 column" style={{alignItems: "start"}}>
                                <Button
                                    onClick={onGroupAdd}
                                    icon={<AddIcon/>}
                                    dataTest="scocecard-add-group-button"
                                >
                                    {i18n.t('Add Group')}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="col-md-8 p-16 h-100">

                {!isEmpty(groups) &&
                <div className="row pb-16">
                    <div className="column">
                        <PreviewScorecardTable/>
                    </div>
                </div>
                }
                <div className="column h-100">
                    {
                        isEmpty(groups) ?
                            <div style={{margin: 'auto'}}>
                                <Instructions/>
                            </div> :
                            <DataSourceConfiguration/>
                    }
                </div>
            </div>
        </div>
    );
}
