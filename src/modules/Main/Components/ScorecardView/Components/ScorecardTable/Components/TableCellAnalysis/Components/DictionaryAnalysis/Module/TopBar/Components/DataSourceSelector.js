import PropTypes from 'prop-types'
import React from 'react'
import {dataSourceTypes} from "../../../Utils/Models";
import DataElementPage from "../../DataElement/DataElementPage";
import IndicatorPage from "../../Indicator/IndicatorPage";

export default function DataSourceSelector({type, id}) {

    if (type === dataSourceTypes.INDICATOR) {
        return <IndicatorPage id={id}/>
    }
    if (type === dataSourceTypes.DATA_ELEMENT) {
        return <DataElementPage id={id}/>
    }
    return null
}

DataSourceSelector.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.values(dataSourceTypes)).isRequired,
};
