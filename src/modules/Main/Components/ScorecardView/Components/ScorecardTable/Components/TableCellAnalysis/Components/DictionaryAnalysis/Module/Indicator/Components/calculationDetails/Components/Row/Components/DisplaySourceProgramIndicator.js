import i18n from "@dhis2/d2-i18n";
import PropTypes from "prop-types";
import React from 'react';

export default function DisplaySourceProgramIndicator(props){

    const title=props.title;
    const data=props.data;


    return <>


        <ul>
            {data.map((el)=>{
                return<li  key={el.id}>
                    <b>{el?.val} </b> {i18n.t("source:")} {el?.sources?.displayName}
                </li>
            })}
        </ul>

    </>
}

DisplaySourceProgramIndicator.PropTypes={
    title:PropTypes.string.isRequired,
    data:PropTypes.arrayOf(PropTypes.object).isRequired
}