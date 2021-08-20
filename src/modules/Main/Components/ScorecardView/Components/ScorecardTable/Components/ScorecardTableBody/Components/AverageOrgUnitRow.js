import i18n from '@dhis2/d2-i18n'
import {DataTableCell, DataTableRow} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import {useRecoilValue} from "recoil";
import {PeriodResolverState} from "../../../../../../../../../core/state/period";
import {ScorecardOrgUnitState} from "../../../../../../../../../core/state/scorecard";
import AverageDataContainer from "./AverageDataContainer";


export default function AverageOrgUnitRow({orgUnits}) {
    const periods = useRecoilValue(PeriodResolverState)
    const {childrenOrgUnits, filteredOrgUnits} = useRecoilValue(ScorecardOrgUnitState(orgUnits))

    return (
        <DataTableRow bordered>
            <DataTableCell fixed left={"0"} width={"50px"}/>
            <DataTableCell fixed left={"50px"} className="scorecard-org-unit-cell">
                <b>{i18n.t('Average')}</b>
            </DataTableCell>
            {
                ([...filteredOrgUnits, ...childrenOrgUnits])?.map(({id}) => (
                    periods?.map(({id: periodId}) => (
                        <AverageDataContainer orgUnits={orgUnits} key={`${id}-${periodId}-average`} period={periodId} orgUnit={id}/>
                    ))
                ))
            }
        </DataTableRow>
    )
}

AverageOrgUnitRow.propTypes = {
    orgUnits: PropTypes.array.isRequired
};
