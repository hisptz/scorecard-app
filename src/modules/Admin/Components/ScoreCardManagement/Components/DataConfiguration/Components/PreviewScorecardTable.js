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
    const {legends, showColors, id} = config?.dataSources?.[0];
    const value = useMemo(generateRandomValues, []);
    const legend = getLegend(value, legends)
    return <CustomTableCell style={{background: `${showColors && legend?.color}`}} align='center' bordered
                            key={`${id}-data`} id={id}>{value}</CustomTableCell>
}

PreviewCustomCell.propTypes = {
    config: PropTypes.object.isRequired
};

export default function PreviewScorecardTable() {
    const {dataGroups} = useRecoilValue(ScorecardStateSelector('dataSelection'))
    const columns = useMemo(() => [...dataGroups], [dataGroups]);
    return (
        <div className='column'>
            <DataTable bordered width='100%'>
                <DataTableHead>
                    <DataTableRow>
                        <DataTableCell align='center' className='table-header' bordered rowSpan={"2"}>Organisation
                            Unit</DataTableCell>
                        {
                            columns?.map(column => (
                                <DataTableCell align='center' className='table-header' bordered
                                               colSpan={column?.dataHolders?.length}
                                               key={column.id}>{column.title}</DataTableCell>))
                        }
                    </DataTableRow>
                    <DataTableRow>
                        {
                            flattenDeep(columns.map(({dataHolders}) => dataHolders)).map(({dataSources}) => (
                                <DataTableCell className='header-row' bordered key={dataSources[0]?.id}
                                               id={dataSources[0]?.id}>{dataSources[0]?.label}</DataTableCell>))
                        }
                    </DataTableRow>
                </DataTableHead>
                <DataTableBody>
                    <DataTableRow bordered>
                        <DataTableCell tag="th" bordered>
                            Bo
                        </DataTableCell>
                        {
                            flattenDeep(columns?.map(({dataHolders}) => dataHolders)).map((config) => (
                                <PreviewCustomCell key={config.id} config={config}/>))
                        }
                    </DataTableRow>
                </DataTableBody>
            </DataTable>
        </div>
    )
}
