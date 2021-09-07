/**
 *   Scenario: Visualising Indicator Perfomance
 */

  When('opening a list of available scorecards',()=>{
  
  });
  And('selecting to view one of the scorecards',()=>{

    cy.get(':nth-child(1) > .space-between > :nth-child(1) > .column > h3').click()

  });
  Then('a table of indicators againsts locations should displayed',
  ()=>{

  cy.reload()

  }
  );
