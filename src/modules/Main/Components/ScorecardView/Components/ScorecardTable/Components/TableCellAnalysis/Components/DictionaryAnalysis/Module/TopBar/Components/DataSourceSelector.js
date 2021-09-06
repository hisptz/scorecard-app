import PropTypes from 'prop-types'
import React from 'react'
import {dataSourceTypes} from "../../../Utils/Models";
import Index from "../../Indicator/Index";

export default function DataSourceSelector({type, id}) {

    if (type === dataSourceTypes.INDICATOR) {
        return <Index id={id}/>
    }
    if (type === dataSourceTypes.DATA_ELEMENT) {
        return null
    }
    return null
}

DataSourceSelector.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.values(dataSourceTypes)).isRequired,
};
