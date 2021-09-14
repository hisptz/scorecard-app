
import React from 'react'
import i18n from "@dhis2/d2-i18n";


import {
    DataTable,
    DataTableToolbar,
    DataTableHead,
    TableHead,
    DataTableBody,
    TableBody,
    DataTableCell,
    DataTableRow,
    DataTableColumnHeader,
} from '@dhis2/ui'
import {displayType, getAllId} from "../../../../Utils/Functions/FunctionDictionary";
import {useDataEngine} from "@dhis2/app-runtime";
import {useGetIdDetails} from "../../../../Utils/Hooks/FunctionDictionary";
import Loader from "../../../../Shared/Componets/Loaders/Loader";
import Error from "../../../../Shared/Componets/Error/ErrorAPIResult";

import {dateTimeDisplay} from "../../../../Utils/Functions/Shared";


export default function DataSource({json}){


    let jsonToUse=JSON.stringify(json)?.replace(/\s/g,'')
    let arrayIdToUse=getAllId(jsonToUse)

    const engine=useDataEngine()


    const{loading,error,data}=useGetIdDetails(arrayIdToUse,engine)

    if(loading){
        return  <Loader text={""} />
    }if(error){
        return <Error error={error} />
    }

    return <div>
        <h3>{i18n.t("Data Sources")} </h3>
        <p>
            {i18n.t("Function have rules calculating from multiple data sources. Here are few data sources observed")}


        </p>

        <DataTable>
            <TableHead>
                <DataTableRow>
                    <DataTableColumnHeader bordered>
                        {i18n.t("Id")}
                    </DataTableColumnHeader>
                    <DataTableColumnHeader bordered>
                        {i18n.t("Name")}
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        {i18n.t("Description")}
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        {i18n.t("Code")}
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        {i18n.t("Type")}
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        {i18n.t("More details")}
                    </DataTableColumnHeader>
                    <DataTableColumnHeader>
                        {i18n.t("Last updated")}
                    </DataTableColumnHeader>

                </DataTableRow>
            </TableHead>
            <TableBody>
                {data?.idDetails?.map((e)=>{
                    return  <DataTableRow key={e.id} >
                        <DataTableCell bordered>
                            {e?.id}
                        </DataTableCell  >
                        <DataTableCell bordered>
                            {e?.displayName}
                        </DataTableCell  >
                        <DataTableCell bordered>
                            {e?.description ?? 'No description'}
                        </DataTableCell  >
                        <DataTableCell bordered>
                            {e?.code ?? 'no code'}
                        </DataTableCell  >
                        <DataTableCell bordered>
                            {displayType(e?.href)}
                        </DataTableCell  >
                        <DataTableCell bordered>
                            <i> <a style={{textDecoration:"none"}} href={e?.href +".json"} target={"_blank"} >{e?.href +".json"}</a> </i>

                        </DataTableCell  >
                        <DataTableCell bordered>
                            {dateTimeDisplay(e?.lastUpdated)}
                        </DataTableCell  >

                    </DataTableRow>
                })}

            </TableBody>

        </DataTable>


    </div>
}