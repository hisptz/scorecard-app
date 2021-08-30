import { TableHead, TableBody,  DataTable,    DataTableRow,    DataTableCell,    DataTableColumnHeader,} from '@dhis2/ui'
import {useConfig, useDataQuery} from "@dhis2/app-runtime";
import {dataTypes} from "../../../../../../Utils/Models";
import Loader from "../../../../../../Shared/Componets/Loaders/Loader";
import Error from "../../../../../../Shared/Componets/Error/ErrorAPIResult";
import React from "react";

const query = {
    orgUnitLevels: {
        resource: 'organisationUnitLevels',
        params: ({levels}) => ({
            fields: [
                'id', 'displayName'
            ],
            filter: levels?.map(level => (`level:eq: ${level}`)) ?? []
        })
    }
}


export default function OtherDetailTable(props){

    const {baseUrl}=useConfig()

    const detail=props?.other

    const levels=detail?.aggregationLevels

    const {loading, error, data,refetch}  = useDataQuery(query, {variables: {levels}})


    return (
        <DataTable>
            <TableHead>
                <DataTableRow>
                    <DataTableColumnHeader>

                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Color
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Icon
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Option set
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Option set for Comments
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Legends
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        Aggregation Levels
                    </DataTableColumnHeader>
                </DataTableRow>
            </TableHead>
            <TableBody>
                <DataTableRow>
                    <DataTableCell bordered tag="th">
                        Details
                    </DataTableCell>
                    <DataTableCell bordered >

                        {typeof(detail?.style?.color)===dataTypes.UNDEFINED?"no color":
                            <div style={{
                                background: detail?.style?.color,
                                width:"inherit",
                                height:50
                            }}></div>
                        }

                    </DataTableCell>
                    <DataTableCell bordered>
                        {typeof detail?.style?.color===dataTypes.UNDEFINED?"no icon":
                            <img src={`${baseUrl}/api/icons/${detail?.style?.icon}/icon.svg`} alt={"icon"} />
                        }

                    </DataTableCell>
                    <DataTableCell bordered>
                        {JSON.stringify(detail?.optionSetValue)}
                    </DataTableCell>
                    <DataTableCell bordered>
                        {typeof detail?.commentOptionSet?.displayName===dataTypes.UNDEFINED?"no commnets":detail?.commentOptionSet?.displayName}

                    </DataTableCell>
                    <DataTableCell bordered>
                        {detail?.legendSets?.length===0? 'no legends assigned':
                            <ol>
                                {detail?.legendSets?.map((legend)=>{
                                    return <li key={legend.id}>{legend?.displayName}</li>
                                })}
                            </ol>
                        }
                    </DataTableCell>
                    <DataTableCell bordered>
                        {
                            loading ? <Loader text={""}/> : error ? <Error error={error}/> :
                                data?.orgUnitLevels?.organisationUnitLevels?.length === 0 ? "No organization unit level assigned" :
                                    <ol>
                                        {data?.orgUnitLevels?.organisationUnitLevels?.map((lev) => {
                                            return (
                                                <li key={lev?.id}>{lev?.displayName}</li>
                                            )
                                        })}
                                    </ol>

                        }

                    </DataTableCell>

                </DataTableRow>
            </TableBody>
        </DataTable>
    )
}