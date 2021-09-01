import i18n from '@dhis2/d2-i18n'
import {DataTableCell, DataTableRow} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import {useRecoilValue} from "recoil";
import {PeriodResolverState} from "../../../../../../../../../core/state/period";
import {ScorecardOrgUnitState, ScorecardViewState} from "../../../../../../../../../core/state/scorecard";
import AverageCell from "./AverageCell";
import AverageDataContainer from "./AverageDataContainer";


export default function AverageOrgUnitRow({orgUnits, overallAverage}) {
    const periods = useRecoilValue(PeriodResolverState)
    const {childrenOrgUnits, filteredOrgUnits} = useRecoilValue(ScorecardOrgUnitState(orgUnits))
    const {averageColumn} = useRecoilValue(ScorecardViewState('options'))


    return (
        <DataTableRow bordered>
            <DataTableCell className={'jsx-1369417008'} fixed left={"0"} width={"50px"}/>
            <DataTableCell fixed left={"50px"} className="scorecard-org-unit-cell">
                <b>{i18n.t('Average')}</b>
            </DataTableCell>
            {
                ([...filteredOrgUnits, ...childrenOrgUnits])?.map(({id}) => (
                    periods?.map(({id: periodId}) => (
                        <AverageDataContainer orgUnits={orgUnits} key={`${id}-${periodId}-average`} period={periodId}
                                              orgUnit={id}/>
                    ))
                ))
            }{
            averageColumn &&
            <AverageCell bold value={overallAverage}/>
        }
        </DataTableRow>
    )
}

AverageOrgUnitRow.propTypes = {
    orgUnits: PropTypes.array.isRequired,
    overallAverage: PropTypes.number.isRequired
};
