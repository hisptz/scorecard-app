/// <reference types ="cypress" />

And("selecting to view one of the scorecards", () => {
  cy.get('[data-test="@scorecard/thumbnail-view"]')
    .first()
    .should("be.visible")
    .click();
});
