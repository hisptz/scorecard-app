/**
 *   Scenario: Visualising Indicator Perfomance
 */
/// <reference types ="cypress" />


function openOptionsModal() {
    cy.get(
        "[data-test=@scorecard/option-button]", {timeout: 15000}
    ).click();
}

function checkOption(name) {
    cy.get(
        `[data-test=dhis2-uiwidgets-checkboxfield-content] > [data-test=dhis2-uicore-checkbox] > input[value=${name}]`
    )
        .check()
        .should("be.checked");
    cy.get("[data-test=update-button-on-options]").click();
}

function selectRadioOption(name) {
    cy.get(
        `input[value=${name}]`
    )
        .check()
        .should("be.checked");
    cy.get("[data-test=update-button-on-options]").click();
}

function uncheckOption(name) {
    cy.get(
        `[data-test=dhis2-uiwidgets-checkboxfield-content] > [data-test=dhis2-uicore-checkbox] > input[value=${name}]`
    )
        .uncheck()
        .should("not.be.checked");
    cy.get("[data-test=update-button-on-options]").click();
}

function selectDataValue() {
    cy.get(
        "[data-test=data-cell]"
    ).first()
        .should("be.visible")
        .click();
}

/**
 *   Scenario: Visualising Indicator perfomance on lower levels
 */
And("selecting a lower level locations", () => {
    cy.get(':nth-child(4) > [data-test="dhis2-uicore-tabledatacel"]').click({force: true});
});
Then(
    "a table of indicators against selected lower level locations should be displayed",
    () => {

        cy.get(
            ".p-16 > .w-100 > [data-test=dhis2-uicore-datatable-scrollbox] > [data-test=dhis2-uicore-datatable] > [data-test=dhis2-uicore-tablehead] > :nth-child(2) > :nth-child(1) > .container > .jsx-3463223249 > :nth-child(1) > [data-test=dhis2-uicore-tooltip-reference] > .align-items-center > .column"
        ).should("be.visible");
        cy.get(".jsx-2878665499 > .p-16").should("be.visible");
    }
);

/**
 *  Scenario:  Visualize Scorecards without empty rows
 */
And("deselecting view of the empty rows", () => {
    openOptionsModal()
    uncheckOption("emptyRows")
});
Then(
    "a table of indicators against locations should be displayed without empty rows",
    () => {
        cy.get("#test-cell-selector").should("not.be.empty");
    }
);

/**
 *  Scenario: visualize Scorecards with Hierarchy
 */
And("selecting to view hierarchy", () => {
    openOptionsModal()
    checkOption("showHierarchy")
});

Then(
    "table of indicators against locations with hierarchy should be displayed",
    () => {
        cy.get("[data-test=orgUnit-parent-table-column-cell]")
            .should("be.visible")
            .and("not.be.empty");
        cy.get("[data-test=indicator-table-header-cell]")
            .should("be.visible")
            .and("not.be.empty");
    }
);

/**
 *  Scenario: Visualize Scorecard with Average Column
 *
 */
And("selecting to view average column", () => {
    openOptionsModal()
    checkOption("averageColumn")
});
Then(
    "a table of indicators against locations with an average column should be displayed",
    () => {
        cy.get("[data-test=orgUnit-parent-table-column-cell]")
            .should("be.visible")
            .and("not.be.empty");
        cy.get("[data-test=indicator-table-header-cell]")
            .should("be.visible")
            .and("not.be.empty");
        cy.get("#test-average-column").should("be.visible").and("not.be.empty");
    }
);

/**
 *  Scenario: Visualize Scorecard with Average Row
 */

And("selecting to view average row", () => {
    openOptionsModal()
    checkOption("averageRow")
});
Then(
    "a table of indicators against locations with an average row should be displayed",
    () => {
        cy.get("[data-test=orgUnit-parent-table-column-cell]")
            .should("be.visible")
            .and("not.be.empty");
        cy.get("[data-test=indicator-table-header-cell]")
            .should("be.visible")
            .and("not.be.empty");
        cy.get("#test-average-column").should("be.visible").and("not.be.empty");
    }
);

/**
 *   Scenario: Visualize Scorecard with Highlighted Indicators
 */
And("selecting to view highlighted indicators", () => {
    openOptionsModal()
    checkOption("highlightedIndicators")
});
Then(
    "a table of indicators against locations with an highlighted indicators should be displayed",
    () => {
        cy.get("[data-test=orgUnit-parent-table-column-cell]")
            .should("be.visible")
            .and("not.be.empty");
        cy.get("[data-test=indicator-table-header-cell]")
            .should("be.visible")
            .and("not.be.empty");
        cy.get("#test-highlighted-indicator")
            .eq(0)
            .should("be.visible")
            .and("not.be.empty");
    }
);

