import i18n from "@dhis2/d2-i18n";
import {DataTableCell, DataTableRow, Tooltip} from "@dhis2/ui";
import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {useRecoilValue} from "recoil";
import AverageDisplayType from "../../../../../../../../../core/constants/averageDisplayType";
import {DraggableItems} from "../../../../../../../../../core/constants/draggables";
import {PeriodResolverState} from "../../../../../../../../../core/state/period";
import {
    scorecardDataEngine,
    ScorecardDataLoadingState,
    ScorecardViewState
} from "../../../../../../../../../core/state/scorecard";
import DataContainer from "../../TableDataContainer";
import AverageCell from "./AverageCell";
import DroppableCell from "./DroppableCell";
import OrgUnitContainer from "./OrgUnitContainer";

export default function ParentOrgUnitRow({orgUnit, overallAverage}) {
    const {emptyRows, averageColumn, averageDisplayType} = useRecoilValue(ScorecardViewState('options'))
    const [isEmpty, setIsEmpty] = useState(false);
    const [average, setAverage] = useState();
    const {id} = orgUnit ?? {};
    const {dataGroups} =
    useRecoilValue(ScorecardViewState("dataSelection")) ?? {};
    const loading = useRecoilValue(ScorecardDataLoadingState)
    const periods = useRecoilValue(PeriodResolverState) ?? [];

    function subscribeToAverage() {
        if (loading !== undefined && !loading) {
            const rowAverage = scorecardDataEngine.getOrgUnitAverage(id).subscribe(setAverage);
            const rowStatusSub = scorecardDataEngine.isRowEmpty(id).subscribe(setIsEmpty)
            return () => {
                rowAverage.unsubscribe();
                rowStatusSub.unsubscribe()
            }
        }
    }

    useEffect(subscribeToAverage, [orgUnit, loading, id])


    const Component  = ((emptyRows || !isEmpty) &&
        <DataTableRow key={id} bordered>
            <DataTableCell className='jsx-1369417008' fixed left={"0"} width={"50px"}/>
            <DataTableCell fixed left={"50px"} className="scorecard-org-unit-cell">
                <Tooltip content={i18n.t('Drag to the column headers to change layout')}>
                    <DroppableCell accept={[DraggableItems.DATA_COLUMN]}>
                        <OrgUnitContainer orgUnit={orgUnit}/>
                    </DroppableCell>
                </Tooltip>
            </DataTableCell>
            {dataGroups?.map(({id: groupId, dataHolders}) =>
                dataHolders?.map(({id: holderId, dataSources}) =>
                    periods?.map((period) => (
                        <td
                            className="data-cell"
                            align="center"
                            key={`${groupId}-${holderId}-${period.id}`}
                        >
                            <DataContainer
                                orgUnit={orgUnit}
                                dataSources={dataSources}
                                period={period}
                            />
                        </td>
                    ))
                )
            )}
            {
                averageColumn &&
                <AverageCell bold value={average}/>
            }
        </DataTableRow>
    );


    if (averageDisplayType === AverageDisplayType.ALL) {
        return Component
    }
    if (averageDisplayType === AverageDisplayType.BELOW_AVERAGE && overallAverage > average) {
        return Component
    }
    if (averageDisplayType === AverageDisplayType.ABOVE_AVERAGE && overallAverage <= average) {
        return Component
    }

    return null
}

ParentOrgUnitRow.propTypes = {
    orgUnit: PropTypes.object.isRequired,
    overallAverage: PropTypes.number.isRequired
};
