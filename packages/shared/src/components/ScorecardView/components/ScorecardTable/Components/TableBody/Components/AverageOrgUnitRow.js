import i18n from "@dhis2/d2-i18n";
import {DataTableCell, DataTableRow} from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";
import {useRecoilValue} from "recoil";
import classes from "../../../scorecardTable.module.css"
import AverageCell from "./AverageCell";
import AverageDataContainer from "./AverageDataContainer";
import {PeriodResolverState, ScorecardOrgUnitState, ScorecardViewState} from "../../../../../../../state";
import {ScorecardDataEngine} from "../../../../../../../models";


export default function AverageOrgUnitRow({
                                              orgUnits,
                                              overallAverage,
                                              dataEngine,
                                          }) {
    const periods = useRecoilValue(PeriodResolverState);
    const {childrenOrgUnits, filteredOrgUnits} = useRecoilValue(
        ScorecardOrgUnitState(orgUnits)
    );
    const {averageColumn, itemNumber} = useRecoilValue(
        ScorecardViewState("options")
    );

    return (
        <DataTableRow className={classes["average-row"]} bordered>
            <DataTableCell fixed left={"0"} width={"50px"}/>
            {itemNumber && <DataTableCell fixed left={"50px"} width={"50px"}/>}
            <DataTableCell
                fixed
                left={itemNumber ? "100px" : "50px"}
                className="scorecard-org-unit-cell"
            >
                <b>{i18n.t("Average")}</b>
            </DataTableCell>
            {[...filteredOrgUnits, ...childrenOrgUnits]?.map(({id}) =>
                periods?.map(({id: periodId}) => (
                    <AverageDataContainer
                        dataEngine={dataEngine}
                        orgUnits={orgUnits}
                        key={`${id}-${periodId}-average`}
                        period={periodId}
                        orgUnit={id}
                    />
                ))
            )}
            {averageColumn && <AverageCell bold value={overallAverage}/>}
        </DataTableRow>
    );
}

AverageOrgUnitRow.propTypes = {
    dataEngine: PropTypes.instanceOf(ScorecardDataEngine).isRequired,
    orgUnits: PropTypes.array.isRequired,
    overallAverage: PropTypes.number.isRequired,
};
