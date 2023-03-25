import i18n from "@dhis2/d2-i18n";
import {Button} from "@dhis2/ui";
import {Help} from "@scorecard/shared"
import {HIGHLIGHTED_INDICATOR_HELP_STEPS} from "@scorecard/shared";
import {ScorecardIndicator} from "@scorecard/shared";
import {ScorecardConfigEditState,} from "@scorecard/shared";
import {generateLegendDefaults} from "@scorecard/shared";
import AddIcon from "@material-ui/icons/Add";
import {isEmpty} from "lodash";
import React, {Fragment, useCallback, useState} from "react";
import {useFormContext} from "react-hook-form";
import {useSetRecoilState} from "recoil";
import DataSourceSelectorModal from "../DataConfiguration/Components/DataGroups/Components/DataSourceSelectorModal";
import {getNonDefaultLegendDefinitions} from "../General/utils/utils";
import HighlightedDataSourceConfigurationForm from "./HighlightedDataSourceConfigurationForm";
import HighlightedIndicatorsTable from "./Table";

export default function HighlightedIndicatorsScorecardForm() {
    const {watch, setValue, register} = useFormContext();
    register("highlightedIndicators");
    const highlightedIndicators = watch("highlightedIndicators");

    const setHighlightedIndicators = useCallback((highlightedIndicators) => {
        setValue("highlightedIndicators", highlightedIndicators);
    }, [setValue]);

    const legendDefinitions = getNonDefaultLegendDefinitions(watch("legendDefinitions"));

    const setScorecardEditorState = useSetRecoilState(ScorecardConfigEditState);
    const [addOpen, setAddOpen] = useState(false);

    const onAddClick = () => {
        setAddOpen(true);
    };

    const onAdd = useCallback((dataSources) => {
        const legendDefaults = generateLegendDefaults(legendDefinitions, 100, true);
        const newDataSources = dataSources?.map(
            (source) =>
                new ScorecardIndicator({
                    ...source,
                    label: source?.displayName,
                    legends: legendDefaults,
                })
        );
        setHighlightedIndicators([
            ...(highlightedIndicators ?? []),
            ...(newDataSources ?? []),
        ]);
        if (!isEmpty(dataSources)) {
            setScorecardEditorState((prevState) => ({
                ...prevState,
                selectedHighlightedIndicatorIndex: 0,
            }));
        }
    }, [highlightedIndicators, legendDefinitions, setHighlightedIndicators, setScorecardEditorState]);

    return (
        <div className="column" style={{height: "100%"}}>
            <Help helpSteps={HIGHLIGHTED_INDICATOR_HELP_STEPS}/>
            <h3>{i18n.t("Highlighted Indicators")}</h3>
            {!isEmpty(highlightedIndicators) ? (
                <Fragment>
                    <div className="rowlabel ">
                        <Button
                            className="add-highlighted-indicator-button"
                            onClick={onAddClick}
                            icon={<AddIcon/>}
                        >
                            {i18n.t("Add")}
                        </Button>
                    </div>
                    <div className="row">
                        <div className="col-md-8 pt-32 ">
                            <HighlightedIndicatorsTable/>
                        </div>
                        <div className="col-md-4">
                            <div className="pl-16 pt-32">
                                <HighlightedDataSourceConfigurationForm/>
                            </div>
                        </div>
                    </div>
                </Fragment>
            ) : (
                <div className="row align-items-center center flex-1">
                    <Button
                        className="add-highlighted-indicator-button"
                        onClick={onAddClick}
                        icon={<AddIcon/>}
                    >
                        {i18n.t("Add Highlighted Indicator")}
                    </Button>
                </div>
            )}
            {addOpen && (
                <DataSourceSelectorModal
                    open={addOpen}
                    onSelect={onAdd}
                    disabled={highlightedIndicators?.map(({id}) => id)}
                    onClose={() => setAddOpen(false)}
                />
            )}
        </div>
    );
}
