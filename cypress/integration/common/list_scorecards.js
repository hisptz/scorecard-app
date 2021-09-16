/// <reference types ="cypress" />

// When("opening a list of available scorecards", () => {
//     // cy.intercept(
//     //   "GET",
//     //   Cypress.env("dhis2BaseUrl") +
//     //     "/api/36/dataStore/hisptz-scorecard/savedObjects",
//     //   { fixture: "" }
//     // );
  
//     cy.intercept("GET", "/api/36/dataStore/hisptz-scorecard/scorecard-summary", {
//       fixture: "scorecard-summary.json",
//     }).as('score');
//     cy.wait('@score').then(()=>{
//       cy.get('[data-test=scorecard-thumbnail-view]').should("be.visible");
//     })

//   });

//   When("opening a list of available scorecards", () => {
//     cy
//     .get('[data-test=scorecard-thumbnail-view]').
//     should((scoreboard)=>{
//       expect(scoreboard).to.have.length.greaterThan(0)
//     })
//   });



  When('opening a list of available scorecards',()=>{
    cy.wait(6000)
    cy.get('[data-test=scorecard-thumbnail-view]').should("be.visible");
  
  });
  

Then('a table of indicators against locations should displayed',()=>{
  cy.get('[data-test=orgUnit-parent-table-column-cell]').should('be.visible')
  cy.get('[data-test=indicator-table-header-cell]').should('be.visible')
}
  );

