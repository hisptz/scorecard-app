import React from 'react';
import './chart-item-component.css';


export default function ChartItemComponent(){


return (
    <div className="chart-item-container">
  <div 
//   id="{{renderId}}" className="chart-block" [style.height]="'calc(' + chartHeight + ' - 20px)'"
  
  ></div>

  <ul className="chart-type-list animated fadeInRight" 
//   [hidden]="!showOptions"
  >
    <li
    //  *ngFor="let chartType of chartTypes"
     >
      <button 
    //    (click)="updateChartType(chartType.type, $event)" 
       title="{{chartType.description}}"
        // [ngClass]="currentChartType == chartType.type ? 'active-chart-type' : ''"
        // [disabled]="currentChartType == chartType.type"
        >
        <img 
        // [src]="chartType.icon" className="chart-option-icon" alt=""
        />
      </button>
    </li>
  </ul>
</div>
)
}