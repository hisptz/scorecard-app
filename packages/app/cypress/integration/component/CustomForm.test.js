import {mount, mountHook} from "@cypress/react";
import {Button} from "@dhis2/ui";
import React, {useRef} from "react";
import CustomForm from "../../../../../shared/components/src/CustomForm";

// eslint-disable-next-line react/prop-types
const MockComponent = ({fields, onSubmit}) => {
    const formRef = useRef(HTMLFormElement);
    return (
        <div>
            <CustomForm
                fields={fields}
                formReference={formRef}
                onSubmit={(data) => {
                    onSubmit(data);
                }}
            />
            <Button primary onClick={() => formRef.current.requestSubmit()}>
                Submit
            </Button>
        </div>
    );
};

describe("Custom Form Tests", () => {
    const field = (name, type, validations) => ({
        id: name,
        name,
        formName: name,
        valueType: type,
        mandatory: true,
        validations,
    });
    const fields = [
        field("Text", "TEXT"),
        field("Number", "NUMBER"),
        field("TextArea", "LONG_TEXT"),
        field("Checkbox", "TRUE_ONLY"),
        field("LegendDefinition", "LEGEND_DEFINITION"),
    ];
    it("Mounts With correct fields", () => {
        const formRef = mountHook(() => useRef(HTMLFormElement));
        mount(
            <CustomForm
                fields={fields}
                formReference={formRef}
                onSubmit={console.log}
            />
        );
        cy.get("#Text").should("be.visible");
        cy.get("#Number").should("be.visible");
        cy.get("#TextArea").should("be.visible");
        cy.get('[data-test="dhis2-uiwidgets-checkboxfield"]').should("be.visible");
        cy.get("#LegendDefinition").should("be.visible");
    });
    it("Submits correct values", () => {
        const callback = cy.stub();
        mount(<MockComponent fields={fields} onSubmit={callback}/>);
        cy.get("#Text").type("Text Field");
        cy.get("#Number").type("23");
        cy.get("#TextArea").type("Text Area");
        cy.get('[name="Checkbox"]').click();
        cy.get("#color-selector-btn-LegendDefinition").click();
        cy.get('[title="#D0021B"]').click();
        cy.get('[data-test="legend-definition-text-LegendDefinition"]').type(
            "Legend definition"
        );
        cy.get("button")
            .contains("Submit")
            .click()
            .then(() => {
                expect(callback).to.have.been.calledOnceWith({
                    Text: "Text Field",
                    TextArea: "Text Area",
                    Number: "23",
                    Checkbox: true,
                    LegendDefinition: {
                        color: "#d0021b",
                        name: "Legend definition",
                    },
                });
            });
    });
});
