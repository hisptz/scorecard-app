import {DataTableCell, DataTableRow} from "@dhis2/ui";
import PropTypes from 'prop-types'
import React from 'react'
import {useRecoilValue} from "recoil";
import {PeriodResolverState} from "../../../../../../../core/state/period";
import {ScorecardConfigStateSelector} from "../../../../../../../core/state/scorecard";
import OrgUnitContainer from "./OrgUnitContainer";
import DataContainer from "./TableDataContainer";

export default function ParentOrgUnitRow({orgUnit}) {
    const {id} = orgUnit ?? {};
    const {dataGroups} =
    useRecoilValue(ScorecardConfigStateSelector("dataSelection")) ?? {};
    const periods =
        useRecoilValue(PeriodResolverState) ?? [];

    return (
        <DataTableRow key={id} bordered>
            <DataTableCell fixed left={"0"} width={"50px"}>
                &nbsp;
            </DataTableCell>
            <DataTableCell fixed left={"50px"} className="scorecard-org-unit-cell">
                <OrgUnitContainer orgUnit={orgUnit}/>
            </DataTableCell>
            {dataGroups?.map(({id: groupId, dataHolders}) =>
                dataHolders?.map(({id: holderId, dataSources}) =>
                    periods?.map(({id: periodId}) => (
                        <td
                            className="data-cell"
                            align="center"
                            key={`${groupId}-${holderId}-${periodId}`}
                        >
                            <DataContainer
                                orgUnitId={id}
                                dataSources={dataSources}
                                periodId={periodId}
                            />
                        </td>
                    ))
                )
            )}
        </DataTableRow>
    );
}

ParentOrgUnitRow.propTypes = {
    orgUnit: PropTypes.object.isRequired,
};
