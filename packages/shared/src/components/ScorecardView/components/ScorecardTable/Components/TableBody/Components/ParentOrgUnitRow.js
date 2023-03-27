import i18n from "@dhis2/d2-i18n";
import {DataTableCell, DataTableRow, Tooltip} from "@dhis2/ui";
import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import classes from "../../../scorecardTable.module.css";
import DataContainer from "../../TableDataContainer";
import AverageCell from "./AverageCell";
import DroppableCell from "./DroppableCell";
import OrgUnitContainer from "./OrgUnitContainer";
import {PeriodResolverState, ScorecardDataLoadingState, ScorecardViewState} from "../../../../../../../state";
import {AverageDisplayType, DraggableItems} from "../../../../../../../constants";
import {ScorecardDataEngine} from "../../../../../../../models";

export default function ParentOrgUnitRow({
                                             orgUnit,
                                             overallAverage,
                                             dataEngine,
                                             orgUnits,
                                             index,
                                         }) {
    const {emptyRows, averageColumn, averageDisplayType, itemNumber} =
        useRecoilValue(ScorecardViewState("options"));
    const [isEmpty, setIsEmpty] = useState(false);
    const [average, setAverage] = useState();
    const {id} = orgUnit ?? {};
    const {dataGroups} =
    useRecoilValue(ScorecardViewState("dataSelection")) ?? {};
    const loading = useRecoilValue(ScorecardDataLoadingState(orgUnits));
    const periods = useRecoilValue(PeriodResolverState) ?? [];

    function subscribeToAverage() {
        if (loading !== undefined && !loading) {
            const rowAverage = dataEngine.getOrgUnitAverage(id).subscribe(setAverage);
            const rowStatusSub = dataEngine.isRowEmpty(id).subscribe(setIsEmpty);
            return () => {
                rowAverage.unsubscribe();
                rowStatusSub.unsubscribe();
            };
        }
    }

    useEffect(subscribeToAverage, [orgUnit, loading, id]);

    const Component = (emptyRows || !isEmpty) && (
        <DataTableRow className={classes["parent-table-row"]} key={id} bordered>
            <DataTableCell fixed left={"0"} width={"50px"}/>
            {itemNumber && (
                <DataTableCell width={"50px"} fixed left={"50px"}>
                    {index + 1}
                </DataTableCell>
            )}
            <DataTableCell
                dataTest={"orgUnit-parent-table-column-cell"}
                fixed
                left={itemNumber ? "100px" : "50px"}
                width="30%"
                className="scorecard-org-unit-cell parent-org-unit-cell"
            >
                <Tooltip
                    content={i18n.t("Drag to the column headers to change layout")}
                >
                    <DroppableCell accept={[DraggableItems.DATA_COLUMN]}>
                        <OrgUnitContainer orgUnit={orgUnit}/>
                    </DroppableCell>
                </Tooltip>
            </DataTableCell>
            {dataGroups?.map(({id: groupId, dataHolders}) =>
                dataHolders?.map(({id: holderId, dataSources}) =>
                    periods?.map((period) => (
                        <DataContainer
                            key={`${groupId}-${holderId}-${period.id}`}
                            dataEngine={dataEngine}
                            orgUnit={orgUnit}
                            dataSources={dataSources}
                            period={period}
                        />
                    ))
                )
            )}
            {averageColumn && <AverageCell bold value={average}/>}
        </DataTableRow>
    );

    if (averageDisplayType === AverageDisplayType.ALL) {
        return Component;
    }
    if (
        averageDisplayType === AverageDisplayType.BELOW_AVERAGE &&
        overallAverage > average
    ) {
        return Component;
    }
    if (
        averageDisplayType === AverageDisplayType.ABOVE_AVERAGE &&
        overallAverage <= average
    ) {
        return Component;
    }

    return null;
}

ParentOrgUnitRow.propTypes = {
    dataEngine: PropTypes.instanceOf(ScorecardDataEngine).isRequired,
    index: PropTypes.number.isRequired,
    orgUnit: PropTypes.object.isRequired,
    orgUnits: PropTypes.array.isRequired,
    overallAverage: PropTypes.number.isRequired,
};
