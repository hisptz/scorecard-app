import i18n from "@dhis2/d2-i18n";
import {Button} from "@dhis2/ui";
import {isEmpty, some} from "lodash";
import React, {useState} from "react";
import {useRecoilValue} from "recoil";
import {ScorecardConfigDirtyState, ScorecardViewState,} from "../../../../../../core/state/scorecard";
import {DecreasingArrows, IncreasingArrows,} from "../../../../../../shared/Components/ScorecardCell/Components/Arrows";
import {getDataSourcesFromGroups} from "../../../../../../shared/utils/utils";
import SpecificTargetsLibraryModal from "../SpecificTargetsLibrary";
import LegendView from "./Components/LegendView";

export default function ScorecardLegendsView() {
    const {legend: showLegends, arrows: showArrows} = useRecoilValue(ScorecardViewState("options"));
    const legends = useRecoilValue(
        ScorecardConfigDirtyState("legendDefinitions")
    );

    const {dataGroups} = useRecoilValue(ScorecardViewState("dataSelection"));
    const dataSources = getDataSourcesFromGroups(dataGroups);
    const [specificTargetsLibraryOpen, setSpecificTargetsLibraryOpen] = useState(false);
    const isSpecificTargetsSet = some(dataSources, "specificTargetsSet");


    return showLegends && !isEmpty(legends) ? (
        <div data-test={"legends"} className="column">
            <div>
                <h3>{i18n.t("Legends")}</h3>
            </div>
            <div className="row space-between align-items-center gap-16">
                <div className="row align-items-center ">
                    {legends?.map((legend) => (
                        <LegendView key={legend.color} legend={legend}/>
                    ))}
                </div>
                {
                    showArrows && <div className="row align-items-center end">
                        <div className="pr-16">
                            <svg height={14} width={14}>
                                <IncreasingArrows fontSize={14} y={0} x={7}/>
                            </svg>
                            &nbsp; {i18n.t("Increased from last period")}
                        </div>
                        <div>
                            <svg height={14} width={14}>
                                <DecreasingArrows fontSize={14} y={14} x={7}/>
                            </svg>
                            &nbsp; {i18n.t("Decreased from last period")}
                        </div>
                    </div>
                }
                <div className="print-hide" style={{minWidth: 200}}>
                    {
                        isSpecificTargetsSet && <Button onClick={() => setSpecificTargetsLibraryOpen(true)}>
                            {i18n.t("Specific Targets Library")}
                        </Button>
                    }
                </div>
                {
                    specificTargetsLibraryOpen &&
                    <SpecificTargetsLibraryModal onClose={() => setSpecificTargetsLibraryOpen(false)}
                                                 open={specificTargetsLibraryOpen}/>
                }
            </div>
        </div>
    ) : null;
}
