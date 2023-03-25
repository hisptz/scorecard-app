import i18n from "@dhis2/d2-i18n";
import {Button, colors} from "@dhis2/ui";
import {ScorecardIdState, useMediaQuery} from "@scorecard/shared";
import React from "react";
import {useHistory} from "react-router-dom";
import {useResetRecoilState} from "recoil";
import {ReactComponent as ScorecardIllustration} from "./resources/scorecard_illustration.svg";


export default function EmptyScoreCardList() {
    const resetScorecardIdState = useResetRecoilState(ScorecardIdState);
    const {width, height} = useMediaQuery();
    const history = useHistory();

    const onNewScorecardClick = () => {
        resetScorecardIdState();
        history.push("/add", {from: "home"});
    };

    return (
        <div className="center">
            <div className="column center" style={{height}}>
                <div
                    className="container-bordered text-center center column background-white"
                    style={{height: height * 0.6, width: width * 0.5, borderRadius: 8}}
                >
                    <div className="p-32 ">
                        <ScorecardIllustration style={{height: height * 0.15}}/>
                    </div>
                    <div className="p-8">
                        <h1
                            style={{position: "relative"}}
                            data-test="welcome-scorcard-title"
                        >
                            {i18n.t("Welcome to Scorecard App!")}
                        </h1>
                        <p
                            style={{
                                fontStyle: "italic",
                                color: colors.grey700,
                                position: "relative",
                            }}
                        >
                            {i18n.t("Create a scorecard instantly, over tea break")}...
                        </p>
                    </div>
                    <div className="pt-16">
                        <Button
                            onClick={onNewScorecardClick}
                            dataTest={"new-scorecard-button"}
                            primary
                        >
                            {i18n.t("New Scorecard")}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
