import {DataTableCell, DataTableRow} from "@dhis2/ui";
import React from "react";
import {useRecoilValue} from "recoil";
import {PeriodResolverState} from "../../../../../../../../../core/state/period";
import {
    ScorecardConfigDirtyState,
    ScorecardTableOrientationState
} from "../../../../../../../../../core/state/scorecard";


export default function PeriodHeaderRow() {
    const {dataGroups} = useRecoilValue(ScorecardConfigDirtyState('dataSelection')) ?? {}
    const {orgUnits} = useRecoilValue(ScorecardConfigDirtyState('orgUnitSelection')) ?? {}
    const orientation = useRecoilValue(ScorecardTableOrientationState)
    const periods = useRecoilValue(PeriodResolverState) ?? []
    return (
        <DataTableRow>
            <DataTableCell fixed left={"0"} width={"50px"}>&nbsp;</DataTableCell>
            {
                orientation === 'orgUnitVsData' ? dataGroups?.map(({dataHolders}) => (dataHolders?.map(({id}) => (
                    periods?.map(({name, id: periodId}) => (
                        <DataTableCell width={"200px"} fixed className='scorecard-table-cell' bordered align='center'
                                       key={`${id}-${periodId}`}>{name}</DataTableCell>))
                )))): orgUnits?.map(({id}) => periods?.map(({name, id: periodId}) => (
                    <DataTableCell width={"200px"} fixed className='scorecard-table-cell' bordered align='center'
                                   key={`${id}-${periodId}`}>{name}</DataTableCell>)
                ))
            }
        </DataTableRow>
    )
}
