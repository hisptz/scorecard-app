import {DataTableCell, DataTableRow} from "@dhis2/ui";
import PropTypes from 'prop-types'
import React from "react";
import {useRecoilValue, useRecoilValueLoadable} from "recoil";
import {PeriodResolverState} from "../../../../../../../core/state/period";
import {ScorecardConfigStateSelector, ScorecardDataState} from "../../../../../../../core/state/scorecard";
import ScorecardTable from "../index";
import OrgUnitContainer from "./OrgUnitContainer";
import DataContainer from "./TableDataContainer";

export default function ChildOrgUnitRow({orgUnit, expandedOrgUnit, onExpand}) {
    const {id} = orgUnit ?? {};
    const {dataGroups} = useRecoilValue(ScorecardConfigStateSelector('dataSelection')) ?? {}
    const periods = useRecoilValue(PeriodResolverState) ?? []
    const data = useRecoilValueLoadable(ScorecardDataState(id))
    return (
        <DataTableRow
            expanded={id === expandedOrgUnit}
            onExpandToggle={() => {
                if (id === expandedOrgUnit) {
                    onExpand(undefined)
                } else {
                    onExpand(id)
                }
            }
            }
            expandableContent={
                <div className="p-16">
                    <ScorecardTable nested={true} orgUnits={[orgUnit]}/>
                </div>
            } key={id}
            bordered>
            <DataTableCell fixed left={"50px"}>
                <OrgUnitContainer orgUnit={orgUnit}/>
            </DataTableCell>
            {
                data.state === 'hasValue' ? dataGroups?.map(({id: groupId, dataHolders}) => (
                    dataHolders?.map(({id: holderId, dataSources}) => (
                        periods?.map(({id: periodId}) => (
                            <td className='data-cell' align='center'
                                key={`${groupId}-${holderId}-${periodId}`}>
                                <DataContainer orgUnitId={id} dataSources={dataSources}
                                               periodId={periodId}/>
                            </td>
                        ))
                    ))
                )) : null
            }
        </DataTableRow>
    )
}

ChildOrgUnitRow.propTypes = {
    orgUnit: PropTypes.object.isRequired,
    onExpand: PropTypes.func.isRequired,
    expandedOrgUnit: PropTypes.string
};


