
const apiVersion = Cypress.env("apiVersion")

function interceptSummaryUpdate(){
  cy.intercept('PUT', Cypress.env("dhis2BaseUrl") +
      "/api/" + apiVersion + "/dataStore/hisptz-scorecard/*", {fixture: ""})
}

function interceptMigration(){
  cy.intercept('POST', Cypress.env("dhis2BaseUrl") +
      "/api/" + apiVersion + "/dataStore/hisptz-scorecard/*", {fixture: ""})
  // cy.intercept('PUT', Cypress.env("dhis2BaseUrl") +
  //     "/api/" + apiVersion + "/dataStore/hisptz-scorecard/*", {fixture: ""})
}

Given("an authorized department officer", () => {
  interceptMigration()
  cy.visit("/");
});

Given("authorized user at national level", () => {
  // cy.loadDataSourceFixture();
  cy.visit("/");
});

Given("authorized coordinator", () => {
  interceptMigration()

  cy.visit("/");
});

Given("authorized department officer", () => {
  interceptSummaryUpdate()
  cy.visit("/");
});
Given("authorized programme coordinator", () => {
  interceptMigration()
  cy.visit("/");
});
Given("authorized data officer", () => {
  interceptMigration()

  cy.visit("/");
});

Given("authorized Regional Manager", () => {
  interceptMigration()

  cy.visit("/");
});
Given("authorized M&E Officer", () => {
  interceptMigration()
  cy.visit("/");
});
Given("authorized Data Manager", () => {
  interceptMigration()

  cy.visit("/");
});
Given("user with privilege access at district level", () => {
  interceptMigration()
  cy.visit("/");
});
Given("authorized officer", () => {
  interceptMigration()
  cy.visit("/");
});
