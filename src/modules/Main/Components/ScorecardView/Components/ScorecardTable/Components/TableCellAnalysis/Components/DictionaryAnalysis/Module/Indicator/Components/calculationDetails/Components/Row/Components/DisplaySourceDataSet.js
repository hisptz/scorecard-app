import PropTypes from "prop-types";
import React from 'react';


export default function DisplaySourceDataSet({data}){



    return <>
        <ul>
            {data?.map((el)=>{
                return <li key={el.id}> {el?.val} </li>
            })}
        </ul>


    </>}

DisplaySourceDataSet.PropTypes={

    data:PropTypes.arrayOf(PropTypes.object).isRequired
}