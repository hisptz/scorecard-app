import React from 'react'
import ChartItemComponent from './Components/chart-item/chart-item-component'

export default function ChartAnalysis(){

    return(
        <div className='column align-items-center center' style={{minHeight: 500}}>
            {
                <ChartItemComponent width="100%" />
            }
            </div>
    )
}
