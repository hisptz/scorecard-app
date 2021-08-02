import {DataTableCell, DataTableRow} from "@dhis2/ui";
import React from "react";
import {useRecoilValue} from "recoil";
import {PeriodResolverState} from "../../../../../../../../../core/state/period";
import {ScorecardConfigStateSelector} from "../../../../../../../../../core/state/scorecard";


export default function PeriodHeaderRow() {
    const {dataGroups} = useRecoilValue(ScorecardConfigStateSelector('dataSelection')) ?? {}
    const periods = useRecoilValue(PeriodResolverState) ?? []
    return (
        <DataTableRow>
            <DataTableCell fixed left={"0"} width={"50px"}>&nbsp;</DataTableCell>
            {
                dataGroups?.map(({dataHolders}) => (dataHolders?.map(({id}) => (
                    periods?.map(({name, id: periodId}) => (
                        <DataTableCell width={"200px"} fixed className='scorecard-table-cell' bordered align='center'
                                       key={`${id}-${periodId}`}>{name}</DataTableCell>))
                ))))
            }
        </DataTableRow>
    )
}
