import PropTypes from 'prop-types'
import React from 'react'

export default function TableAnalysis({dimensions}){
    const {row, column, filter} = dimensions ?? {}


    return(
        <div className='column align-items-center center' style={{minHeight: 500}}><h3>Table analysis</h3></div> // TODO: @danford
    )

}

TableAnalysis.propTypes = {
    dimensions: PropTypes.object.isRequired
};
