import i18n from '@dhis2/d2-i18n'
import {DataTableCell, DataTableColumnHeader, DataTableRow, InputField} from "@dhis2/ui";
import {debounce} from 'lodash'
import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {PeriodResolverState} from "../../../../../../../../../core/state/period";
import {ScorecardConfigDirtyState, ScorecardViewState} from "../../../../../../../../../core/state/scorecard";

export default function GroupsHeaderRow({nested}) {
    const {dataGroups} = useRecoilValue(ScorecardConfigDirtyState('dataSelection')) ?? {}
    const periods = useRecoilValue(PeriodResolverState) ?? []
    const [orgUnitKeyword, setOrgUnitKeyword] = useRecoilState(ScorecardViewState('orgUnitSearchKeyword'))
    const [sort, setSort] = useRecoilState(ScorecardViewState('tableSort'))
    const [searchValue, setSearchValue] = useState(orgUnitKeyword);

    const onOrgUnitSearch = useRef(debounce(setOrgUnitKeyword, 1000, {trailing: true, leading: false}))

    useEffect(() => {
        onOrgUnitSearch.current(searchValue)
    }, [searchValue])

    const onSortIconClick = ({direction}) => {
        setSort(prevValue => ({...prevValue, orgUnit: direction}))

    }

    return (
        <DataTableRow>
            <DataTableCell fixed left={"0"} width={"50px"}/>
            <DataTableColumnHeader name={'orgUnit'} onSortIconClick={onSortIconClick}
                                   sortDirection={sort?.orgUnit} align='left' fixed top={"0"} left={"50px"}
                                   width={"300px"} bordered
                                   className='scorecard-table-header scorecard-org-unit-cell' rowSpan={"3"}>
                {
                    !nested && <InputField value={searchValue} onChange={({value}) => setSearchValue(value)}
                                           placeholder={i18n.t('Search Organisation Unit')}/>
                }
            </DataTableColumnHeader>
            {
                dataGroups?.map(({title, id, dataHolders}) => (
                    <DataTableCell fixed className='scorecard-table-header' align='center' bordered
                                   colSpan={`${(dataHolders?.length ?? 1) * (periods?.length ?? 1)}`} key={id}>
                        {title}
                    </DataTableCell>
                ))
            }
        </DataTableRow>
    )
}

GroupsHeaderRow.propTypes = {
    nested: PropTypes.bool.isRequired
};

