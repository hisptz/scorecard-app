import i18n from "@dhis2/d2-i18n";
import {CheckboxField, Radio} from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";
import Help from "../Help";
import {AverageDisplayType, OPTIONS_HELP_STEPS} from "../../constants";

export default function ScorecardOptionsForm({options, onChange}) {
    return (
        <div className="container p-16">
            <Help helpSteps={OPTIONS_HELP_STEPS}/>
            <div className="row">
                <div className="column ">
                    <h3>{i18n.t("Visibility")}</h3>
                    <div className="column visibility-options">
                        <CheckboxField
                            checked={options?.legend}
                            onChange={onChange("legend")}
                            value="legend"
                            label={i18n.t("Legend")}
                        />
                        <CheckboxField
                            checked={options?.title}
                            onChange={onChange("title")}
                            value="title"
                            label={i18n.t("Title")}
                        />
                        <CheckboxField
                            checked={options?.itemNumber}
                            onChange={onChange("itemNumber")}
                            value="itemNumber"
                            label={i18n.t("Item Number")}
                        />
                        <CheckboxField
                            checked={options?.emptyRows}
                            onChange={onChange("emptyRows")}
                            value="emptyRows"
                            label={i18n.t("Empty Rows")}
                        />
                        <CheckboxField
                            checked={options?.showHierarchy}
                            onChange={onChange("showHierarchy")}
                            value="showHierarchy"
                            label={i18n.t("Show Hierarchy")}
                        />
                        <CheckboxField
                            checked={options?.averageColumn}
                            onChange={onChange("averageColumn")}
                            value="averageColumn"
                            label={i18n.t("Average Column")}
                        />
                        <CheckboxField
                            checked={options?.averageRow}
                            onChange={onChange("averageRow")}
                            value="averageRow"
                            label={i18n.t("Average Row")}
                        />
                        <CheckboxField
                            checked={options?.highlightedIndicators}
                            onChange={onChange("highlightedIndicators")}
                            value="highlightedIndicators"
                            label={i18n.t("Highlighted Indicators")}
                        />
                    </div>
                    <h3>{i18n.t("Average")}</h3>
                    <div className="column average-options">
                        <Radio
                            onChange={() =>
                                onChange("averageDisplayType")(AverageDisplayType.ALL)
                            }
                            checked={options?.averageDisplayType === AverageDisplayType.ALL}
                            value={AverageDisplayType.ALL}
                            label={i18n.t("All")}
                        />
                        <Radio
                            onChange={() =>
                                onChange("averageDisplayType")(AverageDisplayType.BELOW_AVERAGE)
                            }
                            checked={
                                options?.averageDisplayType === AverageDisplayType.BELOW_AVERAGE
                            }
                            value={AverageDisplayType.BELOW_AVERAGE}
                            label={i18n.t("Below Average")}
                        />
                        <Radio
                            onChange={() =>
                                onChange("averageDisplayType")(AverageDisplayType.ABOVE_AVERAGE)
                            }
                            checked={
                                options?.averageDisplayType === AverageDisplayType.ABOVE_AVERAGE
                            }
                            value={AverageDisplayType.ABOVE_AVERAGE}
                            label={i18n.t("Above Average")}
                        />
                    </div>
                    <h3>{i18n.t("Options")}</h3>
                    <div className="column other-options">
                        {/*<CheckboxField checked={options?.score} onChange={onChange('score')} value='score'*/}
                        {/*               label={i18n.t('Score')}/>*/}
                        <CheckboxField
                            checked={options?.arrows}
                            onChange={onChange("arrows")}
                            value="arrows"
                            label={i18n.t("Arrows")}
                        />
                        <CheckboxField
                            checked={options?.showDataInRows}
                            onChange={onChange("showDataInRows")}
                            value="showDataInRows"
                            label={i18n.t("Show Data in Rows")}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

ScorecardOptionsForm.propTypes = {
    options: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};
