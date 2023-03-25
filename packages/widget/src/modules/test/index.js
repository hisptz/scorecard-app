import React from "react";
import DataSourceSelector from "../../shared/Components/DataSourceSelector";

export default function Test() {
  return (
    <div>
      <DataSourceSelector onSubmit={console.log} />
    </div>
  );
}
