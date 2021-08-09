import {DataTableCell, DataTableRow, InputField} from "@dhis2/ui";
import {debounce} from 'lodash'
import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {PeriodResolverState} from "../../../../../../../../../core/state/period";
import {ScorecardConfigDirtyState, ScorecardViewState} from "../../../../../../../../../core/state/scorecard";

export default function GroupsHeaderRow({nested}) {
    const {dataGroups} = useRecoilValue(ScorecardConfigDirtyState('dataSelection')) ?? {}
    const periods = useRecoilValue(PeriodResolverState) ?? []
    const [keyword, setKeyword] = useRecoilState(ScorecardViewState('orgUnitSearchKeyword'))

    const [searchValue, setSearchValue] = useState(keyword);

    const onSearchChange = debounce(setKeyword)

    useEffect(() => {
        onSearchChange(searchValue)
    }, [searchValue])

    return (
        <DataTableRow>
            <DataTableCell fixed left={"0"} width={"50px"}/>
            <DataTableCell align='center' fixed top={"0"} left={"50px"} width={"300px"} bordered
                           className='scorecard-table-header scorecard-org-unit-cell' rowSpan={"3"}>
                <p> Organisation Unit</p>
                {
                    !nested && <InputField value={searchValue} onChange={({value}) => setSearchValue(value)}
                                           placeholder='Search Organisation Unit'/>
                }
            </DataTableCell>
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

