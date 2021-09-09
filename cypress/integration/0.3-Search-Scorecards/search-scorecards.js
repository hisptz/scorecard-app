/**
 * Scenario: Searching scorecards by name
 */
/// <reference types ="cypress" />

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


/**
 * To be implemented search by tag or category specifics
 */
And("search in the list by a certain tag or category", () => {
  cy.get('input.jsx-3353877153').type('Test Scorecard{enter}')
  cy.get('.space-between > :nth-child(1) > .column').click()
});
Then(
  "I should be presented scorecard results matching search criterias",
  () => {
    cy.get('h3').should('have.text','Test Scorecard')
  
  }
);
