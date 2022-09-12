export const APP_NAME = "hisptz-scorecard";
export const APP_TITLE = "Interactive Scorecard";
export const DATASTORE_NAMESPACE = "hisptz-scorecard";
export const DATASTORE_ENDPOINT = "dataStore/hisptz-scorecard";
export const DATASTORE_SCORECARD_SUMMARY_KEY = "scorecard-summary";
export const DATASTORE_SCORECARD_SUMMARY_INCLUDE_KEYS = [
    {
        key: "title",
        path: ["title"],
    },
    {
        key: "description",
        path: ["description"],
    },
    {
        key: "id",
        path: ["id"],
    },
    {
        key: "user",
        path: ["user", "id"],
    },
    {
        key: "userAccesses",
        path: ["userAccesses"],
    },
    {
        key: "userGroupAccesses",
        path: ["userGroupAccesses"],
    },
    {
        key: "publicAccess",
        path: ["publicAccess"],
    },
    {
        key: "additionalLabels",
        path: ["additionalLabels"],
    },
];
export const DATASTORE_OLD_SCORECARD_ENDPOINT = "dataStore/scorecards";
export const DATASTORE_FUNCTIONS_ENDPOINT = "dataStore/functions";
export const SCORECARD_DOCUMENTATION_URL =
    "https://docs.dhis2.org/en/use/optional-apps/interactive-scorecard-app/app-version-01/scorecard-and-demo.html";
