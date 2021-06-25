import {DataTable, DataTableBody, DataTableCell, DataTableHead, DataTableRow} from '@dhis2/ui'
import {TableCell, withStyles} from "@material-ui/core";
import {flattenDeep} from 'lodash'
import PropTypes from 'prop-types'
import React, {useMemo} from 'react'
import {useRecoilValue} from "recoil";
import {ScorecardStateSelector} from "../../../../../../../core/state/scorecard";
import {generateRandomValues} from "../../../../../../../shared/utils/utils";
import {getLegend} from "../utils";

const CustomTableCell = withStyles({
    root: {
        borderRight: '1px solid rgb(232, 237, 242)',
        left: 'auto',
        width: 'auto',
        padding: '0 12px',
        fontSize: 14,
        height: 45,
        background: 'rgb(255, 255, 255)',
        color: 'rgb(33, 41, 52)',
        borderBottom: '1px solid rgb(232, 237, 242)'
    },
    '&: last-child': {
        borderBottom: '1px solid transparent'
    }

})(TableCell)


function PreviewCustomCell({config}) {
    const {legendRanges, showColors, id} = config;
    const value = useMemo(generateRandomValues, []);
    const legend = getLegend(value, legendRanges)
    return <CustomTableCell style={{background: `${showColors && legend?.color}`}} align='center' bordered
                            key={`${id}-data`} id={id}>{value}</CustomTableCell>
}

PreviewCustomCell.propTypes = {
    config: PropTypes.object.isRequired
};


export default function PreviewScorecardTable() {
    const dataSourceGroups = useRecoilValue(ScorecardStateSelector('dataSourceGroups'))
    const columns = useMemo(() => [...dataSourceGroups], [dataSourceGroups]);
    return (
        <div className='container column w-100'>
            <DataTable bordered width='100%'>
                <DataTableHead>
                    <DataTableRow>
                        <DataTableCell align='center' className='table-header' bordered rowSpan={"2"}>Organisation
                            Unit</DataTableCell>
                        {
                            columns?.map(column => (
                                <DataTableCell align='center' className='table-header' bordered
                                               colSpan={column?.dataSources?.length}
                                               key={column.id}>{column.title}</DataTableCell>))
                        }
                    </DataTableRow>
                    <DataTableRow>
                        {
                            flattenDeep(columns.map(({dataSources}) => dataSources)).map(({id, label}) => (
                                <DataTableCell className='header-row' bordered key={id}
                                               id={id}>{label}</DataTableCell>))
                        }
                    </DataTableRow>
                </DataTableHead>
                <DataTableBody>
                    <DataTableRow bordered>
                        <DataTableCell tag="th" bordered>
                            Bo
                        </DataTableCell>
                        {
                            flattenDeep(columns.map(({dataSources}) => dataSources)).map((config) => (
                                <PreviewCustomCell key={config.id} config={config} />))
                        }
                    </DataTableRow>
                </DataTableBody>
            </DataTable>
        </div>
    )
}
