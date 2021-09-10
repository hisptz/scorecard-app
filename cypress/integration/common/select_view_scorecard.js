/// <reference types ="cypress" />


And('selecting to view one of the scorecards',()=>{
cy.get('[data-test=scorecard-thumbnail-view] > :nth-child(1)').should('be.visible').click()
});
 