// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("loadDataSourceFixture", () => {
  cy.intercept(
    "GET",
    Cypress.env("dhis2BaseUrl") +
      "/api/36/indicatorGroups?fields=displayName,id,indicators%5BdisplayName%2Cid%5D",
    { fixture: "indicatorGroups.json" }
  );
  cy.intercept(
    "GET",
    Cypress.env("dhis2BaseUrl") +
      "/api/36/indicators?page=1&totalPages=true&fields=displayName,id&order=displayName%3Aasc",
    { fixture: "indicators.json" }
  );
  cy.intercept(
    "GET",
    Cypress.env("dhis2BaseUrl") + "/api/36/dataStore/functions",
    { fixture: "functions-ids.json" }
  );
  cy.intercept(
    "GET",
    Cypress.env("dhis2BaseUrl") + "/api/36/dataStore/functions/EnJxSWxLipz",
    { fixture: "function-EnJxSWxLipz.json" }
  );
  cy.intercept(
    "GET",
    Cypress.env("dhis2BaseUrl") + "/api/36/dataStore/functions/OAMFDfrgbSe",
    { fixture: "function-OAMFDfrgbSe.json" }
  );
});
