import React, { Suspense } from "react";
import ChartItemComponent from "../chart-item/chart-item-component";
//React.lazy(() => import('../chart-item/chart-item-component'));
import "./chart-list-component.css";

export default function ChartListComponent() {
  return (
    <div className="chart-list">
      <Suspense fallback={<div>Loading .....</div>}>
        <ChartItemComponent chartHeight={2000} />
      </Suspense>
    </div>
  );
}
