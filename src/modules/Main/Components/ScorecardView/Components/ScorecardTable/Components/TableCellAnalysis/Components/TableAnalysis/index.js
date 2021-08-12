import {useAlert} from "@dhis2/app-runtime";
import PropTypes from 'prop-types'
import React, {useEffect} from 'react'
import {useRecoilValue} from "recoil";
import {PeriodResolverState} from "../../../../../../../../../../core/state/period";
import useTableAnalysisData from "./hooks/useTableAnalysisData";

export default function TableAnalysis({dimensions}) {
    const {orgUnitSelection, layout, dataSources} = dimensions ?? {}
    const periods = useRecoilValue(PeriodResolverState)
    const {loading, data, error} = useTableAnalysisData({orgUnits: orgUnitSelection?.orgUnits, periods, dataSources});
    const {row, column, filter} = layout ?? {};
    const {show} = useAlert(({message}) => message, ({type}) => ({...type, duration: 3000}))


    useEffect(() => {
       if(error) show({message: error?.message ?? error?.details ?? error?.toString()})
    }, [error]);



    if (loading) return <div className='column align-items-center center' style={{minHeight: 500}}>
        <h3>Loading...</h3></div>

    if (error) return <div className='column align-items-center center' style={{minHeight: 500}}>
        <h3>{error?.message ?? error?.details ?? error?.toString()}</h3></div>


    return (
        <div className='column align-items-center center' style={{minHeight: 500}}>
            <h3>{JSON.stringify(data)}</h3></div> // TODO: @danford
    )

}

TableAnalysis.propTypes = {
    dimensions: PropTypes.object.isRequired
};
