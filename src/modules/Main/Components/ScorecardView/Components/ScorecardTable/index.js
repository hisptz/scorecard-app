import {useAlert} from "@dhis2/app-runtime";
import {DataTable, DataTableBody, DataTableCell, DataTableRow} from '@dhis2/ui'
import {head, isEmpty} from 'lodash'
import PropTypes from 'prop-types'
import React, {useEffect, useMemo, useState} from 'react'
import {useRecoilValue} from "recoil";
import ScorecardConfState, {ScorecardViewSelector} from "../../../../../../core/state/scorecard";
import {FullPageLoader} from "../../../../../../shared/Components/Loaders";
import useMediaQuery from "../../../../../../shared/hooks/useMediaQuery";
import {useOrganisationUnitChildren} from "../../../../../../shared/hooks/useOrganisationUnits";
import DataContainer from "./Components/TableDataContainer";
import TableHeader from "./Components/TableHeader";
import {getTableWidth} from "./services/utils";

export default function ScorecardTable({orgUnits}) {
    const {width: screenWidth} = useMediaQuery()
    const {dataSelection} = useRecoilValue(ScorecardConfState)
    const {periods} = useRecoilValue(ScorecardViewSelector('periodSelection')) ?? []
    const {dataGroups} = dataSelection
    const tableWidth = useMemo(() => getTableWidth(periods, dataGroups, screenWidth), [periods, dataGroups, dataSelection]);
    const {loading, error, orgUnits: childrenOrgUnits, setId} = useOrganisationUnitChildren()
    const {show} = useAlert(({message}) => message, ({type}) => ({...type, duration: 3000}))
    const [expandedOrgUnit, setExpandedOrgUnit] = useState();

    useEffect(() => {
        if (orgUnits?.length === 1) {
            console.log(orgUnits)
            setId(head(orgUnits)?.id)
        } else {
            setId(undefined)
        }
    }, [orgUnits])

    useEffect(() => {
        if (error) {
            show({message: error.message ?? error.details, type: {info: true}})
        }
    }, [error])

    return (
        <div className='w-100 pb-32'>
            {
                loading ? <FullPageLoader/> :
                    isEmpty(dataGroups) ? <div>Empty</div> :
                        <DataTable width={`${tableWidth}px`} scrollWidth={`${screenWidth}px`} layout='fixed'>
                            <TableHeader/>
                            <DataTableBody>
                                {
                                    orgUnits?.map(({id, displayName}) => (
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
                                        </DataTableRow>))
                                }
                                {
                                    childrenOrgUnits?.map(({id, displayName}) => (
                                        <DataTableRow
                                            expanded={id === expandedOrgUnit}
                                            onExpandToggle={() => {
                                                if (id === expandedOrgUnit) {
                                                    setExpandedOrgUnit(undefined)
                                                } else {
                                                    setExpandedOrgUnit(id)
                                                }
                                            }
                                            }
                                            expandableContent={
                                                <div className="p-16">
                                                    <ScorecardTable orgUnits={[{id, displayName}]}/>
                                                </div>
                                            } key={id}
                                            bordered>
                                            <DataTableCell fixed left={"50px"}>
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
                                        </DataTableRow>))
                                }
                            </DataTableBody>
                        </DataTable>
            }
        </div>
    )
}

ScorecardTable.propTypes = {
    orgUnits: PropTypes.arrayOf(PropTypes.object)
};



