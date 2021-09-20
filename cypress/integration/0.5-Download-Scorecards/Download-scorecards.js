import path from 'path';
/// <reference types ="cypress" />


/**
 * Scenario: Download Indicator Visualizations PDF
 */

And('downloading the PDF of the visualization',()=>{
cy.get('[data-test=test-download-pdf]').should('be.visible').click();
cy.get(':nth-child(2) > a.jsx-665727467 > .jsx-665727467').click()
})
Then('a PDF document of the scorecard visualization should automatically download to my computer',()=>{

})

/**
 * Scenario: Download Indicator Visualizations Excel
 */
 And('downloading the excel of the  visualization',()=>{
    cy.get('[data-test=test-download-pdf]').should('be.visible').click();
    cy.get(':nth-child(1) > a.jsx-665727467 > .jsx-665727467').click();
    })
    Then('a Excel document of the scorecard visualization should automatically download to my computer',()=>{
      const downloadsFolder = Cypress.config("downloadsFolder");
      cy.readFile(path.join(downloadsFolder, "Test Scorecard.xlsx")).should("exist");
    
    })
    /**
     * Scenario: Download Excel of Row Data
     * (CSV)
     * 
     */

And('downloading the raw scorecard details in Excel format',()=>{
  cy.get('[data-test=test-download-pdf]').should('be.visible').click();
  cy.get(':nth-child(3) > a.jsx-665727467 > .jsx-665727467').click();
})
Then('an excel file with the scorecard raw data should automatically download',()=>{
  const downloadsFolder = Cypress.config("downloadsFolder");
  cy.readFile(path.join(downloadsFolder, "Test Scorecard.csv")).should("exist");
})

   /**
     * Scenario: Download DataJson of Raw Data
     * 
     * 
     */
    And('downloading the raw scorecard details in DataJson format',()=>{
      cy.get('[data-test=test-download-pdf]').should('be.visible').click();
      cy.get('[data-test=test-alma-data]').click()
      cy.get('[data-test=test-alma-data-json]').click()
    })
Then('an DataJson file with the scorecard raw data should automatically download',()=>{
  const downloadsFolder = Cypress.config("downloadsFolder");
  cy.readFile(path.join(downloadsFolder, "Test Scorecard.json")).should("exist");
})


  /**
     * Scenario: Download Metadata of Raw Data
     * 
     * 
     */
   And('downloading the raw scorecard details in Metadata format',()=>{
    cy.get('[data-test=test-download-pdf]').should('be.visible').click();
    cy.get('[data-test=test-alma-data]').click()
    cy.get('[data-test=test-alma-meta-data]').click()
  })
Then('an Metadata file with the scorecard raw data should automatically download',()=>{
const downloadsFolder = Cypress.config("downloadsFolder");
cy.readFile(path.join(downloadsFolder, "Test Scorecard-metadata.json")).should("exist");
})


