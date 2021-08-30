/* eslint-disable import/no-unresolved */
import {
    atom,
  } from "recoil";
  import { CHART_TYPES } from "../../../../../../../../../../../core/constants/chart-types.constant";

export const chartTypesAtom = atom({
    key: "chartTypes-atom",
    default: CHART_TYPES,
  });
  
  export const chartUpdateAtom = atom({
    key: "chart-update-atom",
    default: {
      id: "",
      type: "",
    },
  });
  
  export const currentChartTypeAtom = atom({
    key: "current-chart-type",
    default: "column",
  });