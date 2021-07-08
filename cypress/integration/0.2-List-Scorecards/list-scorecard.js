/**
 * Scenario: Accessing Scorecard List
 */

Given("authorized department officer", () => {
  cy.visit("/");
});

When("opening a list of available scorecards", () => {});

Then(
  "I should be presented with a list of already configured scorecards",
  () => {}
);

/**
 * Scenario: Accessing many scorecards
 */
Given("authorized department officer", () => {
  cy.visit("/");
});
When("opening a list of many scorecards", () => {});
Then("I should be presented with a chunked list of scorecards", () => {});
And(
  "I should be able to navigate through chunks to view more scorecards",
  () => {}
);

/**
 * Scenario: Accessing scorecard empty list
 */
Given("an authorized department officer", () => {
  cy.visit("/");
});
When("opening a list where there are no available scorecards", () => {});
Then("I should be presented with a message {string}", (content) => {
  cy.get('[data-test="welcome-scorcard-title"]')
    .contains(content)
    .should("be.visible");
});
