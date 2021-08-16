import i18n from "@dhis2/d2-i18n";
import {DataTableCell, DataTableRow, InputField, Tooltip, DataTableColumnHeader} from "@dhis2/ui";
import {debounce} from "lodash";
import PropTypes from "prop-types";
import React, {useEffect, useRef, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {DraggableItems} from "../../../../../../../../../core/constants/draggables";
import {PeriodResolverState} from "../../../../../../../../../core/state/period";
import {ScorecardOrgUnitState, ScorecardViewState} from "../../../../../../../../../core/state/scorecard";
import DraggableCell from "../../DraggableCell";
import DroppableCell from "../../DroppableCell";


export default function OrgUnitHeaderRow({orgUnits, nested}) {
    const {filteredOrgUnits, childrenOrgUnits} = useRecoilValue(ScorecardOrgUnitState(orgUnits))
    const periods = useRecoilValue(PeriodResolverState) ?? []
    const [dataKeyword, setDataKeyword] = useRecoilState(ScorecardViewState('dataSearchKeyword'))
    const [searchValue, setSearchValue] = useState(dataKeyword);
    const [sort, setSort] = useRecoilState(ScorecardViewState('tableSort'))
    const onDataSearch = useRef(debounce(setDataKeyword, 1000, {trailing: true, leading: false}))

    useEffect(() => {
        onDataSearch.current(searchValue)
    }, [searchValue])

    const onSortIconClick = ({direction}) => {
        setSort(prevValue => ({...prevValue, data: direction}))
    }

    const onDataSortClick = (direction) =>{
        console.log(direction)
    }

    return (
        <DataTableRow>
            <DataTableCell fixed left={"0"} width={"50px"}/>
            <DataTableColumnHeader onSortIconClick={onSortIconClick}
                           sortDirection={sort?.data} align='center' fixed top={"0"} left={"50px"} width={"300px"} bordered
                           className='scorecard-table-header scorecard-org-unit-cell' rowSpan={"2"}>
                {
                    !nested && <InputField value={searchValue} onChange={({value}) => setSearchValue(value)}
                                           placeholder={i18n.t('Search Data')}/>
                }
            </DataTableColumnHeader>
            {
                [...filteredOrgUnits, ...childrenOrgUnits]?.map(({displayName, id}) => (
                    <DataTableColumnHeader name={`${id}`} sortDirection={'default'} onSortIconClick={onDataSortClick} fixed className='scorecard-table-header scorecard-table-cell' align='center' bordered
                                   colSpan={`${(periods?.length ?? 1)}`} key={id}>
                       <div style={{height: '100%' , width: '100%'}}>
                           <Tooltip className='m-auto' content={i18n.t('Drag to row headers to change layout ')}>
                               <DroppableCell accept={[DraggableItems.DATA_ROW]}>
                                   <DraggableCell label={displayName} type={DraggableItems.ORG_UNIT_COLUMN}/>
                               </DroppableCell>
                           </Tooltip>
                       </div>
                    </DataTableColumnHeader>
                ))
            }
        </DataTableRow>
    )
}

OrgUnitHeaderRow.propTypes = {
    nested: PropTypes.bool.isRequired,
    orgUnits: PropTypes.arrayOf(PropTypes.object).isRequired,
};
