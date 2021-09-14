import React from "react";
import PropTypes from "prop-types";


export default function IdentifiedBy({href,id}){


    return <div>
        Identified by: <i> <a style={{textDecoration:"none"}} href={href +".json"} target={"_blank"} >{id}</a> </i>
    </div>
}


IdentifiedBy.PropTypes={
    id:PropTypes.string.isRequired,
    href:PropTypes.string.isRequired
}