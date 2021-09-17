/**
 *   Scenario: Visualising Indicator Perfomance
 */
/// <reference types ="cypress" />



  /**
 *   Scenario: Visualising Indicator perfomance on lower levels
 */
   And('selecting a lower level locations',()=>{
    cy.get(':nth-child(2) > [data-test=dhis2-uicore-tabledatacel] > svg > path').click({force:true})
  });
  Then('a table of indicators against selected lower level locations should be displayed',()=>{
    cy.wait(6000)
    cy.get('.p-16 > .w-100 > [data-test=dhis2-uicore-datatable-scrollbox] > [data-test=dhis2-uicore-datatable] > [data-test=dhis2-uicore-tablehead] > :nth-child(2) > :nth-child(1) > .container > .jsx-3463223249 > :nth-child(1) > [data-test=dhis2-uicore-tooltip-reference] > .align-items-center > .column').should('be.visible')
    cy.get('.jsx-2878665499 > .p-16').should('be.visible')
  })
  
  /**
   *  Scenario:  Visualize Scorecards without empty rows
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
   *  Scenario: visualize Scorecards with Hierarchy
   */
   And('selecting to view hierarchy',()=>{
    cy.get(':nth-child(2) > :nth-child(1) > [data-test=dhis2-uicore-button]').click();
    cy.get(':nth-child(5) > [data-test=dhis2-uiwidgets-checkboxfield-content] > [data-test=dhis2-uicore-checkbox] > input.jsx-2289862737').check().should('be.checked')
    cy.get('[data-test=update-button-on-options]').click()
  })
  
  Then('table of indicators against locations with hierarchy should be displayed',()=>{
    cy.wait(6000)
    cy.get('[data-test=orgUnit-parent-table-column-cell]').should('be.visible').and('not.be.empty')
    cy.get('[data-test=indicator-table-header-cell]').should('be.visible').and('not.be.empty')
  })
  
  /**
   *  Scenario: Visualize Scorecard with Average Column
   * 
   */
  And("selecting to view average column",()=>{
    cy.get(':nth-child(2) > :nth-child(1) > [data-test=dhis2-uicore-button]').click();
    cy.get(':nth-child(5) > [data-test=dhis2-uiwidgets-checkboxfield-content] > [data-test=dhis2-uicore-checkbox] > input.jsx-2289862737').check().should('be.checked')
    cy.get('[data-test=update-button-on-options]').click()
  })
  Then('a table of indicators against locations with an average column should be displayed',()=>{
    cy.wait(6000)
    cy.get('[data-test=orgUnit-parent-table-column-cell]').should('be.visible').and('not.be.empty')
    cy.get('[data-test=indicator-table-header-cell]').should('be.visible').and('not.be.empty')
    cy.get("#test-average-column").should('be.visible').and('not.be.empty')
  
  })
  
  /**
   *  Scenario: Visualize Scorecard with Average Row
   */
  
  And("selecting to view average row",()=>{
    cy.get(':nth-child(2) > :nth-child(1) > [data-test=dhis2-uicore-button]').click();
    cy.get(':nth-child(7) > [data-test=dhis2-uiwidgets-checkboxfield-content] > [data-test=dhis2-uicore-checkbox] > .icon').check().should('be.checked')
    cy.get('[data-test=update-button-on-options]').click()
  })
  Then("a table of indicators against locations with an average row should be displayed",()=>{
    cy.wait(6000)
    cy.get('[data-test=orgUnit-parent-table-column-cell]').should('be.visible').and('not.be.empty')
    cy.get('[data-test=indicator-table-header-cell]').should('be.visible').and('not.be.empty')
    cy.get("#test-average-column").should('be.visible').and('not.be.empty')
  })
  
  
  /**
   *   Scenario: Visualize Scorecard with Highlighted Indicators
   */
  And("selecting to view highlighted indicators",()=>{
    cy.get(':nth-child(2) > :nth-child(1) > [data-test=dhis2-uicore-button]').click();
    cy.get(':nth-child(8) > [data-test=dhis2-uiwidgets-checkboxfield-content] > [data-test=dhis2-uicore-checkbox] > input.jsx-2289862737').check().should('be.checked');
    cy.get('[data-test=update-button-on-options]').click();
  })
  Then("a table of indicators against locations with an highlighted indicators should be displayed",()=>{
    cy.wait(6000)
    cy.get('[data-test=orgUnit-parent-table-column-cell]').should('be.visible').and('not.be.empty')
    cy.get('[data-test=indicator-table-header-cell]').should('be.visible').and('not.be.empty')
    cy.get("#test-highlighted-indicator").eq(0).should('be.visible').and('not.be.empty')
   
  })
  
  /**
   *   Scenario: Visualize Scorecard with Title
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
   *   Scenario: Visualize Scorecard with Item numbers
   */
  And("selecting to view item with numbers",()=>{
    cy.get(':nth-child(2) > :nth-child(1) > [data-test=dhis2-uicore-button]').click();
    cy.get(':nth-child(2) > :nth-child(3) > [data-test=dhis2-uiwidgets-checkboxfield-content] > [data-test=dhis2-uicore-checkbox] > input.jsx-2289862737').check().should('be.checked');
    cy.get('[data-test=update-button-on-options]').click();
  })
  Then("a table of indicators against location with numbers should be displayed",()=>{
    cy.wait(6000)
    cy.get('[data-test=orgUnit-parent-table-column-cell]').should('be.visible').and('not.be.empty')
    cy.get('[data-test=indicator-table-header-cell]').should('be.visible').and('not.be.empty')
  })

  
