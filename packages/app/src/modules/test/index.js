import React from "react";
import DataSourceSelector from "../../../../../shared/components/src/DataSourceSelector";

export default function Test() {
    return (
        <div>
            <DataSourceSelector onSubmit={console.log}/>
        </div>
    );
}
