/**
 * Scenario: Create Scorecard
 */
Given("authorized user at national level", () => {
  cy.intercept(
    "GET",
    Cypress.env("dhis2BaseUrl") +
      "/api/36/dataStore/Scorecard_App_HISPTZ/savedObjects",
    { fixture: "" }
  );
  cy.visit("/");
});
When("opening scorecard form", () => {
  cy.get("[data-test='new-scorecard-button']").click();
});
And("providing general scorecard details", () => {
  cy.get("input[name='title']").type("Sample Scorecard");
  cy.get("input[name='subtitle']").type("Sample Scorecard Subtitle");
  cy.get("textarea[name='description']").type("Scorecard Description");
  cy.get("[data-test='dhis2-uiwidgets-singleselectfield-content']").click();
  cy.get("[data-test='dhis2-uicore-singleselectoption']").first().click();
});
And("configuring indicator groups details", () => {
  cy.get("[data-test='scorecard-admin-next-button']").click();
  cy.get("[data-test='scocecard-add-group-button']").click();
  cy.get("[data-test='scorecard-group-expand']").first().click();
});
And("configuring indicator data details", () => {
  loadDataSourceFixture();
  cy.get("[data-test='scorecard-indicator-add']").first().click();
  cy.get("[data-test='dhis2-uicore-transferoption']").first().dblclick();
  cy.get("[data-test='scorecard-data-source-add']").click();
});
Then("scorecard should be saved and be available in the list", () => {
  cy.get("[data-test='scorecard-save-button']").click();
  cy.contains("Sample Scorecard").should("be.visible");
});
