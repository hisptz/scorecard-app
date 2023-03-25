import {CircularLoader} from "@dhis2/ui";
import {ScorecardConfigEditState} from "@scorecard/shared";
import React, {Suspense} from "react";
import {useFormContext} from "react-hook-form";
import {useRecoilValue} from "recoil";
import DataSourceConfigurationForm from "../../../../../../../DataSourceConfigurationForm";


export default function SelectedDataSourceConfigurationForm() {
    const {watch} = useFormContext();
    const scorecardEditState = useRecoilValue(ScorecardConfigEditState);
    const selectedGroupIndex = scorecardEditState?.selectedGroupIndex;
    const selectedDataHolderIndex = scorecardEditState?.selectedDataHolderIndex;
    const path = [
        "dataSelection",
        "dataGroups",
        selectedGroupIndex,
        "dataHolders",
        selectedDataHolderIndex,
    ]?.join(".");

    const selectedDataHolder = watch(path);

    return (
        <div className="data-configuration-row">
            {selectedDataHolder?.dataSources?.map((dataSource, index) => {
                const dataSourcePath = `${path}.dataSources.${index}`;
                return (
                    <div
                        key={dataSource.id}
                        style={{maxWidth: 720, minWidth: 480}}
                        className="w-100 h-100"
                    >
                        <div className="container-bordered h-100">
                            <div className="column">
                                <div className="p-16">
                                    <Suspense
                                        fallback={
                                            <div className="w-100 h-100 center align-items-center">
                                                <CircularLoader small/>
                                            </div>
                                        }
                                    >
                                        <DataSourceConfigurationForm
                                            path={dataSourcePath}
                                        />
                                    </Suspense>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }) || null}
        </div>
    );
}