/**
   *   Scenario: Visualize Indicators for Selected Period
   * 
   */
  And('selecting different periods',()=>{

cy.get("[data-test=test-selected-period]").click()
cy.get('[data-test=dhis2-uicore-select-input]').click()
cy.get('[data-test=period-dimension-relative-period-filter-option-DAILY]').click()
cy.get('[data-test=period-dimension-transfer-actions-addall]').click()
cy.get('[data-test=dhis2-uicore-modalactions] > [data-test=dhis2-uicore-buttonstrip] > :nth-child(2) > [data-test=dhis2-uicore-button]').click(
)
  })
  Then('a table of indicators and respective selected periods againsts location is displayed',()=>{
    cy.wait(6000)
 cy.get('[data-test=orgUnit-parent-table-column-cell]').should('be.visible').and('not.be.empty')
 cy.get('[data-test=indicator-table-header-cell]').should('be.visible').and('not.be.empty')
 cy.get('[data-test=test-period-table-scorecard]').should('be.visible').and('not.be.empty')
  })

  /**
   *   Scenario: Visualize scorecard in chart
   * 
   */
  And('selecting a specific indicator value',()=>{

    cy.get(':nth-child(1) > :nth-child(3) > div > svg > [points="0,0 0,47 100, 0"]').should('be.visible').click()
  
  })
  And('selecting to view chart',()=>{
    cy.get('[data-test=dhis2-uicore-modalactions] > .row > div > :nth-child(2)').click()
  })
  Then('chart of selected indicator for selected location and period should be displayed',()=>{
    cy.get('#renderId').should('be.visible')
  })

    /**
   *   Scenario: View Selected Indicator's Metadata
   * 
   */

 And('selecting an indicator',()=>{
    cy.get(':nth-child(1) > :nth-child(3) > div > svg > [points="0,0 0,47 100, 0"]').should('be.visible').click()
  })
  And('selecting to view indicator details',()=>{
    cy.get('[data-test=dhis2-uicore-modalactions] > .row > div > :nth-child(3)').click()
  })
  Then('indicator details including metadata details,numerator,denominator and description',()=>{
    cy.get('#test-indicator-details').should('be.visible')
    // cy.get('[data-test=test-numerator-metadata]').should('be.visible')
  })


    /**
   *   Scenario:  Visualize Scorecard by Facility Type
   * 
   */
