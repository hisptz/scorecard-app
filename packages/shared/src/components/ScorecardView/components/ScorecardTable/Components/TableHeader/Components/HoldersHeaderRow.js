import i18n from "@dhis2/d2-i18n";
import {DataTableCell, DataTableColumnHeader, DataTableRow, Tooltip} from "@dhis2/ui";
import {head} from "lodash";
import PropTypes from 'prop-types'
import React from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import classes from '../../../scorecardTable.module.css'
import DraggableCell from "../../TableBody/Components/DraggableCell";
import DroppableCell from "../../TableBody/Components/DroppableCell";
import OrgUnitHeaderCells from "./OrgUnitHeaderCells";
import {PeriodResolverState, ScorecardTableSortState, ScorecardViewState} from "../../../../../../../state";
import {DraggableItems, ScorecardTableConstants} from "../../../../../../../constants";
import {getDataSourcesDisplayName} from "../../../../../../../utils";

export default function HoldersHeaderRow({orgUnits, nested}) {
    const {dataGroups} =
    useRecoilValue(ScorecardViewState("dataSelection")) ?? {};
    const [{name, direction}, setDataSort] = useRecoilState(
        ScorecardTableSortState(orgUnits)
    );
    const {averageColumn} =
    useRecoilValue(ScorecardViewState("options")) ?? {}
    const periods = useRecoilValue(PeriodResolverState) ?? [];

    const onSortClick = (direction) => {
        setDataSort({
            ...direction,
            type: "data",
        });
    };

    const isSingleGroup = dataGroups.length === 1


    return (
        <DataTableRow className={classes["table-header-row"]}>
            {
                isSingleGroup && <OrgUnitHeaderCells nested={nested} orgUnits={orgUnits}/>
            }
            {dataGroups?.map(({dataHolders}) =>
                dataHolders?.map(({id, dataSources}, index) => (
                    <DataTableColumnHeader
                        onSortIconClick={onSortClick}
                        sortDirection={
                            name === `${head(dataSources)?.id}` ? direction : "default"
                        }
                        className={classes['holder-header-cell']}
                        dataTest={"indicator-table-header-cell"}
                        width={`${periods?.length * ScorecardTableConstants.CELL_WIDTH}px`}
                        top={"0"}
                        fixed
                        colSpan={`${periods?.length}`}
                        bordered
                        align="center"
                        key={`${id}-column-header`}
                        name={`${head(dataSources)?.id}`}
                    >
                        <div style={{height: "100%", width: "100%"}}>
                            <Tooltip
                                className="m-auto"
                                content={i18n.t("Drag to row headers to change layout")}
                            >
                                <DroppableCell accept={[DraggableItems.ORG_UNIT_ROW]}>
                                    <DraggableCell
                                        label={getDataSourcesDisplayName(dataSources)}
                                        type={DraggableItems.DATA_COLUMN}
                                    />
                                </DroppableCell>
                            </Tooltip>
                        </div>
                    </DataTableColumnHeader>
                ))
            )}
            {averageColumn && isSingleGroup ? (
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
            ) : null}
        </DataTableRow>
    );
}

HoldersHeaderRow.propTypes = {
    nested: PropTypes.bool,
    orgUnits: PropTypes.array,
};
