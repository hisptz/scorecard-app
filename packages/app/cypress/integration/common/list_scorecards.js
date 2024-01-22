/// <reference types ="cypress" />

const apiVersion = Cypress.env("apiVersion");

When("opening a list of available scorecards", () => {
  cy.get('[data-test="@scorecard/thumbnail-view"]').should("be.visible");
});

Then("a table of indicators against locations should displayed", () => {
  cy.get("[data-test=orgUnit-parent-table-column-cell]").should("be.visible");
  cy.get("[data-test=indicator-table-header-cell]").should("be.visible");
});
