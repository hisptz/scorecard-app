/**
 * Scenario: Searching scorecards by name
 */
/// <reference types ="cypress" />

When("opening a list of available scorecards", () => {
  cy.get('[data-test=scorecard-thumbnail-view]').
  should((scoreboard)=>{
    expect(scoreboard).to.have.length.greaterThan(0)
  })
});
And("I search in the list by name", () => {
  cy.get('input.jsx-3353877153').type('Test Scorecard{enter}');
});
Then(
  "I should be presented scorecard results matching search criterias",
  () => {
    cy.get('h3').should('have.text','Test Scorecard')
    cy
    .get('[data-test=scorecard-thumbnail-view]').
    should((scoreboard)=>{
      expect(scoreboard).to.have.length(1)    })
  }
);

// /**
//  * Scenario: Searching scorecards by categories/tag
//  */

When("opening a list of available scorecards", () => {
  cy
  .get('[data-test=scorecard-thumbnail-view]').
  should((scoreboard)=>{
    expect(scoreboard).to.have.length.greaterThan(0)
  })
});
/**
 * To be implemented search by tag or category specifics
 */
And("search in the list by a certain tag or category", () => {
  cy.get('input.jsx-3353877153').type('Test Scorecard{enter}')
});
Then(
  "I should be presented scorecard results matching search criterias",
  () => {
    cy.get('h3').should('have.text','Test Scorecard')
  }
);
