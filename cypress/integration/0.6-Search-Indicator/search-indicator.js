/**
 *
 *   Scenario: Filter Indicator based on Location
 *
 */

And("filter the indicators based on a specific location", () => {
  cy.get("[data-test=org-unit-search-content] >div > div> input").type("Trainingland{enter}");
});
Then("a table of indicators against locations should be displayed", () => {
  cy.get("[data-test=orgUnit-parent-table-column-cell]")
    .should("be.visible")
    .and("not.be.empty");
  cy.get("[data-test=indicator-table-header-cell]")
    .should("be.visible")
    .and("not.be.empty");
  cy.get("[data-test=indicator-table-header-cell]")
    .should("be.visible")
    .and("not.be.empty");
});

/**
 *
 *   Scenario:Filter Indicator based on period
 *
 */
And("filter the indicators based on a specific period", () => {
  cy.wait(6000);
  cy.get("[data-test=test-selected-period]").click();
  cy.get(
    '[data-value="LAST_6_MONTHS"] > [data-test=period-dimension-transfer-option-content] > .label'
  ).click();
  cy.get("[data-test=period-dimension-transfer-actions-addall]").click();
  cy.get(
    "[data-test=dhis2-uicore-modalactions] > [data-test=dhis2-uicore-buttonstrip] > :nth-child(2) > [data-test=dhis2-uicore-button]"
  ).click();
  cy.get("input.jsx-3353877153").type("June 2021{enter}");
});
Then(
  "a table of indicator against the specified period should be displayed",
  () => {
    cy.get("[data-test=indicator-table-header-cell]")
      .should("be.visible")
      .and("not.be.empty");
    cy.get("[data-test=indicator-table-header-cell]")
      .should("be.visible")
      .and("not.be.empty");
  }
);
