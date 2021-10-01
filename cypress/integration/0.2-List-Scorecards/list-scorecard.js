/**
 * Scenario: Accessing Scorecard List
 */

/// <reference types ="cypress" />

const apiVersion = Cypress.env("apiVersion");

Then(
  "I should be presented with a list of already configured scorecards",
  () => {
    cy.contains("Test Scorecard ").should("be.visible");
    cy.contains("Short Scorecard").should("be.visible");
  }
);

/**
 * Scenario: Accessing many scorecards
 */
When("opening a list of many scorecards", () => {
  cy.intercept(
    "GET",
    Cypress.env("dhis2BaseUrl") +
      "/api/35/dataStore/hisptz-scorecard/savedObjects",
    { fixture: "" }
  );

  cy.intercept(
    "GET",
    Cypress.env("dhis2BaseUrl") +
      "/api/" +
      apiVersion +
      "/userDataStore/hisptz-scorecard/settings",
    { fixture: "user-datastore.json" }
  );

  cy.intercept(
    "GET",
    "/api/" + apiVersion + "/dataStore/hisptz-scorecard/scorecard-summary",
    {
      fixture: "many-scorecard-summary.json",
    }
  );
});
Then("I should be presented with a chunked list of scorecards", () => {
  cy.get(".main-container").scrollTo("bottom");
  cy.get("[data-test='dhis2-uiwidgets-pagination-page-next']")
    .contains("Next")
    .should("be.visible");
});
And(
  "I should be able to navigate through chunks to view more scorecards",
  () => {
    cy.get("[data-test='dhis2-uiwidgets-pagination-page-next']").click();
    cy.contains("Test Scorecard 6").should("be.visible");
    cy.contains("Test Scorecard 7").should("be.visible");
  }
);

/**
 * Scenario: Accessing scorecard empty list
 */
Given("an authorized department officer", () => {
  cy.visit("/");
});

When("opening a list where there are no available scorecards", () => {
  cy.intercept(
    "GET",
    Cypress.env("dhis2BaseUrl") +
      "/api/35/dataStore/hisptz-scorecard/savedObjects",
    { fixture: "" }
  );

  cy.intercept(
    "GET",
    Cypress.env("dhis2BaseUrl") +
      "/api/35/dataStore/hisptz-scorecard/scorecard-summary",
    {
      fixture: "",
    }
  );
});
Then("I should be presented with a message {string}", (content) => {
  cy.get('[data-test="welcome-scorcard-title"]')
    .contains(content)
    .should("be.visible");
});

/**
 * Scenario: Listing Scorecards on card view
 */

And("choose to view scorecards in card orientation", () => {
  cy.intercept(
    "GET",
    Cypress.env("dhis2BaseUrl") +
      "/api/35/userDataStore/hisptz-scorecard/settings",
    { fixture: "" }
  );
  cy.intercept(
    "PUT",
    Cypress.env("dhis2BaseUrl") +
      "/api/35/userDataStore/hisptz-scorecard/settings?encrypt=false",
    { fixture: "card-view-settings.json" }
  );
  cy.get("[data-test='scorecard-view-orientation']").click();
});
Then(
  "I should be presented with a cards of already configured scorecards",
  () => {
    cy.get("[data-test='scorecard-card-view']").should("be.visible");
  }
);

/**
 * Scenario: Listing Scorecards on thumbnail view
 */

And("choose to view scorecards in thumbnail orientation", () => {
  cy.intercept(
    "GET",
    Cypress.env("dhis2BaseUrl") +
      "/api/35/userDataStore/hisptz-scorecard/settings",
    { fixture: "card-view-settings.json" }
  );
  cy.intercept(
    "PUT",
    Cypress.env("dhis2BaseUrl") +
      "/api/35/userDataStore/hisptz-scorecard/settings?encrypt=false",
    { fixture: "thumbnail-view-settings.json" }
  );
  cy.get("[data-test='scorecard-view-orientation']").click();
});
Then(
  "I should be presented with a thumbnails of already configured scorecards",
  (content) => {
    cy.get("[data-test='scorecard-thumbnail-view']").should("be.visible");
  }
);
