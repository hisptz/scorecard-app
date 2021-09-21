import {isEmpty} from "lodash";
import React from "react";
import {useRecoilState} from "recoil";
import {INTRODUCTION_HELP_STEPS} from "../../../../../../core/constants/help/scorecardManagement";
import DataSelection from "../../../../../../core/models/dataSelection";
import {ScorecardConfigDirtyState,} from "../../../../../../core/state/scorecard";
import Help from "../Help";
import DataSourceConfiguration from "./Components/DataGroups/Components/DataSourceConfiguration";
import EmptyDataGroups from "./Components/EmptyDataGroups";
import Instructions from "./Components/Instructions";
import PreviewScorecardTable from "./Components/PreviewScorecardTable";
import DataGroupArea from "./DataGroupArea";
import {generateNewGroupData} from "./utils";


export default function DataConfigurationScorecardForm() {

    const [dataSelection, updateDataSelection] = useRecoilState(
        ScorecardConfigDirtyState("dataSelection")
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

    return (
        <div className="row" style={{height: "100%"}}>
            <Help helpSteps={INTRODUCTION_HELP_STEPS}/>
            <div className="col-md-4 col-sm-6 p-16 groups-configuration-area">
                <div
                    className=" container-bordered column"
                    style={{minHeight: "100%"}}
                >
                    {isEmpty(groups) ? (
                        <EmptyDataGroups onGroupAdd={onGroupAdd}/>
                    ) : (
                        <DataGroupArea onGroupAdd={onGroupAdd}/>
                    )}
                </div>
            </div>
            <div className="col-md-8 p-16 h-100">
                {!isEmpty(groups) &&
                <div className="row pb-16">
                    <div className="column preview-table-area">
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
