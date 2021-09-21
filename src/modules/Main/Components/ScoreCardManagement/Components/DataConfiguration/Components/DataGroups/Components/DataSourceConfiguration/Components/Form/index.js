import {CircularLoader} from '@dhis2/ui'
import {cloneDeep, filter, fromPairs, set} from 'lodash'
import React, {Suspense, useCallback, useMemo} from 'react'
import {useRecoilState, useRecoilValue} from "recoil";
import ScorecardIndicator from "../../../../../../../../../../../../core/models/scorecardIndicator";
import {OrgUnitLevels} from "../../../../../../../../../../../../core/state/orgUnit";
import {
    ScorecardConfigDirtySelector,
    ScorecardConfigDirtyState,
    ScorecardConfigEditState
} from "../../../../../../../../../../../../core/state/scorecard";
import DataSourceConfigurationForm
    from "../../../../../../../../../../../../shared/Components/CustomForm/components/DataSourceConfigurationForm";
import {generateLegendDefaults} from "../../../../../../../../../../../../shared/utils/utils";

export default function SelectedDataSourceConfigurationForm() {
    const orgUnitLevels = useRecoilValue(OrgUnitLevels)
    const scorecardEditState = useRecoilValue(ScorecardConfigEditState);
    const targetOnLevels = useRecoilValue(ScorecardConfigDirtyState('targetOnLevels'))
    const legendDefinitions = useRecoilValue(ScorecardConfigDirtyState('legendDefinitions'))
    const filteredLegendDefinitions = useMemo(() => filter(legendDefinitions, ({isDefault}) => (!isDefault)), [legendDefinitions]);
    const selectedGroupIndex = scorecardEditState?.selectedGroupIndex;
    const selectedDataHolderIndex = scorecardEditState?.selectedDataHolderIndex;
    const path = ['dataGroups', selectedGroupIndex, 'dataHolders', selectedDataHolderIndex]
    const [selectedDataHolder, updateSelectedDataHolder] = useRecoilState(ScorecardConfigDirtySelector({
        key: 'dataSelection',
        path
    }));


    const onFormChange = useCallback(
        (index) => ({values, dirty}) => {
            if (dirty) {
                const updatedList = cloneDeep(selectedDataHolder?.dataSources)
                const prevValue = updatedList[index]
                if ((prevValue.weight !== values.weight) || (prevValue.highIsGood !== values.highIsGood)) {
                    values.legends = targetOnLevels ? fromPairs([...orgUnitLevels?.map(({id}) => [id, generateLegendDefaults(filteredLegendDefinitions, values.weight, values.highIsGood)])]) : generateLegendDefaults(filteredLegendDefinitions, values.weight, values.highIsGood)
                }
                set(updatedList, [index], values)
                updateSelectedDataHolder(prevState => ScorecardIndicator.set(prevState, 'dataSources', updatedList))
            }
        },
        [filteredLegendDefinitions, orgUnitLevels, selectedDataHolder?.dataSources, targetOnLevels],
    );
    return (
        <div className='row-media'>
            {
                selectedDataHolder?.dataSources?.map((dataSource, index) => {
                    return (
                        <div key={dataSource.id} className='col-lg-6 col-md-6 data-source-form-container'
                             style={{height: '100%'}}>
                            <div className='container-bordered'>
                                <div className='column'>
                                    <div className='p-16'>
                                        <Suspense fallback={
                                            <div className='w-100 h-100 center align-items-center'>
                                                <CircularLoader small/>
                                            </div>}>
                                            <DataSourceConfigurationForm
                                                defaultValues={dataSource}
                                                legendDefinitions={filteredLegendDefinitions}
                                                onFormChange={onFormChange(index)}
                                            />
                                        </Suspense>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }) || null
            }
        </div>
    )
}




