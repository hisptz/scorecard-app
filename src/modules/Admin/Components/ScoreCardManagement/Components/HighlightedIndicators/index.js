import {Button} from '@dhis2/ui'
import AddIcon from "@material-ui/icons/Add";
import React, {useState} from 'react'
import {useRecoilState} from "recoil";
import {ScorecardStateSelector} from "../../../../../../core/state/scorecard";
import DataSourceSelectorModal from "../DataConfiguration/Components/DataGroups/Components/DataSourceSelectorModal";
import HighlightedDataSourceConfigurationForm from "./HighlightedDataSourceConfigurationForm";
import HighlightedIndicatorsTable from "./Table";

export default function HighlightedIndicatorsScorecardForm() {
    const [highlightedIndicators, setHighlightedIndicators] = useRecoilState(ScorecardStateSelector('highlightedIndicators'))
    const [addOpen, setAddOpen] = useState(false);


    const onAddClick = () => {
        setAddOpen(true)
    }

    const onAdd = (dataSources) => {
        const newDataSources = dataSources?.map(source => ({...source, label: source?.displayName}))
        setHighlightedIndicators(prevState => [
            ...(prevState || []),
            ...(newDataSources || [])
        ])
    }

    return (
        <div className='container'>
            <h3>Highlighted Indicators</h3>
            <div className='row'>
                <Button onClick={onAddClick} primary icon={<AddIcon/>}>Add</Button>
            </div>
            <div className='row'>
                <div className='column pt-32'>
                    <HighlightedIndicatorsTable/>
                </div>
                <div className='column'>
                    <div className='pl-16 pt-32'>
                        <HighlightedDataSourceConfigurationForm  />
                    </div>
                </div>
            </div>
            {
                addOpen && <DataSourceSelectorModal open={addOpen} onSelect={onAdd}
                                                    disabled={highlightedIndicators?.map(({id}) => id)}
                                                    onClose={() => setAddOpen(false)}/>
            }
        </div>
    )
}
