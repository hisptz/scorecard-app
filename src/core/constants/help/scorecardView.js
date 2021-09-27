import i18n from "@dhis2/d2-i18n";
import React from "react";

export const SCORECARD_VIEW_HELP_STEPS = [
  {
    intro: (
      <div>
        <h3>{i18n.t("Scorecard View")}</h3>
        <p>{i18n.t("This is the default view for your scorecard")}</p>
      </div>
    ),
  },
  {
    element: "#org-unit-selector",
    intro: i18n.t("Click here to select different organisation units"),
  },
  {
    element: "#period-selector",
    intro: i18n.t("Click here to select different periods"),
  },
  {
    element: ".home-button",
    intro: i18n.t("Click here to return to scorecard list"),
  },
  {
    element: ".refresh-button",
    intro: i18n.t(
      "Click here to refresh the scorecard page. This will reset organisation units, periods, and options to default values"
    ),
  },
  {
    element: ".option-button",
    intro: i18n.t(
      "Click here to customize the scorecard look. Add numbering, enable average rows and columns, hide or show arrows and many more"
    ),
  },
  {
    element: ".scorecard-view-edit-button",
    intro: i18n.t("Click here to edit scorecard configuration"),
  },
  {
    element: ".download-button",
    intro: i18n.t(
      "Click here to download the scorecard in Excel, PDF, CSV, and JSON formats"
    ),
  },
  {
    element: ".scorecard-table",
    intro: (
      <div>
        <h3>{i18n.t("Here is the scorecard!")}</h3>
        {i18n.t("Here you can: ")}
        <ul>
          <li>
            {i18n.t("Sort table based on organisation unit names or values")}
          </li>
          <li>{i18n.t("Search organisation units")}</li>
          <li>{i18n.t("Change the table layout")}</li>
        </ul>
      </div>
    ),
  },
  {
    element: ".org-unit-search",
    intro: i18n.t("Search here for a specific organisation unit"),
  },
  {
    element: ".holder-header-cell:nth-child(1)",
    intro: i18n.t(
      "Click on the arrows to sort the table based on the selected indicator"
    ),
  },
  {
    element: ".period-header:nth-child(1)",
    intro: i18n.t("You can also sort by specific period"),
  },
  {
    element: "th.parent-org-unit-cell",
    intro: i18n.t(
      "To change the table layout, click, hold, and drag this cell to the table headers"
    ),
  },
  {
    element: ".data-cell",
    intro: i18n.t("Click on a data cell to see further analysis"),
  },
  {
    element: ".child-org-unit-row > td",
    intro: i18n.t(
      "Click on the arrow to view a scorecard of this organisation unit's lower level"
    ),
  },
];
