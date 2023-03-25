
When(/^deleting scorecard$/, function () {
    cy.get('[data-test="@scorecard/delete-button"]').first().click();
});
When(/^confirming to delete scorecard$/, function () {
    cy.get('[data-test="dhis2-uicore-card"]').should('be.visible')
    cy.get('button[data-test="dhis2-uicore-button"]').contains("Confirm").click();

});
Then(/^the deleted scorecard should not be on the list$/, function () {
    cy.contains('Sample Scorecard').should('not.exist')
});
