import {colors} from "@dhis2/ui";
import React from "react";
import JsxParser from "react-jsx-parser";
import {useRecoilValue} from "recoil";
import {PeriodResolverState, ScorecardViewState} from "../../../../state";
import {head, isEmpty} from "lodash";

export default function ScorecardHeader() {
    const {title: showTitle} = useRecoilValue(ScorecardViewState("options"));
    const customHeader = useRecoilValue(
        ScorecardViewState("customHeader")
    );
    const periods = useRecoilValue(PeriodResolverState)
    const title = useRecoilValue(ScorecardViewState("title"));
    const subtitle = useRecoilValue(ScorecardViewState("subtitle"));

    return showTitle && !isEmpty(periods) ? (
        <div className="row space-between" id={"scorecard-header"}>
            <div className="row">
                {customHeader ? (
                    <JsxParser
                        autoCloseVoidElements
                        className="w-100"
                        onError={console.error}
                        bindings={{
                            title,
                            subtitle,
                            period: periods.length === 1 ? head(periods)?.name : ""
                        }}
                        jsx={customHeader}
                    />
                ) : (
                    <div className="column center align-items-center">
                        <h1 style={{margin: 8}} id={"data-test-score-card-title"}>
                            {title} {`${periods.length === 1 ? ` - ${periods[0].name}` : ""}`}
                        </h1>
                        <h3 style={{color: colors.grey600, margin: 0}}>{subtitle}</h3>
                    </div>
                )}
            </div>
        </div>
    ) : null;
}
