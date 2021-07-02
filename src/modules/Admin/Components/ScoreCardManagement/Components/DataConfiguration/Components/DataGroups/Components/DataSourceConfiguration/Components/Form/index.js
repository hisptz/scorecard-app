import {debounce} from 'lodash'
import React from 'react'
import {useRecoilState, useRecoilValue} from "recoil";
import {ScorecardEditState, ScorecardStateSelector} from "../../../../../../../../../../../../core/state/scorecard";
import DataSourceConfigurationForm
    from "../../../../../../../../../../../../shared/Components/CustomForm/components/DataSourceConfigurationForm";

export default function SelectedDataSourceConfigurationForm() {
    const scorecardEditState = useRecoilValue(ScorecardEditState);
    const legendDefinitions = useRecoilValue(ScorecardStateSelector('legendDefinitions'))
    const selectedGroupIndex = scorecardEditState?.selectedGroupIndex;
    const selectedDataSourceIndex = scorecardEditState?.selectedDataSourceIndex;
    const path = ['dataSourceGroups', selectedGroupIndex, 'dataSources', selectedDataSourceIndex]
    const [selectedDataSource, updateSelectedDataSource] = useRecoilState(ScorecardStateSelector(path));

    const onFormChange = debounce(({values}) => {
        const updateValues = {...selectedDataSource, ...values}
        updateSelectedDataSource(updateValues)
    })

    return (
        <DataSourceConfigurationForm
            defaultValues={selectedDataSource}
            legendDefinitions={legendDefinitions}
            onFormChange={onFormChange}
        />
    )
}


