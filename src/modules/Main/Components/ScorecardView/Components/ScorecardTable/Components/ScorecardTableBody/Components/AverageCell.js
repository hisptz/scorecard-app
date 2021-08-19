import {round} from "lodash";
import PropTypes from 'prop-types'
import React from 'react'
import SingleCellSvg from "../../../../../../../../../shared/Components/ScorecardCell/Components/SingleCellSvg";

export default function AverageCell({value}) {

    return (
        <SingleCellSvg value={round(value, 2)}/>
    )
}

AverageCell.propTypes = {
    value: PropTypes.number.isRequired
};
