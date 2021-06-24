import {Chip} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, {useState} from 'react'
import DataSource from "./Components/DataSource";
import GroupSelector from "./Components/GroupSelector";


//TODO: Store in datastore
const dataSourcesTypes = [
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
        label: 'Data Sets',
        resource: 'dataSets',
        type: 'dataSet'
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
]

export default function DataSourceSelector({onSubmit, disabled}) {
    const [selectedDataSourceType, setSelectedDataSourceType] = useState(dataSourcesTypes[0]);
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
            <div className='column bordered overflow-auto'>
                <div className='row p-16'>
                    {
                        dataSourcesTypes.map(source => <Chip onClick={() => onDataSourceTypeChange(source)}
                                                             selected={selectedDataSourceType.label === source.label}
                                                             key={`chip-${source.label}`}>{source.label}</Chip>)
                    }
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

