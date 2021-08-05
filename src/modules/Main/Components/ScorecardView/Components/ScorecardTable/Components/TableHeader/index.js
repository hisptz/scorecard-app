import {DataTableHead} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import GroupsHeaderRow from "./Components/GroupsHeaderRow";
import HoldersHeaderRow from "./Components/HoldersHeaderRow";
import PeriodHeaderRow from "./Components/PeriodHeaderRow";

export default function TableHeader({nested}) {
    return (
        <DataTableHead>
            <GroupsHeaderRow nested={nested} />
            <HoldersHeaderRow/>
            <PeriodHeaderRow/>
        </DataTableHead>
    )
}

TableHeader.propTypes = {
    nested: PropTypes.bool.isRequired
};

