import i18n from "@dhis2/d2-i18n";
import {DataTableCell, DataTableRow, InputField} from "@dhis2/ui";
import {debounce} from "lodash";
import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {ScorecardTableOrientationState, ScorecardViewState} from "../../../../../../../../../core/state/scorecard";

export default function TopHeaderRow({column, colSpan, nested, rowSpan}) {
    const {value, displayNameProperty} = column ?? {};


    const orientation = useRecoilValue(ScorecardTableOrientationState)
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
                           className='scorecard-table-header scorecard-org-unit-cell' rowSpan={rowSpan}>
                {
                    !nested && <InputField value={searchValue} onChange={({value}) => setSearchValue(value)}
                                           placeholder={orientation === 'orgUnitVsData' ? i18n.t('Search Organisation Unit') : i18n.t('Search Data')}/>
                }
            </DataTableCell>
            {
                value?.map(col => (
                    <DataTableCell key={`${col[displayNameProperty]}-col1`} colSpan={colSpan}>
                        {col[displayNameProperty]}
                    </DataTableCell>
                ))
            }
        </DataTableRow>
    )
}

TopHeaderRow.propTypes = {
    colSpan: PropTypes.number.isRequired,
    column: PropTypes.object.isRequired,
    nested: PropTypes.bool.isRequired,
    rowSpan: PropTypes.number.isRequired
};

