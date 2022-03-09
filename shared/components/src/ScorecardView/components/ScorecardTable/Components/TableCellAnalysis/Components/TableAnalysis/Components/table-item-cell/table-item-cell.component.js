/* eslint-disable import/order */
import React, { useEffect, useState } from "react";
import "./table-item-cell.component.css";
import { findDataValuesFromAnalytics } from "../helper/get-data-values-from-analytics";
import PropTypes from "prop-types";

export default function TableItemCellComponent({
  analyticsObject,
  dataRowIds,
}) {
  const [dataValue, setDataValue] = useState(0);
  useEffect(() => {
    setDataValue(findDataValuesFromAnalytics(analyticsObject, dataRowIds));
  }, [analyticsObject, dataRowIds]);
  return (
    <div
      className="table-item-cell"
      style={{ backgroundColor: dataValue !== "" ? "#ffffff" : "#eeeeee" }}
    >
      {dataValue}
      <div
      // *ngIf="dataValue === ''"
      >
        &nbsp;
      </div>
    </div>
  );
}

TableItemCellComponent.propTypes = {
  analyticsObject: PropTypes.object.isRequired,
  dataRowIds: PropTypes.array.isRequired,
};
