import {colors} from "@dhis2/ui";
import React from "react";
import JsxParser from "react-jsx-parser";
import {useRecoilValue} from "recoil";
import {ScorecardViewState,} from "../../../../../../core/state/scorecard";

export default function ScorecardHeader() {
  const { title: showTitle } = useRecoilValue(ScorecardViewState("options"));
  const customHeader = useRecoilValue(
      ScorecardViewState("customHeader")
  );
  const title = useRecoilValue(ScorecardViewState("title"));
  const subtitle = useRecoilValue(ScorecardViewState("subtitle"));

  return showTitle ? (
    <div className="row space-between" id={"scorecard-header"}>
      <div className="row">
        {customHeader ? (
          <JsxParser
            autoCloseVoidElements
            onError={console.error}
            bindings={{
              title,
              subtitle,
            }}
            jsx={customHeader}
          />
        ) : (
          <div className="column center align-items-center">
            <h1 style={{ margin: 8 }} id={"data-test-score-card-title"}>
              {title}
            </h1>
            <h3 style={{ color: colors.grey600, margin: 0 }}>{subtitle}</h3>
          </div>
        )}
      </div>
    </div>
  ) : null;
}
