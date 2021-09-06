import PropTypes from "prop-types";
import React from 'react';


export default function DisplaySourceDataSet(props){
    const title=props.title;
    const data=props.data;

    return <>

        <h5>{title}</h5>

        <ul>
            {data.map((el)=>{
                return <li key={el.id}> {el.val} </li>
            })}
        </ul>


    </>}

DisplaySourceDataSet.PropTypes={
    title:PropTypes.string.isRequired,
    data:PropTypes.arrayOf(PropTypes.object).isRequired
}