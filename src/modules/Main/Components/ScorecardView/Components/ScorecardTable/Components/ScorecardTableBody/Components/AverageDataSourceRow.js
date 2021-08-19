import i18n from "@dhis2/d2-i18n";
import {DataTableCell, DataTableRow} from '@dhis2/ui'
import React, {useEffect, useState} from 'react'
import {useRecoilValue} from "recoil";
import {PeriodResolverState} from "../../../../../../../../../core/state/period";
import {
    scorecardDataEngine,
    ScorecardDataSourceState,
    ScorecardViewState
} from "../../../../../../../../../core/state/scorecard";
import AverageCell from "./AverageCell";
import AverageDataContainer from "./AverageDataContainer";

export default function AverageDataSourceRow() {
    const [average, setAverage] = useState();
    const periods = useRecoilValue(PeriodResolverState)
    const dataHolders = useRecoilValue(ScorecardDataSourceState)
    const {averageColumn} = useRecoilValue(ScorecardViewState('options'))


    function getAverage() {
        if (averageColumn) {
            const averageSub = scorecardDataEngine.getOverallAverage().subscribe(setAverage)
            return () => {
                averageSub.unsubscribe()
            }
        }
    }

    useEffect(getAverage, [averageColumn]);


    return (
        <DataTableRow bordered>
            <DataTableCell fixed left={"0"} width={"50px"}/>
            <DataTableCell fixed left={"50px"} className="scorecard-org-unit-cell">
                {i18n.t('Average')}
            </DataTableCell>
            {
                dataHolders?.map(({dataSources, id: holderId}) => (
                    periods?.map(({id}) => (
                        <AverageDataContainer key={`${holderId}-${id}-average-cell`}
                                              dataSources={dataSources?.map(({id}) => id)} period={id}/>
                    ))
                ))
            }
            {
                averageColumn &&
                <AverageCell bold value={average}/>
            }
        </DataTableRow>
    )

}
