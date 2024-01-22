import {DataTableHead} from "@dhis2/ui";
import PropTypes from "prop-types";
import React, {useMemo} from "react";
import {useRecoilValue} from "recoil";
import GroupsHeaderRow from "./Components/GroupsHeaderRow";
import HoldersHeaderRow from "./Components/HoldersHeaderRow";
import OrgUnitHeaderRow from "./Components/OrgUnitHeaderRow";
import PeriodHeaderRow from "./Components/PeriodHeaderRow";
import {ScorecardTableConfigState} from "../../../../../../state";

function getHeaderRow(type) {
    switch (type) {
        case "groups":
            return GroupsHeaderRow;
        case "data":
            return HoldersHeaderRow;
        case "periods":
            return PeriodHeaderRow;
        case "orgUnits":
            return OrgUnitHeaderRow;
        default:
            return null;
    }
}

export default function TableHeader({orgUnits, nested}) {
    const {columns} = useRecoilValue(ScorecardTableConfigState(orgUnits));
    const headerRows = useMemo(() => columns?.map(getHeaderRow), [columns]);

    return (
        <DataTableHead>
            {headerRows?.map((Row, i) => (
                <Row
                    orgUnits={orgUnits}
                    nested={nested}
                    key={`${columns[i]}-header-row`}
                />
            ))}
        </DataTableHead>
    );
}

TableHeader.propTypes = {
    nested: PropTypes.bool.isRequired,
    orgUnits: PropTypes.arrayOf(PropTypes.object).isRequired,
};
