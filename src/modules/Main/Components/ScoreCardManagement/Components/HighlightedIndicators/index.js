import i18n from '@dhis2/d2-i18n'
import {Button} from '@dhis2/ui'
import AddIcon from "@material-ui/icons/Add";
import {isEmpty} from 'lodash'
import React, {Fragment, useState} from 'react'
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import ScorecardIndicator from "../../../../../../core/models/scorecardIndicator";
import {ScorecardConfigEditState, ScorecardConfigDirtyState} from "../../../../../../core/state/scorecard";
import {generateLegendDefaults} from "../../../../../../shared/utils/utils";
import DataSourceSelectorModal from "../DataConfiguration/Components/DataGroups/Components/DataSourceSelectorModal";
import HighlightedDataSourceConfigurationForm from "./HighlightedDataSourceConfigurationForm";
import HighlightedIndicatorsTable from "./Table";

export default function HighlightedIndicatorsScorecardForm() {
    const [highlightedIndicators, setHighlightedIndicators] = useRecoilState(ScorecardConfigDirtyState('highlightedIndicators'))
    const legendDefinitions = useRecoilValue(ScorecardConfigDirtyState('legendDefinitions'))
    const setScorecardEditorState = useSetRecoilState(ScorecardConfigEditState)
    const [addOpen, setAddOpen] = useState(false);

    const onAddClick = () => {
        setAddOpen(true)
    }

    const onAdd = (dataSources) => {
        const legendDefaults = generateLegendDefaults(legendDefinitions,100)
        const newDataSources = dataSources?.map(source => (new ScorecardIndicator({...source, label: source?.displayName, legends: legendDefaults})))
        setHighlightedIndicators(prevState => [
            ...(prevState || []),
            ...(newDataSources || [])
        ])
        if (!isEmpty(dataSources)) {
            setScorecardEditorState(prevState => ({
                ...prevState,
                selectedHighlightedIndicatorIndex: 0
            }))
        }
    }

    return (
        <div className='column' style={{height: '100%', marginBottom:16}}>
            <h3>{i18n.t('Highlighted Indicators')}</h3>
            {
                !isEmpty(highlightedIndicators) ?
                    <Fragment>
                        <div className='row '>
                            <Button onClick={onAddClick} primary icon={<AddIcon/>}>{i18n.t('Add')}</Button>
                        </div>
                        <div className='row'>
                            <div className='column pt-32 w-75'>
                                <HighlightedIndicatorsTable/>
                            </div>
                            <div className='column w-25'>
                                <div className='pl-16 pt-32'>
                                    <HighlightedDataSourceConfigurationForm/>
                                </div>
                            </div>
                        </div>
                    </Fragment> :
                    <div className='row align-items-center center flex-1'>
                        <Button onClick={onAddClick} primary icon={<AddIcon/>}>{i18n.t('Add Highlighted Indicator')}</Button>
                    </div>
            }
            {
                addOpen && <DataSourceSelectorModal open={addOpen} onSelect={onAdd}
                                                    disabled={highlightedIndicators?.map(({id}) => id)}
                                                    onClose={() => setAddOpen(false)}/>
            }
        </div>
    )
}
