import i18n from "@dhis2/d2-i18n";
import {colors} from "@dhis2/ui";
import React from "react";
import {useMediaQuery} from "@scorecard/shared";
import {ReactComponent as ScorecardIllustration} from "./resources/scorecard_illustration.svg";


export default function EmptyScoreCardList() {
    const {width, height} = useMediaQuery();

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
                            {i18n.t("Create a new scorecard in the scorecard app to see it here.")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
