import i18n from "@dhis2/d2-i18n";
import {DataTableCell, DataTableRow} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import {useRecoilValue} from "recoil";
import ScorecardDataEngine from "../../../../../../../../../core/models/scorecardData";
import {PeriodResolverState} from "../../../../../../../../../core/state/period";
import {ScorecardDataSourceState, ScorecardViewState} from "../../../../../../../../../core/state/scorecard";
import AverageCell from "./AverageCell";
import AverageDataContainer from "./AverageDataContainer";

export default function AverageDataSourceRow({orgUnits, overallAverage, dataEngine}) {
    const periods = useRecoilValue(PeriodResolverState)
    const dataHolders = useRecoilValue(ScorecardDataSourceState)
    const {averageColumn} = useRecoilValue(ScorecardViewState('options'))

    return (
        <DataTableRow bordered>
            <DataTableCell className={'jsx-1369417008'} fixed left={"0"} width={"50px"}/>
            <DataTableCell fixed left={"50px"} className="scorecard-org-unit-cell">
                <b>{i18n.t('Average')}</b>
            </DataTableCell>
            {
                dataHolders?.map(({dataSources, id: holderId}) => (
                    periods?.map(({id}) => (
                        <AverageDataContainer dataEngine={dataEngine} orgUnits={orgUnits} key={`${holderId}-${id}-average-cell`}
                                              dataSources={dataSources?.map(({id}) => id)} period={id}/>
                    ))
                ))
            }
            {
                averageColumn &&
                <AverageCell bold value={overallAverage}/>
            }
        </DataTableRow>
    )

}

AverageDataSourceRow.propTypes = {
    dataEngine: PropTypes.instanceOf(ScorecardDataEngine).isRequired,
    orgUnits: PropTypes.array.isRequired,
    overallAverage: PropTypes.number.isRequired
};
