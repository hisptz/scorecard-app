import {useAlert} from "@dhis2/app-runtime";
import {DataTable, DataTableBody} from '@dhis2/ui'
import {head, isEmpty} from 'lodash'
import PropTypes from 'prop-types'
import React, {useEffect, useMemo, useState} from 'react'
import {useRecoilValue} from "recoil";
import ScorecardConfState, {ScorecardViewSelector} from "../../../../../../core/state/scorecard";
import {FullPageLoader} from "../../../../../../shared/Components/Loaders";
import useMediaQuery from "../../../../../../shared/hooks/useMediaQuery";
import {useOrganisationUnitChildren} from "../../../../../../shared/hooks/useOrganisationUnits";
import ChildOrgUnitRow from "./Components/ChildOrgUnitRow";
import EmptyDataGroups from "./Components/EmptyDataGroups";
import ParentOrgUnitRow from "./Components/ParentOrgUnitRow";
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
        <div className='w-100 pb-32 flex-1'>
            {
                loading ? <FullPageLoader/> :
                    isEmpty(dataGroups) ? <EmptyDataGroups/> :
                        <DataTable width={`${tableWidth}px`} scrollWidth={`${screenWidth}px`} layout='fixed'>
                            <TableHeader/>
                            <DataTableBody>
                                {
                                    orgUnits?.map((orgUnit) => (
                                        <ParentOrgUnitRow key={`${orgUnit?.id}-row`} orgUnit={orgUnit}/>))
                                }
                                {
                                    childrenOrgUnits?.map((orgUnit) => (
                                        <ChildOrgUnitRow key={`${orgUnit?.id}-row`} onExpand={setExpandedOrgUnit}
                                                         orgUnit={orgUnit}
                                                         expandedOrgUnit={expandedOrgUnit}/>))
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



