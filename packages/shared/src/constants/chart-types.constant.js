import i18n from '@dhis2/d2-i18n'
import {Area, Bar, Column, Dotted, Pie} from "../resources";

export const CHART_TYPES = [
    {
        type: "column",
        description: i18n.t("Column chart"),
        icon: Column,
    },
    {
        type: "line",
        description: i18n.t("Line chart"),
        icon: Dotted,
    },
    {
        type: "bar",
        description: i18n.t("Bar chart"),
        icon: Bar,
    },
    {
        type: "area",
        description: i18n.t("Area chart"),
        icon: Area,
    },
    {
        type: "pie",
        description: i18n.t("Pie chart"),
        icon: Pie,
    },
];
