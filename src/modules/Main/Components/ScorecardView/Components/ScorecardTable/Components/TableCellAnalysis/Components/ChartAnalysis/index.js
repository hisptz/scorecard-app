import React from 'react'
import ChartListComponent from './Components/chart-list/chart-list-component'

export default function ChartAnalysis(){

    return(
        <div className='column align-items-center center' style={{minHeight: 500}}>
            {
                <ChartListComponent width="100%" />
            }
            </div>
    )
}
