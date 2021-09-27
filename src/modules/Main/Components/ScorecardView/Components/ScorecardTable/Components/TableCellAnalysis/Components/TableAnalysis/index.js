/* eslint-disable import/no-unresolved */
import React from "react";
import TableItemComponent from "./Components/table-item/table-item.component";

export default function TableAnalysis() {
  return (
    <div
      className="column align-items-center center"
      style={{ minHeight: 500 }}
    >
      <TableItemComponent width="100%" />
    </div> // TODO: @danford
  );
}
