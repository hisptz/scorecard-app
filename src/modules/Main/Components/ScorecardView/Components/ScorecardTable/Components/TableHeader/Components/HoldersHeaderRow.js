import {DataTableCell, DataTableRow} from "@dhis2/ui";
import React from "react";
import {useRecoilValue} from "recoil";
import {ScorecardConfigStateSelector, ScorecardViewSelector} from "../../../../../../../../../core/state/scorecard";


export default function HoldersHeaderRow() {
    const {dataGroups} = useRecoilValue(ScorecardConfigStateSelector('dataSelection')) ?? {}
    const {periods} = useRecoilValue(ScorecardViewSelector('periodSelection')) ?? []

    return (
        <DataTableRow>
            <DataTableCell fixed left={"0"} width={"50px"}>&nbsp;</DataTableCell>
            {
                dataGroups?.map(({dataHolders}) => (dataHolders?.map(({id, dataSources}) => (
                    <DataTableCell width={`${periods?.length * 200}px`} fixed colSpan={`${periods?.length}`} bordered
                                   align='center'
                                   key={id}>{dataSources?.length > 1 ? `${dataSources[0]?.displayName}/${dataSources[1]?.displayName}` : dataSources[0]?.displayName}</DataTableCell>))))
            }
        </DataTableRow>
    )
}
