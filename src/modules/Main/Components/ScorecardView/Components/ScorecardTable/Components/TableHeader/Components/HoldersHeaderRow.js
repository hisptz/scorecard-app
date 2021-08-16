import i18n from '@dhis2/d2-i18n'
import {DataTableCell, DataTableColumnHeader, DataTableRow, Tooltip} from "@dhis2/ui";
import React from "react";
import {useRecoilValue} from "recoil";
import {DraggableItems} from "../../../../../../../../../core/constants/draggables";
import {PeriodResolverState} from "../../../../../../../../../core/state/period";
import {ScorecardViewState} from "../../../../../../../../../core/state/scorecard";
import {getDataSourcesDisplayName} from "../../../../../../../../../shared/utils/utils";
import DraggableCell from "../../DraggableCell";
import DroppableCell from "../../DroppableCell";

export default function HoldersHeaderRow() {
    const {dataGroups} = useRecoilValue(ScorecardViewState('dataSelection')) ?? {}
    const periods = useRecoilValue(PeriodResolverState) ?? []

    const onSortClick = (direction) => {
        console.log(direction)
    }

    return (
        <DataTableRow>
            <DataTableCell fixed left={"0"} width={"50px"}/>
            {
                dataGroups?.map(({dataHolders}) => (dataHolders?.map(({id, dataSources}) => (
                    <DataTableColumnHeader onSortIconClick={onSortClick}
                                           sortDirection='default' className='p-0 scorecard-table-cell'
                                           width={`${periods?.length * 100}px`} top={"0"} fixed
                                           colSpan={`${periods?.length}`} bordered
                                           align='center'
                                           key={`${id}-column-header`} name={`${id}`}>
                        <div style={{height: '100%', width: '100%'}}>
                            <Tooltip className='m-auto' content={i18n.t('Drag to row headers to change layout')}>
                                <DroppableCell accept={[DraggableItems.ORG_UNIT_ROW]}>
                                    <DraggableCell label={getDataSourcesDisplayName(dataSources)}
                                                   type={DraggableItems.DATA_COLUMN}/>
                                </DroppableCell>
                            </Tooltip>
                        </div>
                    </DataTableColumnHeader>))))
            }
        </DataTableRow>
    )
}
