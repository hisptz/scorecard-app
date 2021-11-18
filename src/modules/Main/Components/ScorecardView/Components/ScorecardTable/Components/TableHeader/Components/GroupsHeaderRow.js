import i18n from "@dhis2/d2-i18n";
import {
  DataTableCell,
  DataTableColumnHeader,
  DataTableRow,
  InputField,
} from "@dhis2/ui";
import { debounce } from "lodash";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ScorecardTableConstants } from "../../../../../../../../../core/constants/table";
import { PeriodResolverState } from "../../../../../../../../../core/state/period";
import {
  ScorecardTableConfigState,
  ScorecardViewState,
} from "../../../../../../../../../core/state/scorecard";
import classes from '../../../scorecardTable.module.css'

export default function GroupsHeaderRow({ nested, orgUnits }) {
  const { dataGroups } =
    useRecoilValue(ScorecardViewState("dataSelection")) ?? {};
  const { averageColumn, itemNumber } =
    useRecoilValue(ScorecardViewState("options")) ?? {};
  const periods = useRecoilValue(PeriodResolverState) ?? [];
  const [orgUnitKeyword, setOrgUnitKeyword] = useRecoilState(
    ScorecardViewState("orgUnitSearchKeyword")
  );
  const [sort, setSort] = useRecoilState(ScorecardViewState("tableSort"));
  const [searchValue, setSearchValue] = useState(orgUnitKeyword);
  const { nameColumnWidth } = useRecoilValue(
    ScorecardTableConfigState(orgUnits)
  );
  const onOrgUnitSearch = useRef(
    debounce(setOrgUnitKeyword, 1000, { trailing: true, leading: false })
  );
  useEffect(() => {
    onOrgUnitSearch.current(searchValue);
  }, [searchValue]);

  const onSortIconClick = ({ direction }) => {
    setSort((prevValue) => ({ ...prevValue, orgUnit: direction }));
  };

  return (
    <DataTableRow>
      <DataTableCell rowSpan={"3"} fixed left={"0"} width={"50px"} />
      {itemNumber && (
        <DataTableCell rowSpan={"3"} fixed left={"50px"} width={"50px"} />
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
        width={nameColumnWidth}
        className={classes['org-unit-header-cell']}

        rowSpan={"3"}
      >
        {!nested && (
          <InputField
              dataTest={"org-unit-search"}
            className="print-hide w-100 org-unit-search"
            value={searchValue}
            onChange={({ value }) => setSearchValue(value)}
            placeholder={i18n.t("Search Organisation Unit")}
          />
        )}
        <h4 className="print-show hide">{i18n.t("Organisation Unit(s)")}</h4>
      </DataTableColumnHeader>
      {dataGroups?.map(({ title, id, dataHolders }) => (
        <DataTableCell
          fixed
          className="scorecard-table-header header"
          align="center"
          bordered
          width={`${
            (dataHolders?.length ?? 1) *
            (periods?.length ?? 1) *
            ScorecardTableConstants.CELL_WIDTH
          }px`}
          top={"0"}
          colSpan={`${(dataHolders?.length ?? 1) * (periods?.length ?? 1)}`}
          key={id}
        >
          {title}
        </DataTableCell>
      ))}
      {averageColumn && (
        <DataTableCell
          width={`${ScorecardTableConstants.CELL_WIDTH}px`}
          fixed
          align="center"
          bordered
          className="scorecard-table-header header"
          rowSpan={"3"}
        >
          {i18n.t("Average")}
        </DataTableCell>
      )}
    </DataTableRow>
  );
}

GroupsHeaderRow.propTypes = {
  nested: PropTypes.bool.isRequired,
  orgUnits: PropTypes.array.isRequired,
};
