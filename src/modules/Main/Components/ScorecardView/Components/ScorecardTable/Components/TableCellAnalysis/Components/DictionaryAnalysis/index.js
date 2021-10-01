import { head } from "lodash";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { DataSourceState } from "../../state/data";
import TopBar from "./Module/TopBar";
import DataSourceSelector from "./Module/TopBar/Components/DataSourceSelector";

export default function DictionaryAnalysis() {
  const dataSources = useRecoilValue(DataSourceState) ?? [];
  const [selectedDataSource, setSelectedDataSource] = useState(
    head(dataSources)
  );

  return (
    <div className="column" style={{ minHeight: 500 }}>
      <TopBar
        selectedTab={selectedDataSource}
        dataSources={dataSources}
        onTabChange={setSelectedDataSource}
      />
      <div>
        <DataSourceSelector
          type={selectedDataSource?.type}
          id={selectedDataSource?.id}
        />
      </div>
    </div>
  );
}
