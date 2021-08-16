import {DataTableCell, DataTableColumnHeader, DataTableRow} from "@dhis2/ui";
import PropTypes from 'prop-types'
import React from "react";
import {useRecoilValue} from "recoil";
import {Orientation} from "../../../../../../../../../core/constants/orientation";
import {PeriodResolverState} from "../../../../../../../../../core/state/period";
import {
    ScorecardConfigDirtyState,
    ScorecardOrgUnitState,
    ScorecardTableOrientationState
} from "../../../../../../../../../core/state/scorecard";

export default function PeriodHeaderRow({orgUnits}) {
    const {dataGroups} = useRecoilValue(ScorecardConfigDirtyState('dataSelection')) ?? {}
    const {filteredOrgUnits, childrenOrgUnits} = useRecoilValue(ScorecardOrgUnitState(orgUnits)) ?? {}
    const orientation = useRecoilValue(ScorecardTableOrientationState)
    const periods = useRecoilValue(PeriodResolverState) ?? []

    const onSortClick = (direction) => {
        console.log(direction)
    }

    return (
        <DataTableRow>
            <DataTableCell fixed left={"0"} width={"50px"}/>
            {
                orientation === Orientation.ORG_UNIT_VS_DATA ? dataGroups?.map(({dataHolders}) => (dataHolders?.map(({id}) => (
                    periods?.map(({name, id: periodId}) => (
                        <DataTableColumnHeader
                            fixed
                            top={"0"}
                            onSortIconClick={onSortClick}
                            sortDirection='default'
                            width={"100px"}
                            bordered
                            align='center'
                            key={`${id}-${periodId}`}
                            className='scorecard-table-cell'
                            name={`${id}-${periodId}`}
                        >
                            {name}
                        </DataTableColumnHeader>))
                )))) : ([...filteredOrgUnits, ...childrenOrgUnits])?.map(({id}) => periods?.map(({
                                                                                                     name,
                                                                                                     id: periodId
                                                                                                 }) => (
                    <DataTableColumnHeader
                        fixed
                        top={"0"}
                        onSortIconClick={onSortClick}
                        sortDirection='default'
                        width={"100px"}
                        bordered
                        align='center'
                        key={`${id}-${periodId}`}
                        className='scorecard-table-cell'
                        name={`${id}_${periodId}`}
                    >
                        {name}
                    </DataTableColumnHeader>)
                ))
            }
        </DataTableRow>
    )
}

PeriodHeaderRow.propTypes = {
    orgUnits: PropTypes.arrayOf(PropTypes.object).isRequired,
};


