import i18n from '@dhis2/d2-i18n'
import {DataTableCell, DataTableRow, InputField} from "@dhis2/ui";
import {debounce} from 'lodash'
import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {
    ScorecardTableConfigState,
    ScorecardTableOrientationState,
    ScorecardViewState
} from "../../../../../../../../../core/state/scorecard";

export default function GroupsHeaderRow({nested}) {
    const {columns} = useRecoilValue(ScorecardTableConfigState)
    const [col1] = columns ?? []
    const [keyword, setKeyword] = useRecoilState(ScorecardViewState('orgUnitSearchKeyword'))
    const orientation = useRecoilValue(ScorecardTableOrientationState)
    const [searchValue, setSearchValue] = useState(keyword);

    const onSearchChange = debounce(setKeyword)

    useEffect(() => {
        onSearchChange(searchValue)
    }, [searchValue])

    return (
        <DataTableRow>
            <DataTableCell fixed left={"0"} width={"50px"}/>
            <DataTableCell align='center' fixed top={"0"} left={"50px"} width={"300px"} bordered
                           className='scorecard-table-header scorecard-org-unit-cell' rowSpan={columns?.length}>
                {
                    !nested && <InputField value={searchValue} onChange={({value}) => setSearchValue(value)}
                                           placeholder={orientation === 'orgUnitVsData' ? i18n.t('Search Organisation Unit') : i18n.t('Search Data')}/>
                }
            </DataTableCell>
            {
                col1?.value?.map(col => (
                    <DataTableCell key={`${col[col1?.displayNameProperty]}-col1`}>
                        {col[col1?.displayNameProperty]}
                    </DataTableCell>
                ))
            }
        </DataTableRow>
    )
}

GroupsHeaderRow.propTypes = {
    nested: PropTypes.bool.isRequired
};

