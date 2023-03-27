import i18n from "@dhis2/d2-i18n";
import React from "react";

export const SCORECARD_LIST_HELP_STEPS = [
  {
    intro: (
      <div>
        <h1>{i18n.t("Welcome to the most interactive scorecard ever!")}</h1>
      </div>
    ),
  },
  {
    element: ".search-input",
    intro: i18n.t("Search here for scorecards by name, id, or description"),
  },
  {
    element: ".change-view-button",
    intro: i18n.t(
      "Click here to change the scorecards view to either list or grid"
    ),
  },
  {
      element: ".add-scorecard-button",
      intro: i18n.t("Click here to add a new scorecard"),
  },
    {
        element: ".scorecard-list",
        intro: i18n.t(
            "Click on View or anywhere on the scorecard to view, click on Edit to edit configurations and click on Delete to delete the scorecard"
        ),
    },
];
