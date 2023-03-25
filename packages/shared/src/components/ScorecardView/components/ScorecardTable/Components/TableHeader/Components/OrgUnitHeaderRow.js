import i18n from "@dhis2/d2-i18n";
import {DataTableCell, DataTableColumnHeader, DataTableRow, InputField, Tooltip,} from "@dhis2/ui";
import {debounce} from "lodash";
import PropTypes from "prop-types";
import React, {useEffect, useRef, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import classes from '../../../scorecardTable.module.css'
import DraggableCell from "../../TableBody/Components/DraggableCell";
import DroppableCell from "../../TableBody/Components/DroppableCell";
import {
    PeriodResolverState,
    ScorecardNameSort,
    ScorecardOrgUnitState,
    ScorecardTableConfigState,
    ScorecardTableSortState,
    ScorecardViewState
} from "../../../../../../../state";
import {DraggableItems, ScorecardTableConstants} from "../../../../../../../constants";


export default function OrgUnitHeaderRow({orgUnits, nested}) {
    const {averageColumn, itemNumber} = useRecoilValue(
        ScorecardViewState("options")
    );
    const {filteredOrgUnits, childrenOrgUnits} = useRecoilValue(
        ScorecardOrgUnitState(orgUnits)
    );
    const periods = useRecoilValue(PeriodResolverState) ?? [];
    const [dataKeyword, setDataKeyword] = useRecoilState(
        ScorecardViewState("dataSearchKeyword")
    );
    const [searchValue, setSearchValue] = useState(dataKeyword);
    const [sort, setSort] = useRecoilState(ScorecardNameSort(orgUnits));
    const [{name, direction}, setDataSort] = useRecoilState(
        ScorecardTableSortState(orgUnits)
    );
    const onDataSearch = useRef(
        debounce(setDataKeyword, 1000, {trailing: true, leading: false})
    );
    const {nameColumnWidth} = useRecoilValue(
        ScorecardTableConfigState(orgUnits)
    );
    useEffect(() => {
        onDataSearch.current(searchValue);
    }, [searchValue]);

    const onSortIconClick = ({direction}) => {
        setSort((prevValue) => ({...prevValue, data: direction}));
    };

    const onDataSortClick = (direction) => {
        setDataSort({
            ...direction,
            type: "orgUnit",
        });
    };

    return (
        <DataTableRow className={classes["table-header-row"]}>
            <DataTableCell
                rowSpan={"2"}
                fixed
                left={"0"}
                width={"50px"}
            />
            {itemNumber && (
                <DataTableCell rowSpan={"2"} fixed left={"50px"} width={"50px"}/>
            )}
            <DataTableColumnHeader
                onSortIconClick={onSortIconClick}
                sortDirection={sort?.data}
                align="center"
                fixed
                top={"0"}
                left={itemNumber ? "100px" : "50px"}
                width={nameColumnWidth}
                bordered
                className={classes['org-unit-header-cell']}
                rowSpan={"2"}
            >
                {!nested && (
                    <InputField
                        className="print-hide w-100 data-search"
                        value={searchValue}
                        onChange={({value}) => setSearchValue(value)}
                        placeholder={i18n.t("Search Data")}
                    />
                )}
                <h3 className="print-show hide">{i18n.t("Data")}</h3>
            </DataTableColumnHeader>
            {[...filteredOrgUnits, ...childrenOrgUnits]?.map(
                ({displayName, id}) => (
                    <DataTableColumnHeader
                        name={`${id}`}
                        sortDirection={name === id ? direction : "default"}
                        onSortIconClick={onDataSortClick}
                        fixed
                        className={classes['data-header-cell']}
                        align="center"
                        bordered
                        width={`${periods?.length * ScorecardTableConstants.CELL_WIDTH}px`}
                        colSpan={`${periods?.length ?? 1}`}
                        key={id}
                    >
                        <div style={{height: "100%", width: "100%"}}>
                            <Tooltip
                                className="m-auto"
                                content={i18n.t("Drag to row headers to change layout ")}
                            >
                                <DroppableCell accept={[DraggableItems.DATA_ROW]}>
                                    <DraggableCell
                                        label={displayName}
                                        type={DraggableItems.ORG_UNIT_COLUMN}
                                    />
                                </DroppableCell>
                            </Tooltip>
                        </div>
                    </DataTableColumnHeader>
                )
            )}
            {averageColumn && (
                <DataTableCell
                    width={`${ScorecardTableConstants.CELL_WIDTH}px`}
                    fixed
                    align="center"
                    bordered
                    className={classes['data-header-cell']}
                    rowSpan={"2"}
                >
                    {i18n.t("Average")}
                </DataTableCell>
            )}
        </DataTableRow>
    );
}

OrgUnitHeaderRow.propTypes = {
    nested: PropTypes.bool.isRequired,
    orgUnits: PropTypes.arrayOf(PropTypes.object).isRequired,
};
