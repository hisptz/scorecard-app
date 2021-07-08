/**
 * Scenario: Create Scorecard
 */
Given("authorized user at national level", () => {
  cy.visit("/");
});
When("opening scorecard form", () => {
  cy.get("[data-test='new-scorecard-button']").click();
});
And("providing general scorecard details", () => {
  cy.get("input[name='title']").type("Scorecard Title");
  cy.get("input[name='subtitle']").type("Scorecard Subtitle");
  cy.get("textarea[name='description']").type("Scorecard Description");
  cy.get("[data-test='dhis2-uiwidgets-singleselectfield-content']").click();
  cy.get("[data-test='dhis2-uicore-singleselectoption']").first().click();
});
And("configuring indicator groups details", () => {});
And("configuring indicator data details", () => {});
Then(
  "the configured indicator should be displayed on the scorecard visualization",
  () => {}
);
