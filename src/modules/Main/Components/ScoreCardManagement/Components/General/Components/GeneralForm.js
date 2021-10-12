import i18n from "@dhis2/d2-i18n";
import { PeriodType } from "@iapps/period-utilities";
import React from "react";
import { DHIS2ValueTypes } from "../../../../../../../shared/Components/CustomForm/constants";
import { FormFieldModel } from "../../../../../../../shared/Components/CustomForm/models";
import GeneralFormField from "./GeneralFormField";
import "../../../ScorecardManagement.module.css";

export default function GeneralForm() {
  const periodTypes = new PeriodType().get();

  return (
    <form>
      <div className="col-12">
        <div className="col-12 general-settings">
          <GeneralFormField
            field={
              new FormFieldModel({
                id: "title",
                name: "title",
                mandatory: true,
                formName: i18n.t("Title"),
                valueType: DHIS2ValueTypes.TEXT.name,
              })
            }
          />
          <GeneralFormField
            field={
              new FormFieldModel({
                id: "subtitle",
                name: "subtitle",
                mandatory: false,
                formName: i18n.t("Subtitle"),
                valueType: DHIS2ValueTypes.TEXT.name,
                maxLength: "100",
                placeholder: i18n.t("Maximum 100 Characters"),
              })
            }
          />
        </div>
        <div className="description-settings">
          <GeneralFormField
            field={
              new FormFieldModel({
                id: "description",
                name: "description",
                mandatory: true,
                formName: i18n.t("Description"),
                valueType: DHIS2ValueTypes.LONG_TEXT.name,
              })
            }
          />
        </div>
        <div className="col-md-4 period-type-settings">
          <GeneralFormField
            field={
              new FormFieldModel({
                id: "periodType",
                name: "periodType",
                mandatory: true,
                formName: i18n.t("Period Type"),
                valueType: DHIS2ValueTypes.TEXT.name,
                optionSet: {
                  options: periodTypes?.map(({ name, id }) => ({
                    name,
                    code: id,
                  })),
                },
              })
            }
          />
        </div>
        <div className="custom-header-settings">
          <GeneralFormField
            field={
              new FormFieldModel({
                id: "customHeader",
                name: "customHeader",
                mandatory: false,
                formName: i18n.t("Custom Header"),
                valueType: DHIS2ValueTypes.RICH_TEXT.name,
              })
            }
          />
        </div>
        <div className="col-sm-6 col-xl-4 legend-definitions-settings">
          <GeneralFormField
            field={
              new FormFieldModel({
                id: "legendDefinitions",
                name: "legendDefinitions",
                formName: i18n.t("Legend Definitions"),
                valueType: DHIS2ValueTypes.MULTIPLE_FIELDS.name,
                multipleField: new FormFieldModel({
                  id: "legendDefinition",
                  name: "legendDefinition",
                  valueType: DHIS2ValueTypes.LEGEND_DEFINITION.name,
                }),
              })
            }
          />
        </div>
        <div className="col-sm-6 col-xl-4 additional-labels-settings">
          <GeneralFormField
            field={
              new FormFieldModel({
                id: "additionalLabels",
                name: "additionalLabels",
                formName: i18n.t("Additional Labels"),
                valueType: DHIS2ValueTypes.MULTIPLE_FIELDS.name,
                multipleField: new FormFieldModel({
                  id: "additionalLabel",
                  name: "additionalLabel",
                  valueType: DHIS2ValueTypes.TEXT.name,
                }),
              })
            }
          />
        </div>
      </div>
    </form>
  );
}

GeneralForm.propTypes = {};
