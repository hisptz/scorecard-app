import i18n from '@dhis2/d2-i18n'
import {DataTableCell, DataTableRow, Tooltip} from "@dhis2/ui";
import React from "react";
import {useRecoilValue} from "recoil";
import {DraggableItems} from "../../../../../../../../../core/constants/draggables";
import {PeriodResolverState} from "../../../../../../../../../core/state/period";
import {ScorecardConfigDirtyState} from "../../../../../../../../../core/state/scorecard";
import {getDataSourcesDisplayName} from "../../../../../../../../../shared/utils/utils";
import DraggableCell from "../../DraggableCell";
import DroppableCell from "../../DroppableCell";

export default function HoldersHeaderRow() {
    const {dataGroups} = useRecoilValue(ScorecardConfigDirtyState('dataSelection')) ?? {}
    const periods = useRecoilValue(PeriodResolverState) ?? []

    return (
        <DataTableRow>
            <DataTableCell fixed left={"0"} width={"50px"}>&nbsp;</DataTableCell>
            {
                dataGroups?.map(({dataHolders}) => (dataHolders?.map(({id, dataSources}) => (
                    <DataTableCell className='p-0' width={`${periods?.length * 100}px`} fixed colSpan={`${periods?.length}`} bordered
                                   align='center'
                                   key={id}>
                        <Tooltip content={i18n.t('Drag to row headers to change layout ')}>
                            <DroppableCell accept={[DraggableItems.ORG_UNIT_ROW]}>
                                <DraggableCell label={getDataSourcesDisplayName(dataSources)}
                                               type={DraggableItems.DATA_COLUMN}/>
                            </DroppableCell>
                        </Tooltip>
                    </DataTableCell>))))
            }
        </DataTableRow>
    )
}
