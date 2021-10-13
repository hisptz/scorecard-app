/* eslint-disable no-prototype-builtins */
import { map, random, sortBy } from "lodash";

// eslint-disable-next-line max-params
export function getTableConfiguration(
  favoriteObject,
  visualizationLayout,
  type,
  dataSelections,
  interventionName
) {
  return {
    id: `${favoriteObject ? favoriteObject.id : random(1000, 1000)}_table`,
    title: getTableTitle(favoriteObject, interventionName),
    subtitle: favoriteObject.hasOwnProperty("subtitle")
      ? favoriteObject.subtitle
      : "",
    showColumnTotal: favoriteObject.hasOwnProperty("colTotal")
      ? favoriteObject.colTotal
      : true,
    showColumnSubtotal: favoriteObject.hasOwnProperty("colSubtotal")
      ? favoriteObject.colSubtotal
      : true,
    showRowTotal: favoriteObject.hasOwnProperty("rowTotal")
      ? favoriteObject.rowTotal
      : true,
    showRowSubtotal: favoriteObject.hasOwnProperty("rowSubtotal")
      ? favoriteObject.rowSubtotal
      : true,
    showDimensionLabels: favoriteObject.hasOwnProperty("showDimensionLabels")
      ? favoriteObject.showDimensionLabels
      : true,
    hideEmptyRows: favoriteObject.hasOwnProperty("hideEmptyRows")
      ? favoriteObject.hideEmptyRows
      : true,
    showHierarchy: favoriteObject.hasOwnProperty("showHierarchy")
      ? favoriteObject.showHierarchy
      : true,
    displayList: checkForEventDataType(favoriteObject, type),
    rows: visualizationLayout.rows
      ? map(
          sortBy(visualizationLayout.rows, "shouldComeFirst"),
          (row) => row.dimension
        )
      : ["pe"],
    columns: visualizationLayout.columns
      ? map(
          sortBy(visualizationLayout.columns, "shouldComeFirst"),
          (column) => column.dimension
        )
      : ["dx"],
    filters: visualizationLayout.filters
      ? map(
          sortBy(visualizationLayout.filters, "shouldComeFirst"),
          (filter) => filter.dimension
        )
      : ["ou"],
    legendSet: favoriteObject.legendSet,
    legendDisplayStrategy: favoriteObject.legendDisplayStrategy,
    styles: null,
    dataSelections,
  };
}

function checkForEventDataType(favoriteObject, favoriteType) {
  let displayList = false;
  if (favoriteType === "EVENT_REPORT") {
    if (
      favoriteObject.hasOwnProperty("dataType") &&
      favoriteObject.dataType === "EVENTS"
    ) {
      displayList = true;
    }
  }
  return displayList;
}

function getTableTitle(favoriteObject, interventionName) {
  return `${
    favoriteObject.title || favoriteObject.displayName || favoriteObject.name
  }${interventionName ? ` : ${interventionName}` : ""}`;
}
