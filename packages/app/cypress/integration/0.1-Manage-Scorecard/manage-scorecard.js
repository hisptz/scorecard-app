/**
 * Scenario: Create Scorecard
 */



When("opening scorecard form", () => {
    cy.get("[data-test='new-@scorecard/button']").click();
});
And("providing general scorecard details", () => {
    cy.get("input[name='title']").type("Sample Scorecard");
    cy.get("input[name='subtitle']").type("Sample Scorecard Subtitle");
    cy.get("textarea[name='description']").type("Scorecard Description");
    cy.get("[data-test='dhis2-uiwidgets-singleselectfield-content']").click();
    cy.get('[data-value="Yearly"]').scrollIntoView().click({force: true});
    cy.get("[data-test='config-open-period-selector-button']").click();
    cy.get(`[data-test="dhis2-uicore-transfer-sourceoptions"]`).dblclick();
    cy.get(`[data-test="modal-update-button"]`).click();
});
And("configuring indicator groups details", () => {
    cy.get(".main-container").scrollTo("bottom");
    cy.get("[data-test='@scorecard/admin-next-button']").click();
    cy.get("[data-test='scocecard-add-group-button']").click();
});
And("configuring indicator data details", () => {
    cy.get("[data-test='@scorecard/indicator-add']")
        .first()
        .click({force: true});
    cy.get("[data-test='dhis2-uicore-transferoption']").first().dblclick();
    cy.get("[data-test='@scorecard/data-source-add']").click();
});
And("configuring highlighted indicators", () => {

    cy.get('[data-test=@scorecard/admin-next-button]').click();
    cy.get('[data-test=dhis2-uicore-button]').contains("Add Highlighted Indicator").click();
    cy.get('[data-test=dhis2-uicore-transferoption]').first().dblclick();
    cy.get('[data-test=@scorecard/data-source-add]').click();
})
And("configuring access and organisation unit", () => {
    cy.get('[data-test=@scorecard/admin-next-button]').click();
    cy.get('[data-test="user-org-unit-content"] > [data-test="dhis2-uicore-checkbox"] > .jsx-1366065624:nth-child(1)').click();
})

And("configuring options", () => {
    cy.get('[data-test=@scorecard/admin-next-button]').click();
    cy.get('.other-options > [data-test="dhis2-uiwidgets-checkboxfield"]:nth-child(1) [data-test="dhis2-uicore-checkbox"] > .jsx-1366065624:nth-child(1)').click();
    cy.get('[data-test="dhis2-uiwidgets-checkboxfield"]:nth-child(7) [data-test="dhis2-uicore-checkbox"] > .jsx-1366065624:nth-child(1)').click();
    cy.get('[data-test="dhis2-uiwidgets-checkboxfield"]:nth-child(6) [data-test="dhis2-uicore-checkbox"] > .jsx-1366065624:nth-child(1)').click();
})
Then("scorecard should be saved and be available in the list", () => {
    cy.get("[data-test='@scorecard/save-button']").click();
    cy.contains("Sample Scorecard").should("be.visible");
});

/**
 * Scenario: Assign Indicators to groups
 */
Then(
    "the configured indicator should be displayed in the specific data group on the scorecard visualization",
    () => {
    }
);

/**
 * Scenario: Creating/updating Scorecard legends
 */


When("opening scorecard form to edit Sample Scorecard", () => {
    cy.get('[data-test="edit-@scorecard/button"]').first().click();

});
And("editing scorecard legends and saving changes", () => {
});
Then("the changes on the scorecard legends should be visible", () => {
});

/**
 * Scenario: Pair Indicators
 */

When("opening scorecard form", () => {
});
And("selecting indicators", () => {
});
And("selecting an indicator group", () => {
});
And("selecting an indicator", () => {
});
And("configuring indicator data details", () => {
});
And("selecting pair with another indicator", () => {
});
And("selecting an indicator to pair with", () => {
});
Then(
    "the configured indicator should be displayed with the paired indicator on the same column  on the scorecard visualization",
    () => {
    }
);

/**
 * Scenario: Sharing Scorecard to user groups
 */

When(/^Creating\/updating scorecard$/, () => {
});
And(
    /^selecting to share with a specific user group and saving the changes$/,
    function () {
    }
);
Then(
    "the users in the specific user group should be able to access the scorecard",
    () => {
    }
);

/**
 * Scenario: Configure legends for indicators
 */
When("adding indicators to a scorecard", () => {
});
And(
    "configuring maximum and minimum values for predefined legend values and saving the changes",
    () => {
    }
);
Then(
    "the changes on the legend values should be reflected in the scorecard",
    () => {
    }
);


When(/^editing scorecard legends$/, function () {

});
When(/^deleting scorecard$/, function () {
    cy.get('[data-test="@scorecard/delete-button"]').first().click();
});
When(/^confirming to delete scorecard$/, function () {
    cy.get('[data-test=delete-confirm-modal]').should('be.visible')
    cy.get('button[data-test=delete-confirm-button]').click()

});
Then(/^the deleted scorecard should not be on the list$/, function () {
    cy.contains('Sample Scorecard').should('not.exist')
});