And('filtering the locations by facility Type',()=>{
  cy.wait(6000)
  cy.get('[data-test=test-selected-organization-unit]').click()
  cy.get('[data-test=select-facility-group').click()
  cy.get('[data-value="tDZVQ1WtwpA"] > [data-test=dhis2-uicore-checkbox]').click()
  cy.get('[data-test=update-on-select-org-unit]').click({force:true})

})
Then('a table of indicators against location for the selected location type should be displayed',()=>{
  cy.wait(6000)
  cy.get('[data-test=orgUnit-parent-table-column-cell]').should('be.visible').and('not.be.empty')
  cy.get('[data-test=indicator-table-header-cell]').should('be.visible').and('not.be.empty')
})

 /**
   *   Scenario:   Visualize Scorecard by Facility Ownership
   * 
   */
  And('filtering the locations by facility ownership',()=>{
    cy.get('input.jsx-3353877153').type('hospital{enter}')
  })
  Then('a table of indicators against location for the selected location ownership type should be displayed',()=>{
    cy.wait(6000)
    cy.get('[data-test=orgUnit-parent-table-column-cell]').should('be.visible').and('not.be.empty')
    cy.get('[data-test=indicator-table-header-cell]').should('be.visible').and('not.be.empty')
  })

   /**
   *   Scenario:   Set targets for district level
   * 
   */
  When('creating or editing scorecard',()=>{
    cy.wait(6000)
    cy.get(':nth-child(1) > .space-between > .end > [data-test=dhis2-uicore-buttonstrip] > :nth-child(2) > [data-test=dhis2-uicore-button]').click()
    cy.get(':nth-child(3) > .MuiStepLabel-root > .MuiStepLabel-labelContainer > .MuiTypography-root').click()
  })
  And('setting indicator targets for district level',()=>{
    cy.get('input.jsx-2289862737').check({force:true}).should('be.checked')
    cy.get('[data-test=scocecard-add-group-button]').click()
    cy.get('[data-test=scorecard-indicator-add"]').click()
  })
  Then('the target set should be saved and changes reflected on the scorecard visualization',()=>{
   
  })

   /**
   *   Scenario:  Visualize Scorecard with National Targets
   */

     /**
   *   Scenario: Visualize Scorecard with District Targets
   */
  

    /**
   *   Scenario: Visualize Filtered Scorecard with The Parent Location at the Top Row
   */
  And('sorting based on different Indicators',()=>{
    cy.wait(6000)
    cy.get(':nth-child(2) > :nth-child(1) > .container > .jsx-3463223249 > [data-test=dhis2-uicore-tableheadercellaction] > .default > g.jsx-3044873695 > .top').click()
  })
 Then('the parent location should always be the first row',()=>{
  cy.wait(6000)
  cy.get(':nth-child(1) > [data-test=orgUnit-parent-table-column-cell] > [data-test=dhis2-uicore-tooltip-reference] > .align-items-center > .column').should('be.visible')
})

    /**
   *   Scenario:  Visualize scorecard for locations below average performance
   */
  And('selecting to view locations below average',()=>{
    cy.wait(6000)
    cy.get(':nth-child(2) > :nth-child(1) > [data-test=dhis2-uicore-button]').click();
    cy.get(':nth-child(2) > input.jsx-1176042981').check().should('be.checked')
    cy.get('[data-test=update-button-on-options]').click()
  })
  Then('a table of locations whose values for the selected indicator are below average should be displayed',()=>{
    cy.wait(6000)
    cy.get('[data-test=orgUnit-parent-table-column-cell]').should('be.visible').and('not.be.empty')
    cy.get('[data-test=indicator-table-header-cell]').should('be.visible').and('not.be.empty')
    cy.get("#test-average-column").should('be.visible').and('not.be.empty')
  })

    /**
   *   Scenario:  Visualize scorecard for locations above average performance
   */
  And('selecting to view locations above  average',()=>{
    cy.wait(6000)
    cy.get(':nth-child(2) > :nth-child(1) > [data-test=dhis2-uicore-button]').click();
    cy.get(':nth-child(3) > input.jsx-1176042981').check().should('be.checked')
    cy.get('[data-test=update-button-on-options]').click()
  })
  Then('a table of locations whose values for the selected indicator are above average should be displayed',()=>{
    cy.wait(6000)
    cy.get('[data-test=orgUnit-parent-table-column-cell]').should('be.visible').and('not.be.empty')
    cy.get('[data-test=indicator-table-header-cell]').should('be.visible').and('not.be.empty')
    cy.get("#test-average-column").should('be.visible').and('not.be.empty')
  })

