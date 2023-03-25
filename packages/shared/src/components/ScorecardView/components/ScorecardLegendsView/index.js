import i18n from "@dhis2/d2-i18n";
import {Button} from "@dhis2/ui";
import {isEmpty} from "lodash";
import React, {useState} from "react";
import {useRecoilValue} from "recoil";
import SpecificTargetsLibraryModal from "../SpecificTargetsLibrary";
import LegendView from "./Components/LegendView";
import classes from "./ScorecardLegendsView.module.css";
import {DecreasingArrows, IncreasingArrows} from "../../../ScorecardCell/Components/Arrows";
import {IsSpecificTargetsSet, ScorecardConfigDirtyState, ScorecardViewState} from "../../../../state";

export default function ScorecardLegendsView() {
    const {legend: showLegends, arrows: showArrows} = useRecoilValue(ScorecardViewState("options"));
    const legends = useRecoilValue(
        ScorecardConfigDirtyState("legendDefinitions")
    );
    const isSpecificTargetsSet = useRecoilValue(IsSpecificTargetsSet)
    const [specificTargetsLibraryOpen, setSpecificTargetsLibraryOpen] = useState(false);


    return showLegends && !isEmpty(legends) ? (
        <div data-test={"legends"} className="column">
            <div>
                <h3>{i18n.t("Legends")}</h3>
            </div>
            <div className={classes["legend-container"]}>
                <div className={classes["legends"]}>
                    <div className="row align-items-center">
                        {legends?.map((legend) => (
                            <LegendView key={legend.color} legend={legend}/>
                        ))}
                    </div>
                </div>
                <div className={classes["other"]}>
                    <div className="row gap-16 space-between justify-content-end">
                        {
                            showArrows && <div style={{minWidth: 400}} className="row align-items-center end">
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
                    </div>

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
