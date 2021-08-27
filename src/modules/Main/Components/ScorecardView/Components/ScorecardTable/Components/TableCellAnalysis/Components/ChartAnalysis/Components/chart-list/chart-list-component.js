import React, { Suspense } from 'react';
import ChartItemComponent from '../chart-item/chart-item-component';

export default function ChartListComponent(){

    return (
        <div className='chart-list'>
             <Suspense fallback={<div>Loading .....</div>}>
             <ChartItemComponent/>
             </Suspense>
        </div>

    )
}


















































