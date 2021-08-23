import {DataTableCell, DataTableRow} from "@dhis2/ui";
import {head} from 'lodash'
import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {useRecoilValue} from "recoil";
import AverageDisplayType from "../../../../../../../../../core/constants/averageDisplayType";
import {DraggableItems} from "../../../../../../../../../core/constants/draggables";
import {PeriodResolverState} from "../../../../../../../../../core/state/period";
import {
    scorecardDataEngine,
    ScorecardOrgUnitState,
    ScorecardViewState
} from "../../../../../../../../../core/state/scorecard";
import {getDataSourcesDisplayName} from "../../../../../../../../../shared/utils/utils";
import DataContainer from "../../TableDataContainer";
import AverageCell from "./AverageCell";
import DraggableCell from "./DraggableCell";
import DroppableCell from "./DroppableCell";

export default function DataSourceRow({orgUnits, dataSources, overallAverage}) {
    const {emptyRows, averageColumn, averageDisplayType} = useRecoilValue(ScorecardViewState('options'))
    const [isEmpty, setIsEmpty] = useState(false);
    const [average, setAverage] = useState();
    const {filteredOrgUnits, childrenOrgUnits} = useRecoilValue(ScorecardOrgUnitState(orgUnits))
    const periods =
        useRecoilValue(PeriodResolverState) ?? [];

    useEffect(() => {
        const rowStatusSub = scorecardDataEngine.isDataSourcesRowEmpty(dataSources?.map(({id}) => id)).subscribe(setIsEmpty)
        const rowAverageSub = scorecardDataEngine.getDataSourceAverage(dataSources?.map(({id}) => id)).subscribe(setAverage)
        return () => {
            rowStatusSub.unsubscribe()
            rowAverageSub.unsubscribe();
        }
    }, [dataSources])

    const Component = <DataTableRow bordered>
        <DataTableCell fixed left={"0"} width={"50px"}/>
        <DataTableCell fixed left={"50px"} className="scorecard-org-unit-cell">
            <DroppableCell accept={[DraggableItems.ORG_UNIT_COLUMN]}>
                <DraggableCell label={getDataSourcesDisplayName(dataSources)} type={DraggableItems.DATA_ROW}/>
            </DroppableCell>
        </DataTableCell>
        {
            ([...filteredOrgUnits, ...childrenOrgUnits])?.map(({id}) => (
                periods?.map(({id: periodId}) => (
                        <td
                            className="data-cell"
                            align="center"
                            key={`${id}-${head(dataSources)?.id}-${periodId}`}
                        >
                            <DataContainer
                                orgUnitId={id}
                                dataSources={dataSources}
                                periodId={periodId}
                            />
                        </td>
                    )
                )))
        }
        {
            averageColumn &&
            <AverageCell bold value={average}/>

        }
    </DataTableRow>

    if (averageDisplayType === AverageDisplayType.ALL) {
        return ((emptyRows || !isEmpty) &&
            Component
        )
    }
    if (averageDisplayType === AverageDisplayType.BELOW_AVERAGE && overallAverage > average) {
        return ((emptyRows || !isEmpty) &&
            Component
        )
    }
    if (averageDisplayType === AverageDisplayType.ABOVE_AVERAGE && overallAverage <= average) {
        return ((emptyRows || !isEmpty) &&
            Component
        )
    }

    return null
}

DataSourceRow.propTypes = {
    dataSources: PropTypes.arrayOf(PropTypes.object).isRequired,
    orgUnits: PropTypes.arrayOf(PropTypes.object).isRequired,
    overallAverage: PropTypes.number.isRequired
};
