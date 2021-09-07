/**
 *   Scenario: Visualising Indicator Perfomance
 */

  When('opening a list of available scorecards',()=>{
    cy.get('[data-test=scorecard-thumbnail-view]').
    should((scoreboard)=>{
      expect(scoreboard).to.have.length.greaterThan(10)
    })
  });
  And('selecting to view one of the scorecards',()=>{


  });
  Then('a table of indicators againsts locations should displayed',
  ()=>{

  }
  );
