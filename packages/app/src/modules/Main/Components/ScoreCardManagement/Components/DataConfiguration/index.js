import {ContainerLoader, Help} from "@scorecard/shared";
import {DataSelection} from "@scorecard/shared";
import {isEmpty} from "lodash";
import React, {Suspense, useCallback} from "react";
import {useFormContext} from "react-hook-form";
import DataSourceConfiguration from "./Components/DataGroups/Components/DataSourceConfiguration";
import EmptyDataGroups from "./Components/EmptyDataGroups";
import Instructions from "./Components/Instructions";
import PreviewScorecardTable from "./Components/PreviewScorecardTable";
import DataGroupArea from "./DataGroupArea";
import useHelp from "./hooks/useHelp";
import {generateNewGroupData} from "./utils";

export default function DataConfigurationScorecardForm() {

    const {setValue, watch, register} = useFormContext();
    register("dataSelection")
    const dataSelection = watch("dataSelection");

    const updateDataSelection = useCallback((updatedDataSelection) => {
        setValue("dataSelection", updatedDataSelection);
    }, [setValue])

    const {dataGroups: groups} = dataSelection ?? new DataSelection();
    const helpSteps = useHelp(groups);

    const onGroupAdd = useCallback(() => {
        updateDataSelection(DataSelection.set(dataSelection, "dataGroups", [
            ...(dataSelection?.dataGroups ?? []),
            generateNewGroupData(groups),
        ]));
    }, [dataSelection, groups, updateDataSelection]);

    return (
        <div className="row" style={{height: "100%"}}>
            <Help helpSteps={helpSteps}/>
            <div className="col-md-4 col-sm-6 p-16 groups-configuration-area">
                <div
                    className=" container-bordered column"
                    style={{minHeight: "100%", height: '100%'}}
                >
                    <Suspense fallback={<ContainerLoader/>}>
                        {isEmpty(groups) ? (
                            <EmptyDataGroups onGroupAdd={onGroupAdd}/>
                        ) : (
                            <DataGroupArea onGroupAdd={onGroupAdd}/>
                        )}
                    </Suspense>
                </div>
            </div>
            <div className="col-md-8 p-16 h-100">
                {!isEmpty(groups) && (
                    <div className="row pb-16">
                        <div className="column preview-table-area">
                            <PreviewScorecardTable/>
                        </div>
                    </div>
                )}
                <div className="column h-100">
                    {isEmpty(groups) ? (
                        <div style={{margin: "auto"}}>
                            <Instructions/>
                        </div>
                    ) : (
                        <DataSourceConfiguration/>
                    )}
                </div>
            </div>
        </div>
    );
}
