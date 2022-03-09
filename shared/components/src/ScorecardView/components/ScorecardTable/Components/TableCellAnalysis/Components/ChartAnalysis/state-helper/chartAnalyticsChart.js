/* eslint-disable import/no-unresolved */
import { atom, selectorFamily } from "recoil";
import { CHART_TYPES } from "../../../../../../../../../../../core/constants/chart-types.constant";
import { getChartConfiguration } from "../helper/get-chart-configuration.helper";

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

export const chartConfigurationSelector = selectorFamily({
  key: "chart-comfiguration-selector",
  get:
    ({ layout, currentChartType }) =>
    () => {
      const configuration = getChartConfiguration(
        {},
        "render-id-unique",
        layout,
        "",
        currentChartType,
        []
      );
      return configuration;
    },
});
