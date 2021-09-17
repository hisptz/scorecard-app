import {useAlert} from "@dhis2/app-runtime";
import {useSetting} from "@dhis2/app-service-datastore";
import i18n from "@dhis2/d2-i18n";
import {Button, ButtonStrip, Input, Tooltip} from "@dhis2/ui";
import AddIcon from "@material-ui/icons/Add";
import HelpIcon from "@material-ui/icons/Help";
import ListViewIcon from "@material-ui/icons/Reorder";
import GridViewIcon from "@material-ui/icons/ViewModule";
import {Steps} from "intro.js-react";
import {debounce, isEmpty} from "lodash";
import React, {Suspense, useEffect, useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import {useRecoilState, useRecoilValue, useResetRecoilState} from "recoil";
import {STEP_OPTIONS} from "../../../../core/constants/help/options";
import {SCORECARD_LIST_HELP_STEPS} from "../../../../core/constants/help/scorecardList";
import HelpState from "../../../../core/state/help";
import {ScorecardIdState, ScorecardSummaryState,} from "../../../../core/state/scorecard";
import {FullPageLoader} from "../../../../shared/Components/Loaders";
import EmptyScoreCardList from "../EmptyScoreCardList";
import GridScorecardDisplay from "./Components/GridScorecardDisplay";
import ListScorecardDisplay from "./Components/ListScorecardDisplay";
import PaginatedDisplay from "./Components/PaginatedDisplay";

export default function ScorecardList() {
    const resetScorecardIdState = useResetRecoilState(ScorecardIdState);
    const [helpEnabled, setHelpEnabled] = useRecoilState(HelpState)
    const history = useHistory();
    const [scorecardViewType, {set}] = useSetting("scorecardViewType");
    const scorecards = useRecoilValue(ScorecardSummaryState);
    const [keyword, setKeyword] = useState();
    const [filteredScorecards, setFilteredScorecards] = useState(scorecards);
    const {show} = useAlert(
        ({message}) => message,
        ({type}) => ({...type, duration: 3000})
    );


    const onViewChange = () => {
        try {
            if (scorecardViewType === "grid") {
                set("list");
                show({
                    message: "View changed successfully",
                    type: {success: true},
                });
                return;
            }
            set("grid");
            show({
                message: "View changed successfully",
                type: {success: true},
            });
        } catch (e) {
            show({
                message: e.message ?? e.toString(),
                type: {critical: true},
            });
        }
    };

    const onSearch = useRef(debounce((keyword) => {
        setFilteredScorecards(() => {
            return scorecards.filter(({id, title, description}) => {
                const index = `${id}${title}${description}`.toLowerCase();
                return index.match(new RegExp(keyword.toLowerCase()));
            });
        });
    }));

    useEffect(() => {
        if (keyword) {
            onSearch.current(keyword);
        } else {
            setFilteredScorecards(scorecards);
        }
    }, [keyword, scorecards]);

    const onAddClick = () => {
        resetScorecardIdState();
        history.push("/add", {from: "home"});
    };

    const onHelp = () => {
        setHelpEnabled(true)
    }

    const onHelpExit = () => {
        setHelpEnabled(false)
    }

    return (
        <Suspense fallback={<FullPageLoader/>}>
            <Steps options={STEP_OPTIONS} enabled={helpEnabled} steps={SCORECARD_LIST_HELP_STEPS} onExit={onHelpExit} initialStep={0}/>
            {isEmpty(scorecards) ? (
                <EmptyScoreCardList/>
            ) : (
                <div className="column">
                    <div className="row p-16">
                        <div className="row p-45 center" style={{paddingLeft: '35%'}}>
                            <div className="column w-30">
                                <Input
                                    className="search-input"
                                    value={keyword}
                                    onChange={({value}) => {
                                        setKeyword(value);
                                    }}
                                    placeholder={i18n.t("Search")}
                                />
                            </div>
                        </div>
                        <div className="w-100">
                            <ButtonStrip end>
                                <Button onClick={onHelp} icon={<HelpIcon/>}>{i18n.t("Help")}</Button>
                                <Tooltip
                                    content={i18n.t("Switch to {{viewType}} view", {
                                        viewType:
                                            scorecardViewType === "grid"
                                                ? i18n.t("list")
                                                : i18n.t("grid"),
                                    })}
                                >
                                    <Button
                                        onClick={onViewChange}
                                        className="change-view-button"
                                        dataTest="scorecard-view-orientation"
                                        icon={
                                            scorecardViewType === "grid" ? (
                                                <ListViewIcon/>
                                            ) : (
                                                <GridViewIcon/>
                                            )
                                        }
                                    />
                                </Tooltip>
                                <Button className="add-scorecard-button" onClick={onAddClick} primary icon={<AddIcon/>}>
                                    {i18n.t("Add New Scorecard")}
                                </Button>
                            </ButtonStrip>
                        </div>
                    </div>

                    <PaginatedDisplay
                        scorecards={filteredScorecards}
                        pageSize={scorecardViewType === "grid" ? 8 : 5}
                        listComponent={
                            scorecardViewType === "grid"
                                ? GridScorecardDisplay
                                : ListScorecardDisplay
                        }
                    />
                </div>
            )}
        </Suspense>
    );
}
