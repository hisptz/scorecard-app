import {round} from "lodash";
import PropTypes from 'prop-types'
import React from 'react'
import SingleCellSvg from "../../../../../../../../../shared/Components/ScorecardCell/Components/SingleCellSvg";

export default function AverageCell({value, bold}) {

    return (
        <td className='data-cell' align="center">
            <SingleCellSvg bold={bold} value={value ? round(value, 2) : ''}/>
        </td>
    )
}

AverageCell.propTypes = {
    value: PropTypes.number.isRequired,
    bold: PropTypes.bool
};
