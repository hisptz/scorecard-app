import area from "hisptz-scorecard/src/resources/icons/area.png";
import bar from "hisptz-scorecard/src/resources/icons/bar.png";
import column from "hisptz-scorecard/src/resources/icons/column.png";
import dotted from "hisptz-scorecard/src/resources/icons/dotted.png";
import pie from "hisptz-scorecard/src/resources/icons/pie.png";

export const CHART_TYPES = [
    {
        type: "column",
        description: "Column chart",
        icon: column,
    },
    {
        type: "line",
        description: "Line chart",
        icon: dotted,
    },
    {
        type: "bar",
        description: "Bar chart",
        icon: bar,
    },
    {
        type: "area",
        description: "Area chart",
        icon: area,
    },
    {
        type: "pie",
        description: "Pie chart",
        icon: pie,
    },
];
