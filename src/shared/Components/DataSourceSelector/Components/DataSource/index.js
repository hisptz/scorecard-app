import {Field, Transfer} from "@dhis2/ui";
import {debounce, find, uniqBy} from 'lodash'
import PropTypes from 'prop-types'
import React, {useMemo, useState} from "react";
import DataSourceSearch from "../Search";
import useDataSources from "./hooks/useDataSources";

export default function DataSource({selectedDataSourceType, selectedGroup, onChange, selected}) {
    const [searchKeyword, setSearchKeyword] = useState();
    const {loading, data, error, nexPage, search} = useDataSources(selectedDataSourceType, selectedGroup)

    const dataSources = useMemo(() => {
        const loadedData = data || []
        const selectedData = selected || []
        return uniqBy([...loadedData, ...selectedData], 'id')
    }, [data, selected]);

    const onEndReached = () => {
        if (loading) return;
        nexPage()
    }

    const onSearchChange = debounce(search, 1000, {maxWait: 1500})

    const setSearchChange = (keyword) => {
        setSearchKeyword(keyword)
        onSearchChange(keyword);
    }

    return (
        <Field error={error} validationText={error?.message}>
            <Transfer
                onEndReached={onEndReached}
                loading={loading} onChange={(value) => {
                onChange(value.selected.map(id => find(dataSources, ['id', id])))
            }}
                selected={selected?.map(({id}) => id)}
                options={dataSources?.map(source => ({label: source.displayName, value: source.id})) || []}
                leftHeader={<DataSourceSearch setSearchKeyword={setSearchChange} keyword={searchKeyword}/>}
            />
        </Field>
    )
}

DataSource.propTypes = {
    selected: PropTypes.array,
    selectedDataSourceType: PropTypes.object,
    selectedGroup: PropTypes.object,
    onChange: PropTypes.func,
};
