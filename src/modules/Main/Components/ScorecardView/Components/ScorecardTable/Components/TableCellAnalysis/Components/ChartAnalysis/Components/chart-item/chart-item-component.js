import Highcharts from "highcharts";
import PropTypes from "prop-types";
import React, { useEffect, } from "react";
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { DataState } from "../../../../state/data";
import "./chart-item-component.css";
import { LayoutState } from "../../../../state/layout";
import { chartTypesAtom,chartUpdateAtom,currentChartTypeAtom } from "../../atoms/chartAnalyticsChart";
import { getChartConfiguration } from "../../helper/get-chart-configuration.helper";
import { getCharObject } from "../../helper/get-chart-object.helper";




export default function ChartItemComponent({ chartHeight }) {
  const chartTypes = useRecoilValue(chartTypesAtom);
  const setChartUpdate = useSetRecoilState(chartUpdateAtom);
  const [currentChartType, setCurrentChartType] =
    useRecoilState(currentChartTypeAtom);
  const data = useRecoilValue(DataState);
  const layout = useRecoilValue(LayoutState);
  let chart = "";

  useEffect(() => {
    drawChart(data["_data"], getChartConfiguration(
      {},
      "render-id-unique",
      layout,
      '',
      currentChartType,
      []
    ));
  }, [data, currentChartType,layout]);
  
  function drawChart(analyticsObject, chartConfiguration) {
    if (chartConfiguration && analyticsObject) {
       const chartObject = getCharObject(
         analyticsObject,
         chartConfiguration
       );

      if (chartObject) {
        setTimeout(() => {
          chart = Highcharts.chart("renderId", chartObject);
        }, 20);
      }
    }
  }

  function updateChartType(chartType, event) {
    event.stopPropagation();
    setCurrentChartType(chartType);
    drawChart(data["_data"], {
       ...getChartConfiguration(
        {},
        "render-id-unique",
        layout,
        '',
        currentChartType,
        []
      ),
      type:chartType
    });

    setChartUpdate({
      id: "render-id-unique",
      type: chartType.toUpperCase,
    });
  }

  return (
    <div className="chart-item-container" style={{ width: "100%" }}>
      <div
        id="renderId"
        className="chart-block"
        style={{ height: "calc(" + chartHeight + "px-20px", width: "100%" }}
      ></div>

      <ul
        className="chart-type-list animated fadeInRight"
      >
        {chartTypes?.map((chartType, chartTypePosition) => {
          return (
            <li key={"chart-type" + chartTypePosition}>
              <button
                onClick={(e) => updateChartType(chartType.type, e)}
                title={chartType.description}
                className={
                  currentChartType == chartType.type ? "active-chart-type" : ""
                }
              >
                <img
                  src={chartType.icon}
                  className="chart-option-icon"
                  alt=""
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

ChartItemComponent.propTypes = {
  chartHeight: PropTypes.string.isRequired,
};
