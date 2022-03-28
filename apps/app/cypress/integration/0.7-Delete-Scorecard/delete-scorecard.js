
When(/^deleting scorecard$/, function () {
    cy.get('[data-test="scorecard-delete-button"]').first().click();
});
When(/^confirming to delete scorecard$/, function () {
    cy.get('[data-test=delete-confirm-modal]').should('be.visible')
    cy.get('button[data-test=delete-confirm-button]').click()

});
Then(/^the deleted scorecard should not be on the list$/, function () {
    cy.contains('Sample Scorecard').should('not.exist')
});
