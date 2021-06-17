import React from "react";
import DataSourceSelector from "../../shared/DataSourceSelector";



export default function Test(){



    return (
        <div>
            <DataSourceSelector onSubmit={console.log}/>
        </div>
    )
}
