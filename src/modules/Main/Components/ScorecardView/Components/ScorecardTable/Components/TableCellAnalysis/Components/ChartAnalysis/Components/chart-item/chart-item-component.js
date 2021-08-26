import {Highcharts} from 'highcharts';
import React,{useEffect} from 'react';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState, } from 'recoil';
import { CHART_TYPES } from '../../../../../../../../../../../../core/constants/chart-types.constant';
import { getCharObject } from '../../helper/get-chart-object.helper';
import './chart-item-component.css';

const chartTypesAtom = atom({
  key:'chartTypes-atom',
  default: CHART_TYPES
})                                                                                                                                                                                                                                      
const showOptionsAtom = atom({
  key:'chart-option-key',
  default:false
})

const chartUpdateAtom = atom({
  key:'chart-update-atom',
  default:{
    id:'',
    type:''
  }
})

const currentChartTypeAtom = atom({
  key:'current-chart-type',
  default:''
})

export default function ChartItemComponent(){
  const chartTypes =  useRecoilValue(chartTypesAtom)
  const showOptions =  useRecoilValue(showOptionsAtom)
  const setChartUpdate = useSetRecoilState(chartUpdateAtom);
  const [currentChartType,setCurrentChartType] = useRecoilState(currentChartTypeAtom);
  let chart = '' ;

console.log(showOptions);

useEffect(() => {
  drawChart({},{})

}, [])


 
function drawChart(analyticsObject, chartConfiguration){
  if (chartConfiguration && analyticsObject) {
     const chartObject = getCharObject(
       analyticsObject,
       chartConfiguration
     );

     if (chartObject) {
       setTimeout(() => {
        chart = Highcharts.chart(chartObject)
       }, 20);
     }
   }
 } 





  function updateChartType(chartType,event){
   event.stopPropagation();
   console.log("button on click");
   setCurrentChartType(chartType);

   drawChart({},{
    //  ...this.chartConfiguration,
    // type:chartType
   })

   setChartUpdate({
     id:Math.random(),
     type:chartType.toUpperCase
   });
  }


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
onClick={()=>updateChartType(chartType.type,event)}
   title={chartType.description}
    className={currentChartType == chartType.type ? 'active-chart-type' :''}
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