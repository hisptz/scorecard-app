import {mount} from "@cypress/react";
import {ReactFinalForm} from "@dhis2/ui";
import {CustomField} from "@scorecard/shared";
import React from "react";

const {Form} = ReactFinalForm;

describe("Custom Field test", () => {
    const field = (name, type, validations) => ({
        id: name,
        name,
        formName: name,
        valueType: type,
        mandatory: true,
        validations,
    });
    // eslint-disable-next-line react/prop-types
    const CustomForm = ({children}) => (
        <Form onSubmit={console.log}>
            {(handleSubmit) => <form onSubmit={handleSubmit}>{children}</form>}
        </Form>
    );
    it("Mounts a text field", () => {
        mount(
            <CustomForm>
                <CustomField field={field("Text Field", "TEXT")}/>
            </CustomForm>
        );
        cy.get("input").should("be.visible");
        cy.get("input").invoke("attr", "type").should("eq", "text");
    });
    it("Mounts a text area field", () => {
        mount(
            <CustomForm>
                <CustomField field={field("Text Area Field", "LONG_TEXT")}/>
            </CustomForm>
        );
        cy.get("textarea").should("be.visible");
    });
    it("Mounts a number field", () => {
        mount(
            <CustomForm>
                <CustomField field={field("Number Field", "NUMBER")}/>
            </CustomForm>
        );
        cy.get("input").should("be.visible");
        cy.get("input").invoke("attr", "type").should("eq", "number");
    });
    it("Mounts a date field", () => {
        mount(
            <CustomForm>
                <CustomField field={field("Date Field", "DATE")}/>
            </CustomForm>
        );
        cy.get("input").should("be.visible");
        cy.get("input").invoke("attr", "type").should("eq", "date");
    });
    it("Mounts a checkbox field", () => {
        mount(
            <CustomForm>
                <CustomField field={field("Text Field", "TRUE_ONLY")}/>
            </CustomForm>
        );
        cy.get("input").invoke("attr", "type").should("eq", "checkbox");
    });
    it("Mounts a legend definition field", () => {
        mount(
            <CustomForm>
                <CustomField field={field("legend", "LEGEND_DEFINITION")}/>
            </CustomForm>
        );
        cy.get("input").invoke("attr", "type").should("eq", "text");
        cy.get("#color-selector-btn-legend").should("be.visible");
    });
});
