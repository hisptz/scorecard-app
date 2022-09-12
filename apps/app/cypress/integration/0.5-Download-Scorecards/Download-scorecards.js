import path from "path";
/// <reference types ="cypress" />

/**
 * Scenario: Download Indicator Visualizations PDF
 */

const fileName = 'Sample Scorecard'

function openDownloadMenu(){
    cy.get("[data-test=download-button]").should("be.visible").click();

}

function download(type){
    cy.get(`[data-test=${type}-download-menu]`).click();
}

And("downloading the PDF of the visualization", () => {
    openDownloadMenu()
    download("PDF")
});
Then(
  "a PDF document of the scorecard visualization should automatically download to my computer",
  () => {
      // cy.window().then((win) => {
      //     expect(win.print).to.be.calledOnce
      // })
  }
);

/**
 * Scenario: Download Indicator Visualizations Excel
 */
And("downloading the excel of the  visualization", () => {
    openDownloadMenu()
    download("Excel")
    cy.wait(100)
    download("Excel")

});
Then(
  "a Excel document of the scorecard visualization should automatically download to my computer",
  () => {
    const downloadsFolder = Cypress.config("downloadsFolder");
    cy.readFile(path.join(downloadsFolder, `${fileName}.xlsx`)).should(
      "exist"
    );
  }
);
/**
 * Scenario: Download Excel of Row Data
 * (CSV)
 *
 */

And("downloading the raw scorecard details in Excel format", () => {
    openDownloadMenu()
    download("CSV")
    cy.wait(100)
    download('CSV')
});
Then(
  "an excel file with the scorecard raw data should automatically download",
  () => {
    const downloadsFolder = Cypress.config("downloadsFolder");
    cy.readFile(path.join(downloadsFolder, `${fileName}.csv`)).should(
      "exist"
    );
  }
);

/**
 * Scenario: Download DataJson of Raw Data
 *
 *
 */
And("downloading the raw scorecard details in DataJson format", () => {
  openDownloadMenu()
    download("ALMA")
    cy.get('[data-test=test-alma-data-json]').click()
    cy.wait(100)
    cy.get('[data-test=test-alma-data-json]').click()
});
Then(
  "an DataJson file with the scorecard raw data should automatically download",
  () => {
    const downloadsFolder = Cypress.config("downloadsFolder");
    cy.readFile(path.join(downloadsFolder, `${fileName}.json`)).should(
      "exist"
    );
  }
);

/**
 * Scenario: Download Metadata of Raw Data
 *
 *
 */
And("downloading the raw scorecard details in Metadata format", () => {
    openDownloadMenu()
    download("ALMA")
    cy.get('[data-test=test-alma-meta-data]').click()
    cy.wait(100)
    cy.get('[data-test=test-alma-meta-data]').click()
});
Then(
  "an Metadata file with the scorecard raw data should automatically download",
  () => {
    const downloadsFolder = Cypress.config("downloadsFolder");
    cy.readFile(
      path.join(downloadsFolder, `${fileName}-metadata.json`)
    ).should("exist");
  }
);
