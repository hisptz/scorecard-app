import i18n from "@dhis2/d2-i18n";
import {DataTable, DataTableBody, DataTableCell, DataTableHead, DataTableRow,} from "@dhis2/ui";
import {UserState} from "@scorecard/shared";
import {head} from "lodash";
import React, {useMemo} from "react";
import {useFormContext} from "react-hook-form";
import {useRecoilValue} from "recoil";
import PreviewCustomCell from "./Components/PreviewCustomCell";

export default function PreviewScorecardTable() {
    const {watch} = useFormContext();
    const {organisationUnits} = useRecoilValue(UserState);
    const {dataGroups} = watch("dataSelection") ?? {}
    const columns = useMemo(() => [...dataGroups], [dataGroups]);
    return (
        <div className="column" style={{width: "100%", overflowX: "auto"}}>
            <DataTable bordered width={"100%"}>
                <DataTableHead>
                    <DataTableRow>
                        <DataTableCell
                            fixed
                            align="center"
                            className="table-header scorecard-table-header"
                            bordered
                            rowSpan={"2"}
                        >
                            {i18n.t("Organisation Unit")}
                        </DataTableCell>
                        {columns?.map((column) => (
                            <DataTableCell
                                fixed
                                align="center"
                                className="table-header scorecard-table-header"
                                bordered
                                colSpan={column?.dataHolders?.length}
                                key={column?.id}
                            >
                                {column?.title}
                            </DataTableCell>
                        ))}
                    </DataTableRow>
                    <DataTableRow>
                        {dataGroups?.map((group) => (
                            <th
                                width={`${group.dataHolders?.length * 100}px`}
                                key={group.id}
                                colSpan={group.dataHolders?.length || 1}
                            >
                                <table style={{borderSpacing: 0, height: "100%"}}>
                                    <tr>
                                        {group?.dataHolders?.map(({dataSources}) => (
                                            <DataTableCell
                                                width={"100px"}
                                                fixed
                                                bordered
                                                key={dataSources[0]?.id}
                                                id={dataSources[0]?.id}
                                            >
                                                {dataSources[0]?.label}{" "}
                                                {dataSources.length > 1 &&
                                                    `/${dataSources?.[1]?.label}`}
                                            </DataTableCell>
                                        ))}
                                    </tr>
                                </table>
                            </th>
                        ))}
                    </DataTableRow>
                </DataTableHead>
                <DataTableBody>
                    <DataTableRow bordered>
                        <DataTableCell
                            width={"100%"}
                            className={"min-width-200"}
                            fixed
                            tag="th"
                            bordered
                        >
                            {head(organisationUnits)?.displayName}
                        </DataTableCell>
                        {dataGroups?.map((group) => (
                            <td
                                className="no-wrap"
                                width={`${group.dataHolders?.length * 100}px`}
                                style={{height: 47}}
                                key={group.id}
                                colSpan={group.dataHolders?.length || 1}
                            >
                                <table style={{borders: "none", borderSpacing: 0}}>
                                    <DataTableRow>
                                        {group?.dataHolders?.map((config) => (
                                            <PreviewCustomCell key={config.id} config={config}/>
                                        ))}
                                    </DataTableRow>
                                </table>
                            </td>
                        ))}
                    </DataTableRow>
                </DataTableBody>
            </DataTable>
        </div>
    );
}
