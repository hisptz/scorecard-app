import PropTypes from "prop-types";
import React from 'react'


export default function DisplaySourceDataElement (props){

    const title=props.title;
    const data=props.data;

     return <>


         <ul>
             {data.map((el)=>{
                 return <li key={el.id}>
                     {el.val}
                     <ol>
                         {el.sources.map((src)=>{
                            return <li key={src.dataSet.id}>{src.dataSet.displayName}</li>
                         })}
                     </ol>
                 </li>
             })}
         </ul>


    </>
}


DisplaySourceDataElement.PropTypes={
    title:PropTypes.string.isRequired,
    data:PropTypes.arrayOf(PropTypes.object).isRequired
}