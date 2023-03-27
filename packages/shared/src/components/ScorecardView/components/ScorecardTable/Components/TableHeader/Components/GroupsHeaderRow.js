import i18n from "@dhis2/d2-i18n";
import {DataTableCell, DataTableRow,} from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";
import {useRecoilValue} from "recoil";
import classes from "../../../scorecardTable.module.css"
import OrgUnitHeaderCells from "./OrgUnitHeaderCells";
import {PeriodResolverState, ScorecardViewState} from "../../../../../../../state";
import {ScorecardTableConstants} from "../../../../../../../constants";


export default function GroupsHeaderRow({nested, orgUnits}) {
    const {dataGroups} =
    useRecoilValue(ScorecardViewState("dataSelection")) ?? {};
    const {averageColumn} =
    useRecoilValue(ScorecardViewState("options")) ?? {};
    const periods = useRecoilValue(PeriodResolverState) ?? [];

    const isSingleGroup = dataGroups.length === 1

    return (
        !isSingleGroup && <DataTableRow className={classes["table-header-row"]}>
            <OrgUnitHeaderCells orgUnits={orgUnits} nested={nested}/>
            {dataGroups?.map(({title, id, dataHolders}, index) => (
                <DataTableCell
                    fixed
                    className="scorecard-table-header header"
                    align="center"
                    bordered
                    width={`${
                        (dataHolders?.length ?? 1) *
                        (periods?.length ?? 1) *
                        ScorecardTableConstants.CELL_WIDTH
                    }px`}
                    top={"0"}
                    colSpan={`${(dataHolders?.length ?? 1) * (periods?.length ?? 1)}`}
                    key={id}
                >
                    {title}
                </DataTableCell>
            ))}
            {averageColumn && (
                <DataTableCell
                    width={`${ScorecardTableConstants.CELL_WIDTH}px`}
                    fixed
                    align="center"
                    bordered
                    className="scorecard-table-header header"
                    rowSpan={"3"}
                >
                    {i18n.t("Average")}
                </DataTableCell>
            )}
        </DataTableRow>
    );
}

GroupsHeaderRow.propTypes = {
    nested: PropTypes.bool.isRequired,
    orgUnits: PropTypes.array.isRequired,
};