/**
 *   Scenario: Visualize Scorecard with Title
 */
And("selecting to view scorecard title", () => {
    openOptionsModal()
    checkOption("title")
});
Then("scorecard title should be displayed", () => {
    cy.get("#data-test-score-card-title").should("be.visible");
});

/**
 *   Scenario: Visualize Scorecard with Item numbers
 */
And("selecting to view item with numbers", () => {
    openOptionsModal()
    checkOption("itemNumber")
});
Then(
    "a table of indicators against location with numbers should be displayed",
    () => {
        cy.get("[data-test=orgUnit-parent-table-column-cell]")
            .should("be.visible")
            .and("not.be.empty");
        cy.get("[data-test=indicator-table-header-cell]")
            .should("be.visible")
            .and("not.be.empty");
    }
);

/**
 *   Scenario: Visualize Indicators for Selected Period
 *
 */
And("selecting different periods", () => {
    cy.get("[data-test=test-selected-period]").click();
    cy.get('[data-test=fixed-tab]').click()
    cy.get("[data-test=dhis2-uicore-select-input]").click();
    cy.get('[data-test=Quarterly-type]').click()
    cy.get('[data-test=dhis2-uicore-transfer-actions-addall]').click();
    cy.get("[data-test=modal-update-button]").click();
});
Then(
    "a table of indicators and respective selected periods againsts location is displayed",
    () => {
        cy.get("[data-test=orgUnit-parent-table-column-cell]")
            .should("be.visible")
            .and("not.be.empty");
        cy.get("[data-test=indicator-table-header-cell]")
            .should("be.visible")
            .and("not.be.empty");
        cy.get("[data-test=test-period-table-scorecard]")
            .should("be.visible")
            .and("not.be.empty");
    }
);

/**
 *   Scenario: Visualize scorecard in chart
 *
 */
And("selecting a specific indicator value", () => {
    selectDataValue()
});
And("selecting to view chart", () => {
    cy.get(
        "[data-test=dhis2-uicore-modalactions] > .row > div > :nth-child(2)"
    ).click();
});
Then(
    "chart of selected indicator for selected location and period should be displayed",
    () => {
        cy.get("#renderId").should("be.visible");
    }
);

/**
 *   Scenario: View Selected Indicator's Metadata
 *
 */

And("selecting an indicator", () => {
    selectDataValue()
});
And("selecting to view indicator details", () => {
    cy.get(
        "[data-test=dhis2-uicore-modalactions] > .row > div > :nth-child(3)"
    ).click();
});
Then(
    "indicator details including metadata details,numerator,denominator and description",
    () => {
        cy.get("#test-indicator-details").should("be.visible");
        // cy.get('[data-test=test-numerator-metadata]').should('be.visible')
    }
);

/**
 *   Scenario:  Visualize Scorecard by Facility Type
 *
 */
And("filtering the locations by facility Type", () => {

    cy.get("[data-test=test-selected-organization-unit]").click();
    cy.get('[data-test="user-org-unit"] > [data-test="user-org-unit-content"]').click()
    cy.get('[data-test="select-facility-group-content"]').click();
    cy.get(`[data-test="Districts-option"]`).first().click();
    cy.get('[data-test=modal-update-button]').click({force: true});
});
Then(
    "a table of indicators against location for the selected location type should be displayed",
    () => {
        cy.get("[data-test=orgUnit-parent-table-column-cell]")
            .should("be.visible")
            .and("not.be.empty");
        cy.get("[data-test=indicator-table-header-cell]")
            .should("be.visible")
            .and("not.be.empty");
    }
);

/**
 *   Scenario:   Visualize Scorecard by Facility Ownership
 *
 */
And("filtering the locations by facility ownership", () => {
    cy.get("input.jsx-3353877153").type("hospital{enter}");
});
Then(
    "a table of indicators against location for the selected location ownership type should be displayed",
    () => {
        cy.get("[data-test=orgUnit-parent-table-column-cell]")
            .should("be.visible")
            .and("not.be.empty");
        cy.get("[data-test=indicator-table-header-cell]")
            .should("be.visible")
            .and("not.be.empty");
    }
);

/**
 *   Scenario:   Set targets for district level
 *
 */
