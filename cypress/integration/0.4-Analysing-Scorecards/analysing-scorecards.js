/**
 *   Scenario: Visualising Indicator Perfomance
 */
/// <reference types ="cypress" />



  /**
 *   Visualising Indicator perfomance on lower levels
 */
   And('selecting a lower level locations',()=>{
    cy.get(':nth-child(2) > [data-test=dhis2-uicore-tabledatacel] > svg > path').click({force:true})
  });
  Then('a table of indicators against selected lower level locations should be displayed',()=>{
    cy.get('.p-16 > .w-100 > [data-test=dhis2-uicore-datatable-scrollbox] > [data-test=dhis2-uicore-datatable] > [data-test=dhis2-uicore-tablehead] > :nth-child(2) > :nth-child(1) > .container > .jsx-3463223249 > :nth-child(1) > [data-test=dhis2-uicore-tooltip-reference] > .align-items-center > .column').should('be.visible')
    cy.get('.jsx-2878665499 > .p-16').should('be.visible')
  })
  
  /**
   *   Visualize Scorecards without empty rows
   */
   And('deselecting view of the emptpy rows',()=>{
    cy.get(':nth-child(2) > :nth-child(1) > [data-test=dhis2-uicore-button]').click();
    cy.get('[data-test=empty-row-option-score-card-modal-content] > [data-test=dhis2-uicore-checkbox] > input.jsx-2289862737').uncheck().should('not.be.checked')
    cy.get('[data-test=update-button-on-options]').click()
  })
  Then('a table of indicators against locations should be displayed without empty rows',()=>{
    cy.get('#test-cell-selector').should('not.be.empty')
  })
  
  
  /**
   * visualize Scorecards with Hierarchy
   */
   And('selecting to view hierarchy',()=>{
    cy.get(':nth-child(2) > :nth-child(1) > [data-test=dhis2-uicore-button]').click();
    cy.get(':nth-child(5) > [data-test=dhis2-uiwidgets-checkboxfield-content] > [data-test=dhis2-uicore-checkbox] > input.jsx-2289862737').check().should('be.checked')
    cy.get('[data-test=update-button-on-options]').click()
  })
  
  Then('table of indicators against locations with hierarchy should be displayed',()=>{
    cy.get('[data-test=orgUnit-parent-table-column-cell]').should('be.visible').and('not.be.empty')
    cy.get('[data-test=indicator-table-header-cell]').should('be.visible').and('not.be.empty')
  })
  
  /**
   * Visualize Scorecard with Average Column
   * 
   */
  And("selecting to view average column",()=>{
    cy.get(':nth-child(2) > :nth-child(1) > [data-test=dhis2-uicore-button]').click();
    cy.get(':nth-child(5) > [data-test=dhis2-uiwidgets-checkboxfield-content] > [data-test=dhis2-uicore-checkbox] > input.jsx-2289862737').check().should('be.checked')
    cy.get('[data-test=update-button-on-options]').click()
  })
  Then('a table of indicators against locations with an average column should be displayed',()=>{
    cy.get('[data-test=orgUnit-parent-table-column-cell]').should('be.visible').and('not.be.empty')
    cy.get('[data-test=indicator-table-header-cell]').should('be.visible').and('not.be.empty')
    cy.get("#test-average-column").should('be.visible').and('not.be.empty')
  
  })
  
  /**
   * Visualize Scorecard with Average Row
   */
  
  And("selecting to view average row",()=>{
    cy.get(':nth-child(2) > :nth-child(1) > [data-test=dhis2-uicore-button]').click();
    cy.get(':nth-child(7) > [data-test=dhis2-uiwidgets-checkboxfield-content] > [data-test=dhis2-uicore-checkbox] > .icon').check().should('be.checked')
    cy.get('[data-test=update-button-on-options]').click()
  })
  Then("a table of indicators against locations with an average row should be displayed",()=>{
    cy.get('[data-test=orgUnit-parent-table-column-cell]').should('be.visible').and('not.be.empty')
    cy.get('[data-test=indicator-table-header-cell]').should('be.visible').and('not.be.empty')
    cy.get("#test-average-column").should('be.visible').and('not.be.empty')
  })
  
  
  /**
   * Visualize Scorecard with Highlighted Indicators
   */
  And("selecting to view highlighted indicators",()=>{
    cy.get(':nth-child(2) > :nth-child(1) > [data-test=dhis2-uicore-button]').click();
    cy.get(':nth-child(8) > [data-test=dhis2-uiwidgets-checkboxfield-content] > [data-test=dhis2-uicore-checkbox] > input.jsx-2289862737').check().should('be.checked');
    cy.get('[data-test=update-button-on-options]').click();
  })
  Then("a table of indicators against locations with an highlighted indicators should be displayed",()=>{
  
    cy.get('[data-test=orgUnit-parent-table-column-cell]').should('be.visible').and('not.be.empty')
    cy.get('[data-test=indicator-table-header-cell]').should('be.visible').and('not.be.empty')
    cy.get("#test-highlighted-indicator").eq(0).should('be.visible').and('not.be.empty')
   
  })
  
  /**
   *  Visualize Scorecard with Title
   */
  And("selecting to view scorecard title",()=>{
    cy.get(':nth-child(2) > :nth-child(1) > [data-test=dhis2-uicore-button]').click();
    cy.get(':nth-child(2) > :nth-child(2) > [data-test=dhis2-uiwidgets-checkboxfield-content] > [data-test=dhis2-uicore-checkbox] > input.jsx-2289862737').check().should('be.checked');
    cy.get('[data-test=update-button-on-options]').click();
  })
  Then("scorecard title should be displayed",()=>{
  cy.get("#data-test-score-card-title").should('be.visible');
  })
  
  /**
   * Visualize Scorecard with Item numbers
   */
  And("selecting to view item with numbers",()=>{
    cy.get(':nth-child(2) > :nth-child(1) > [data-test=dhis2-uicore-button]').click();
    cy.get(':nth-child(2) > :nth-child(3) > [data-test=dhis2-uiwidgets-checkboxfield-content] > [data-test=dhis2-uicore-checkbox] > input.jsx-2289862737').check().should('be.checked');
    cy.get('[data-test=update-button-on-options]').click();
  })
  Then("a table of indicators against location with numbers should be displayed",()=>{
  
    cy.get('[data-test=orgUnit-parent-table-column-cell]').should('be.visible').and('not.be.empty')
    cy.get('[data-test=indicator-table-header-cell]').should('be.visible').and('not.be.empty')
  })