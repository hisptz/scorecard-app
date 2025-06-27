/**
 * Scenario: Searching scorecards by name
 */
/// <reference types ="cypress" />

const scorecardName = "Sample Scorecard"


And("I search in the list by name", () => {
    cy.get("input.jsx-3353877153").type(`${scorecardName}{enter}`);
});
Then(
    "I should be presented scorecard results matching search criterias",
    () => {
        cy.get(".@scorecard/list-card-title").should("contain.text", scorecardName);
    }
);

// /**
//  * Scenario: Searching scorecards by categories/tag
//  */

/**
 * To be implemented search by tag or category specifics
 */
And("search in the list by a certain tag or category", () => {
    cy.get("input.jsx-3353877153").type(`${scorecardName}{enter}`);
    // cy.get(".space-between > :nth-child(1) > .column").click();
});

And("search in the list by a non existing tag or category", () => {
    cy.get("input.jsx-3353877153").type(`This does not exist{enter}`);
    // cy.get(".space-between > :nth-child(1) > .column").click();
});
Then(
    "I should be presented scorecard results matching search criterias",
    () => {
        cy.get(".@scorecard/list-card-title").should("contain.text", scorecardName);
    }
);

Then(
    "I should be presented with the text No Scorecards Found",
    () => {
        cy.get('[data-test="no-scorecards-found-title"]').should("contain.text", "No scorecards found");
    }
);
