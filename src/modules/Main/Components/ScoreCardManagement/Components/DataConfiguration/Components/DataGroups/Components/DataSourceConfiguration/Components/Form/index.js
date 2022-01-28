import {CircularLoader} from "@dhis2/ui";
import React, {Suspense} from "react";
import {useFormContext} from "react-hook-form";
import {useRecoilValue} from "recoil";
import {ScorecardConfigEditState,} from "../../../../../../../../../../../../core/state/scorecard";
import DataSourceConfigurationForm
    from "../../../../../../../../../../../../shared/Components/CustomForm/components/DataSourceConfigurationForm";

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
        <div className="row-media">
            {selectedDataHolder?.dataSources?.map((dataSource, index) => {

                const dataSourcePath = `${path}.dataSources.${index}`;
                return (
                    <div
                        key={dataSource.id}
                        className="col-lg-6 col-md-6"
                        style={{height: "100%"}}
                    >
                        <div className="container-bordered">
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
