import React ,{useEffect,useState} from 'react';
import './table-item-cell.component.css';
import {findDataValuesFromAnalytics} from "../helper/get-data-values-from-analytics";



export default function TableItemCellComponent (props){
  const [dataValue, setDataValue] = useState(0)
  useEffect(() => {
   setDataValue(findDataValuesFromAnalytics(props.analyticsObject,props.dataRowIds))
  }, [dataValue])
  

    return (
        <div className="table-item-cell" 
        // [style.background-color]="color" [title]="tooltip"
        
        >
     {dataValue}
    <div 
    // *ngIf="dataValue === ''"
    >&nbsp;</div>
  </div>
    );
}
