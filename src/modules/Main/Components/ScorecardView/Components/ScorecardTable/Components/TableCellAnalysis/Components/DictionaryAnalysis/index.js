import PropTypes from 'prop-types'
import React from 'react'


export default function DictionaryAnalysis({dimensions}) {
    const {dataSources} = dimensions ?? {}

    console.log(dataSources) //This is an array of selected indicators check the ScorecardIndicator model to know its properties

    return (
        <div className='column align-items-center center' style={{minHeight: 500}}><h3>Dictionary analysis</h3></div> //TODO: @james
    )
}

DictionaryAnalysis.propTypes = {
    dimensions: PropTypes.array.isRequired
};

