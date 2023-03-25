import i18n from "@dhis2/d2-i18n";
import {DataTableCell, DataTableColumnHeader, InputField} from "@dhis2/ui";
import {debounce} from "lodash";
import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import classes from "../../../scorecardTable.module.css";
import {ScorecardNameSort, ScorecardViewState} from "../../../../../../../state";

export default function OrgUnitHeaderCells({orgUnits, nested}) {
    const [orgUnitKeyword, setOrgUnitKeyword] = useRecoilState(
        ScorecardViewState("orgUnitSearchKeyword")
    );
    const [searchValue, setSearchValue] = useState(orgUnitKeyword);

    const {itemNumber} =
    useRecoilValue(ScorecardViewState("options")) ?? {}
    const [sort, setSort] = useRecoilState(ScorecardNameSort(orgUnits));

    const onSortIconClick = ({direction}) => {
        setSort((prevValue) => ({...prevValue, orgUnit: direction}));
    };

    const onOrgUnitSearch = useRef(
        debounce(setOrgUnitKeyword, 1000, {trailing: true, leading: false})
    );

    useEffect(() => {
        onOrgUnitSearch.current(searchValue);
    }, [searchValue]);


    return (
        <>
            <DataTableCell rowSpan={"3"} fixed left={"0"} width={"50px"}/>
            {itemNumber && (
                <DataTableCell rowSpan={"3"} fixed left={"50px"} width={"50px"}/>
            )}
            <DataTableColumnHeader
                align="center"
                name={"orgUnit"}
                onSortIconClick={onSortIconClick}
                sortDirection={sort?.orgUnit}
                fixed
                top={"0"}
                left={itemNumber ? "100px" : "50px"}
                bordered
                width={"200px"}
                className={classes['org-unit-header-cell']}
                rowSpan={"3"}
            >
                {!nested && (
                    <InputField
                        dataTest={"org-unit-search"}
                        className="print-hide w-100 org-unit-search"
                        value={searchValue}
                        onChange={({value}) => setSearchValue(value)}
                        placeholder={i18n.t("Search Organisation Unit")}
                    />
                )}
                <h4 className="print-show hide">{i18n.t("Organisation Unit(s)")}</h4>
            </DataTableColumnHeader></>
    )
}


OrgUnitHeaderCells.propTypes = {
    nested: PropTypes.bool,
    orgUnits: PropTypes.array,
};
