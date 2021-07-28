import {DataTableCell, DataTableRow} from "@dhis2/ui";
import PropTypes from 'prop-types'
import React from 'react'
import {useRecoilValue} from "recoil";
import ScorecardConfState, {ScorecardViewSelector} from "../../../../../../../core/state/scorecard";
import DataContainer from "./TableDataContainer";

export default function ParentOrgUnitRow({orgUnit}){
    const {id, displayName} = orgUnit ?? {};
    const {dataSelection} = useRecoilValue(ScorecardConfState)
    const {periods} = useRecoilValue(ScorecardViewSelector('periodSelection')) ?? []
    const {dataGroups} = dataSelection

    return(
        <DataTableRow key={id}
                      bordered>
            <DataTableCell fixed left={"0"} width={"50px"}>&nbsp;</DataTableCell>
            <DataTableCell fixed
                           left={"50px"}
                           className='scorecard-org-unit-cell'>
                {displayName}
            </DataTableCell>
            {
                dataGroups?.map(({id: groupId, dataHolders}) => (
                    dataHolders?.map(({id: holderId, dataSources}) => (
                        periods?.map(({id: periodId}) => (
                            <td className='data-cell' align='center'
                                key={`${groupId}-${holderId}-${periodId}`}>
                                <DataContainer orgUnitId={id} dataSources={dataSources}
                                               periodId={periodId}/>
                            </td>
                        ))
                    ))
                ))
            }
        </DataTableRow>
    )
}

ParentOrgUnitRow.propTypes = {
    orgUnit: PropTypes.object.isRequired
};
