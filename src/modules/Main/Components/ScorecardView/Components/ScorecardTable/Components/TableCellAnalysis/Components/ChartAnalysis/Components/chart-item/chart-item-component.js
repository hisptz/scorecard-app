import React from 'react';
import { atom, useRecoilValue, } from 'recoil';
import { CHART_TYPES } from '../../../../../../../../../../../../core/constants/chart-types.constant';
import './chart-item-component.css';


const chartTypesAtom = atom({
  key:'chartTypes-atom',
  default: CHART_TYPES
})                                                                                                                                                                                                                                      
const showOptionsAtom = atom({
  key:'chart-option-key',
  default:false
})

export default function ChartItemComponent(){
  const chartTypes =  useRecoilValue(chartTypesAtom)
  const showOptions =  useRecoilValue(showOptionsAtom)


return (
    <div className="chart-item-container">
  <div 
  id="renderId" className="chart-block" 
  style={{height:"calc(9000px)"}}
  ></div>

  <ul className="chart-type-list animated fadeInRight" 
//   [hidden]="!showOptions"
// hidden = {showOptions}
  >
    {
      chartTypes?.map((chartType,chartTypePosition)=>{
return <li
key ={"chart-type"+chartTypePosition}
 >
  <button 
//    (click)="updateChartType(chartType.type, $event)" 
   title={chartType.description}
    // [ngClass]="currentChartType == chartType.type ? 'active-chart-type' : ''"
    // [disabled]="currentChartType == chartType.type"
    className='active-chart-type'
    >
    <img 
    src={chartType.icon} className="chart-option-icon" alt=""
    />
  </button>
</li>
      })
    }
    
  </ul>
</div>
)
}