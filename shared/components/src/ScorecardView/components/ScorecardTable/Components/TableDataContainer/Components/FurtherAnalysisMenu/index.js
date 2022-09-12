import i18n from "@dhis2/d2-i18n";
import {
    IconDimensionOrgUnit16,
    IconVisualizationColumnStacked24,
    IconVisualizationLine24,
    Menu,
    MenuItem,
    Popover
} from "@dhis2/ui";
import {Period} from "@iapps/period-utilities";
import PropTypes from 'prop-types'
import React, {useState} from "react";
import {useSetRecoilState} from "recoil";
import {orgUnitSelectorOptionOnCell} from "../../../TableCellAnalysis/state/orgUnit";
import {cellPeriodOptionSelector} from "../../../TableCellAnalysis/state/period";
import * as styles from "./FurtherAnalysisMenu.module.css";

export default function FurtherAnalysisMenu({
                                                stateActionRef,
                                                setStateActionRef,
                                                setAnalysisOpen
                                            }) {
    const [showSubMenu, setShowSubMenu] = useState(false)
    const setPeriodOptionValueStates = useSetRecoilState(cellPeriodOptionSelector);
    const setOrgUnitOptionValueStates = useSetRecoilState(orgUnitSelectorOptionOnCell);

    return (
        <>
            <Popover
                onClickOutside={() => setStateActionRef(undefined)}
                placement="bottom-start"
                reference={stateActionRef} 
            >
                <Menu>
                    <MenuItem
                        onClick={() => {
                            setStateActionRef(undefined);
                            setAnalysisOpen(true);
                        }}
                        label={i18n.t("Further Analysis")}
                        icon={<IconVisualizationColumnStacked24/>}
                    />
                    <MenuItem
                        onClick={() => {
                            setOrgUnitOptionValueStates(true);
                            setStateActionRef(undefined);
                            setAnalysisOpen(true);
                        }}
                        label={i18n.t("Lower Organisation Unit Levels")}
                        icon={<IconDimensionOrgUnit16/>}
                    />
                    <MenuItem
                        showSubMenu={showSubMenu}
                        toggleSubMenu={() => {
                            setShowSubMenu(prevState => !prevState);
                        }}
                        label={i18n.t("Trend Analysis ")}
                        icon={<IconVisualizationLine24/>}
                        className={styles['furtherAnalysisMenu']}
                    >
                        <MenuItem
                            onClick={() => {
                                setStateActionRef(undefined);
                                setPeriodOptionValueStates([new Period().setPreferences({allowFuturePeriods: true}).getById("LAST_3_MONTHS")])
                                setAnalysisOpen(true);
                            }}
                            label={i18n.t("Last 3 Months")}
                            icon={<IconVisualizationColumnStacked24/>}
                            className={styles['furtherAnalysisMenu']}
                        />
                        <MenuItem
                            onClick={() => {
                                setStateActionRef(undefined);
                                setPeriodOptionValueStates([new Period().setPreferences({allowFuturePeriods: true}).getById("LAST_6_MONTHS")])
                                setAnalysisOpen(true);
                            }}
                            label={i18n.t("Last 6 Months")}
                            icon={<IconVisualizationColumnStacked24/>}
                            className={styles['furtherAnalysisMenu']}

                        />
                        <MenuItem
                            onClick={() => {
                                setStateActionRef(undefined);
                                setPeriodOptionValueStates([new Period().setPreferences({allowFuturePeriods: true}).getById("LAST_12_MONTHS")])
                                setAnalysisOpen(true);
                            }}
                            label={i18n.t("Last 12 Months")}
                            icon={<IconVisualizationColumnStacked24/>}
                            className={styles['furtherAnalysisMenu']}

                        />
                        <MenuItem
                            onClick={() => {
                                setStateActionRef(undefined);
                                setPeriodOptionValueStates([new Period().setPreferences({allowFuturePeriods: true}).getById("LAST_4_QUARTERS")])
                                setAnalysisOpen(true);
                            }}
                            label={i18n.t("Last 4 Quarters")}
                            icon={<IconVisualizationColumnStacked24/>}
                            className={styles['furtherAnalysisMenu']}

                        />
                        <MenuItem
                            onClick={() => {
                                setStateActionRef(undefined);
                                setPeriodOptionValueStates([new Period().setPreferences({allowFuturePeriods: true}).getById("LAST_5_YEARS")])
                                setAnalysisOpen(true);
                            }}
                            label={i18n.t("Last 5 Years")}
                            icon={<IconVisualizationColumnStacked24/>}
                            className={styles['furtherAnalysisMenu']}
                        />
                    </MenuItem>

                </Menu>
            </Popover>
        </>
    )
}

FurtherAnalysisMenu.propTypes = {
    setAnalysisOpen: PropTypes.func,
    setStateActionRef: PropTypes.func,
    stateActionRef: PropTypes.object,
};

