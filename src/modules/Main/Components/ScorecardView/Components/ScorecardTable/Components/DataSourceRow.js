import {DataTableCell, DataTableRow} from "@dhis2/ui";
import {head} from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import {useRecoilValue} from "recoil";
import {PeriodResolverState} from "../../../../../../../core/state/period";
import {ScorecardConfigDirtyState} from "../../../../../../../core/state/scorecard";
import {getDataSourcesDisplayName} from "../../../../../../../shared/utils/utils";
import DataContainer from "./TableDataContainer";

export default function DataSourceRow({dataSources}) {
    const {orgUnits} =
    useRecoilValue(ScorecardConfigDirtyState("orgUnitSelection")) ?? {};
    const periods =
        useRecoilValue(PeriodResolverState) ?? [];
    return (
        <DataTableRow bordered>
            <DataTableCell fixed left={"0"} width={"50px"}>
                &nbsp;
            </DataTableCell>
            <DataTableCell fixed left={"50px"} className="scorecard-org-unit-cell">{
                getDataSourcesDisplayName(dataSources)
            }
            </DataTableCell>
            {
                orgUnits?.map(({id}) => (
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
        </DataTableRow>
    )
}

DataSourceRow.propTypes = {
    dataSources: PropTypes.arrayOf(PropTypes.object).isRequired
};
