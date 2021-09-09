/// <reference types ="cypress" />


And('selecting to view one of the scorecards',()=>{
cy.get('[data-test=scorecard-card-view] > :nth-child(1)').should('be.visible').click()
});

  