When("creating or editing scorecard", () => {
    cy.get(
        "[data-test=edit-@scorecard/button]"
    ).first().click();
    cy.get(
        ":nth-child(3) > .MuiStepLabel-root > .MuiStepLabel-labelContainer > .MuiTypography-root"
    ).click();
});
And("setting indicator targets for district level", () => {
    cy.get("[data-test=set-target-selection] > input").check({force: true}).should("be.checked");
    cy.get("[data-test=scocecard-add-group-button]").click();
    cy.get("[data-test=@scorecard/indicator-add]").click({
        multiple: true,
        force: true,
    });
    cy.get(
        ":nth-child(3) > [data-test=dhis2-uicore-centeredcontent] > .jsx-498096601 > [data-test=dhis2-uicore-modal] > [data-test=dhis2-uicore-card] > [data-test=dhis2-uicore-modalcontent] > :nth-child(1) > :nth-child(1) > .container-bordered > .column > .pt-16 > [data-test=dhis2-uicore-field] > [data-test=dhis2-uicore-field-content] > [data-test=dhis2-uicore-transfer] > [data-test=dhis2-uicore-transfer-actions] > [data-test=dhis2-uicore-transfer-actions-addall]"
    ).click();
    cy.get(
        ":nth-child(3) > [data-test=dhis2-uicore-centeredcontent] > .jsx-498096601 > [data-test=dhis2-uicore-modal] > [data-test=dhis2-uicore-card] > [data-test=dhis2-uicore-modalactions] > [data-test=dhis2-uicore-buttonstrip] > :nth-child(2) > [data-test=@scorecard/data-source-add]"
    ).click();
    cy.get(
        ':nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > [data-rbd-draggable-context-id="2"] > :nth-child(1) > .column > [style="margin: 4px 0px;"] > :nth-child(1) > .container-bordered > .space-between > .row'
    ).click({force: true});
    cy.get('[data-test=@scorecard/data-source-add]').click()
});
Then(
    "the target set should be saved and changes reflected on the scorecard visualization",
    () => {
    }
);

/**
 *   Scenario:  Visualize Scorecard with National Targets
 */

/**
 *   Scenario: Visualize Scorecard with District Targets
 */

/**
 *   Scenario: Visualize Filtered Scorecard with The Parent Location at the Top Row
 */
And("sorting based on different Indicators", () => {
    cy.get('[data-test="indicator-table-header-cell"] > .container > .top > [data-test="dhis2-uicore-tableheadercellaction"]').click();
});
Then("the parent location should always be the first row", () => {
    cy.get('[data-test="orgUnit-parent-table-column-cell"]').should("be.visible");
});

/**
 *   Scenario:  Visualize scorecard for locations below average performance
 */
And("selecting to view locations below average", () => {
    openOptionsModal()
    selectRadioOption("BELOW_AVERAGE")
});
Then(
    "a table of locations whose values for the selected indicator are below average should be displayed",
    () => {
        cy.get("[data-test=orgUnit-parent-table-column-cell]")
            .should("be.visible")
            .and("not.be.empty");
        cy.get("[data-test=indicator-table-header-cell]")
            .should("be.visible")
            .and("not.be.empty");
        cy.get("#test-average-column").should("be.visible").and("not.be.empty");
    }
);

/**
 *   Scenario:  Visualize scorecard for locations above average performance
 */
And("selecting to view locations above  average", () => {
    openOptionsModal()
    selectRadioOption("ABOVE_AVERAGE")
});
Then(
    "a table of locations whose values for the selected indicator are above average should be displayed",
    () => {
        cy.get("[data-test=orgUnit-parent-table-column-cell]")
            .should("be.visible")
            .and("not.be.empty");
        cy.get("[data-test=indicator-table-header-cell]")
            .should("be.visible")
            .and("not.be.empty");
        cy.get("#test-average-column").should("be.visible").and("not.be.empty");
    }
);
When(/^selecting to view legend$/, function () {
    openOptionsModal()
    checkOption("legend")
});
Then(/^legend should be displayed$/, function () {
    cy.get("[data-test=legends]").should('be.visible')
});
When(/^selecting an indicator column$/, function () {
    openOptionsModal()
    checkOption("showDataInRows")
});
When(/^selecting to view top (\d+) of the selected indicator$/, function () {

});
Then(/^table of (\d+) best locations based on the selected indicator against the indicators should be displayed$/, function () {

});
When(/^selecting to view {2}league table$/, function () {

});
Then(/^a league table with ranking based on the selected indicator should be displayed$/, function () {

});
When(/^selecting to view scorecard using national targets$/, function () {

});
Then(/^a table of indicators against locations graded by the national targets should be displayed$/, function () {

});
When(/^selecting to view scorecard using district targets$/, function () {

});
Then(/^a table of indicator against locations graded by the district targets should be displayed$/, function () {

});
Given(/^authorized District Data Manager$/, function () {

});
Then(/^a table of indicators against locations graded by the district targets should be displayed$/, function () {

});
Given(/^authorized Data Officer$/, function () {

});
When(/^selecting to view the league table$/, function () {

});
Then(/^a league table with ranking based on the selected indictor should be displayed and the best (\d+) perfomances should have trophies displayed$/, function () {

});
When(/^filtering values greater than (\d+)$/, function () {

});
Then(/^a list of all locations with indicators whose values are greater than (\d+) displayed$/, function () {

});
