import React, {Suspense} from "react";
import {useRecoilValue} from "recoil";
import ContainerLoader from "../../../../../../../../../../../../../shared/components/src/Loaders/ContainerLoader";
import {ScorecardConfigEditState} from "../../../../../../../../../../../../../shared/state/src/scorecard";
import {DataSourceInstructions} from "../../../Instructions";
import SelectedDataSourceConfigurationForm from "./Components/Form";

export default function DataSourceConfiguration() {
    const {selectedDataHolderIndex} = useRecoilValue(ScorecardConfigEditState);

    return (
        <div>
            <Suspense fallback={<ContainerLoader/>}>
                {!isNaN(selectedDataHolderIndex) ? (
                    <SelectedDataSourceConfigurationForm/>
                ) : (
                    <div className="row center align-items-center">
                        <DataSourceInstructions/>
                    </div>
                )}
            </Suspense>
        </div>
    );
}
