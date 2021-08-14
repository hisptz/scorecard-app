import {DataTableCell, DataTableRow} from "@dhis2/ui";
import PropTypes from 'prop-types'
import React from "react";
import {useRecoilValue} from "recoil";
import {PeriodResolverState} from "../../../../../../../../../core/state/period";
import {
    ScorecardConfigDirtyState, ScorecardOrgUnitState,
    ScorecardTableOrientationState
} from "../../../../../../../../../core/state/scorecard";

export default function PeriodHeaderRow({orgUnits}) {
    const {dataGroups} = useRecoilValue(ScorecardConfigDirtyState('dataSelection')) ?? {}
    const {filteredOrgUnits, childrenOrgUnits} = useRecoilValue(ScorecardOrgUnitState(orgUnits)) ?? {}
    const orientation = useRecoilValue(ScorecardTableOrientationState)
    const periods = useRecoilValue(PeriodResolverState) ?? []
    return (
        <DataTableRow>
            <DataTableCell fixed left={"0"} width={"50px"}>&nbsp;</DataTableCell>
            {
                orientation === 'orgUnitsVsData' ? dataGroups?.map(({dataHolders}) => (dataHolders?.map(({id}) => (
                    periods?.map(({name, id: periodId}) => (
                        <DataTableCell width={"200px"} fixed className='scorecard-table-cell' bordered align='center'
                                       key={`${id}-${periodId}`}>{name}</DataTableCell>))
                )))): ([...filteredOrgUnits, ...childrenOrgUnits])?.map(({id}) => periods?.map(({name, id: periodId}) => (
                    <DataTableCell width={"200px"} fixed className='scorecard-table-cell' bordered align='center'
                                   key={`${id}-${periodId}`}>{name}</DataTableCell>)
                ))
            }
        </DataTableRow>
    )
}

PeriodHeaderRow.propTypes = {
    orgUnits: PropTypes.arrayOf(PropTypes.object).isRequired,
};


