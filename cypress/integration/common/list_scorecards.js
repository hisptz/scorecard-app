/// <reference types ="cypress" />

// When("opening a list of available scorecards", () => {
//     cy.intercept(
//       "GET",
//       Cypress.env("dhis2BaseUrl") +
//         "/api/36/dataStore/hisptz-scorecard/savedObjects",
//       { fixture: "" }
//     );
  
//     cy.intercept("GET", "/api/36/dataStore/hisptz-scorecard/scorecard-summary", {
//       fixture: "scorecard-summary.json",
//     });
//   });

//   When("opening a list of available scorecards", () => {
//     cy
//     .get('[data-test=scorecard-thumbnail-view]').
//     should((scoreboard)=>{
//       expect(scoreboard).to.have.length.greaterThan(0)
//     })
//   });


// When("opening a list of available scorecards", () => {
//     cy.get('[data-test=scorecard-thumbnail-view]').
//     should((scoreboard)=>{
//       expect(scoreboard).to.have.length.greaterThan(0)
//     })
//   });
  When('opening a list of available scorecards',()=>{
cy.get("[data-test='scorecard-card-view']").should("be.visible");
  });
  

Then('a table of indicators against locations should displayed',()=>{
  cy.get('[data-test=orgUnit-parent-table-column-cell]').should('be.visible')
  cy.get('[data-test=indicator-table-header-cell]').should('be.visible')
}
  );


  /**
 *   Visualising Indicator perfomance on lower levels
 */
And('selecting a lower level locations',()=>{
  cy.get('[data-test=orgUnit-children-table-column-cell]').click({ multiple: true });
  cy.get(':nth-child(2) > [data-test=dhis2-uicore-tabledatacel] > svg > path').click({force:true})
});
Then('a table of indicators against selected lower level locations should be displayed',()=>{
  cy.get('.p-16 > .w-100 > [data-test=dhis2-uicore-datatable-scrollbox] > [data-test=dhis2-uicore-datatable] > [data-test=dhis2-uicore-tablehead] > :nth-child(2) > :nth-child(1) > .container > .jsx-3463223249 > :nth-child(1) > [data-test=dhis2-uicore-tooltip-reference] > .align-items-center > .column').should('be.visible')
  cy.get('.jsx-2878665499 > .p-16').should('be.visible')
})

