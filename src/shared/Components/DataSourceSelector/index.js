import {Chip} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, {useState} from 'react'
import DataSource from "./Components/DataSource";
import GroupSelector from "./Components/GroupSelector";
import CustomFunctions from "./models/customFunctions";
import DataSets from "./models/dataSets";
import NativeDataSource from "./models/nativeDataSource";


//TODO: Store in datastore
const nativeDataSources = [
    {
        label: 'Indicators',
        resource: 'indicators',
        groupResource: 'indicatorGroups',
        dimensionItemType: 'INDICATOR',
        groupKey: 'indicatorGroups.id',
        type: 'indicator'
    },
    {
        label: 'Data Elements',
        resource: 'dataElements',
        groupResource: 'dataElementGroups',
        dimensionItemType: 'DATA_ELEMENT',
        groupKey: 'dataElementGroups.id',
        type: 'dataElement'
    },
    {
        label: 'Program Indicators',
        resource: 'dataItems',
        dimensionItemType: 'PROGRAM_INDICATOR',
        groupKey: 'programId',
        groupResource: 'programs',
        type: 'programIndicator'
    },
    {
        label: 'Event Data Items',
        resource: 'dataItems',
        dimensionItemType: '[PROGRAM_DATA_ELEMENT,PROGRAM_ATTRIBUTE]',
        filterType: 'in',
        groupKey: 'programId',
        groupResource: 'programs',
        type: 'programDataItem'

    },
].map(source => new NativeDataSource(source))
const dataSetConfig = new DataSets({label: 'Data Sets'})
const customFunctionsConfig = new CustomFunctions({label: 'Custom Functions'})

export default function DataSourceSelector({onSubmit, disabled}) {
    const [selectedDataSourceType, setSelectedDataSourceType] = useState(nativeDataSources[0]);
    const [selectedGroup, setSelectedGroup] = useState();
    const [selectedDataSources, setSelectedDataSources] = useState([]);
    const onGroupChange = (group) => {
        setSelectedGroup(group)
    }

    const onDataSourceSelect = (selected) => {
        setSelectedDataSources(selected)
        onSubmit(selected)
    }

    const onDataSourceTypeChange = (sourceType) => {
        setSelectedGroup(undefined)
        setSelectedDataSourceType(sourceType)
    }

    return (
        <div className='start'>
            <div className='column container-bordered'>
                <div className='row p-16 wrap'>
                    {
                        nativeDataSources.map(source => <Chip
                            onClick={() => onDataSourceTypeChange(source)}
                            selected={selectedDataSourceType.label === source.label}
                            key={`chip-${source.label}`}>{source.label}</Chip>)
                    }
                    <Chip onClick={() => onDataSourceTypeChange(dataSetConfig)}
                          selected={selectedDataSourceType.label === dataSetConfig.label}>
                        {dataSetConfig.label}
                    </Chip>
                    <Chip onClick={() => onDataSourceTypeChange(customFunctionsConfig)}
                          selected={selectedDataSourceType.label === customFunctionsConfig.label}>
                        {customFunctionsConfig.label}
                    </Chip>
                </div>
                <div className='column start w-100 p-16'>
                    <GroupSelector selectedGroup={selectedGroup} onSelect={onGroupChange}
                                   selectedDataType={selectedDataSourceType}/>

                    <div className='pt-16'>
                        <DataSource disabled={disabled} selected={selectedDataSources} onChange={onDataSourceSelect}
                                    selectedGroup={selectedGroup} selectedDataSourceType={selectedDataSourceType}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
DataSourceSelector.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    disabled: PropTypes.array
};

