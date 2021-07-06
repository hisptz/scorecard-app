import {cell} from "@dhis2/analytics/build/cjs/components/PivotTable/styles/PivotTable.style";
import {DataTable, DataTableBody, DataTableCell, DataTableHead, DataTableRow} from '@dhis2/ui'
import {flattenDeep} from 'lodash'
import PropTypes from 'prop-types'
import React, {useMemo, useRef} from 'react'
import {useRecoilValue} from "recoil";
import {ScorecardStateSelector} from "../../../../../../../core/state/scorecard";
import {generateRandomValues} from "../../../../../../../shared/utils/utils";
import {getLegend} from "../utils";


function LinkedScoreSvg({width, height, top, bottom, topColor, bottomColor}) {

    return (
        <svg>
            <polygon points={`0,0 0,${height} ${width},${height}`} style={{fill: bottomColor}}/>
            <text x={`${width - 30}`} y={`${(height / 2) - 7}`} fill="rgb(33, 41, 52)" fontSize="14px">{bottom}</text>
            <polygon points={`0,0 ${width},0 ${width},${height}`} style={{fill: topColor}}/>
            <text x="378" y="122" fill="red" fontSize="14px">{top}</text>
        </svg>
    )
}

function CustomLinkedCustomCell({top, bottom}) {

    const cellRef = useRef()
    const {legends: topLegends, showColors: topShowColors, id: topId} = top;
    const {legends: bottomLegends, showColors: bottomShowColors, id: bottomId} = bottom;
    const topValue = useMemo(generateRandomValues, []);
    const bottomValue = useMemo(generateRandomValues, []);
    const topLegend = getLegend(topValue, topLegends)
    const bottomLegend = getLegend(bottomValue, bottomLegends)
    return (
        <td ref={cellRef} className='linked-table-cell data-cell'>
           <div className='row space-between' style={{height: '100%'}}>
               <div className='column' style={{justifyContent: 'flex-start',alignItems: 'flex-start', paddingLeft: 16, paddingTop: 4}}>{topValue}</div>
               <div className='column' style={{justifyContent: 'flex-end', alignItems: 'flex-end', paddingRight: 16, paddingBottom: 4}} >{bottomValue}</div>
           </div>
        </td>
    )
}


function PreviewCustomCell({config}) {
    const hasLinked = config?.dataSources.length > 1;
    const [bottom, top] = config?.dataSources ?? [];
    const {legends, showColors, id} = bottom ?? {};
    const value = useMemo(generateRandomValues, []);
    const legend = getLegend(value, legends)
    return hasLinked ? <CustomLinkedCustomCell bottom={bottom} top={top}/> :
        <td className='data-cell' style={{background: `${showColors && legend?.color}`}} align='center'
            key={`${id}-data`} id={id}>{value}</td>
}

PreviewCustomCell.propTypes = {
    config: PropTypes.object.isRequired
};

export default function PreviewScorecardTable() {
    const {dataGroups} = useRecoilValue(ScorecardStateSelector('dataSelection'))
    const columns = useMemo(() => [...dataGroups], [dataGroups]);
    return (
        <div className='column' style={{width: '100%', overflowX: 'auto'}}>
            <DataTable bordered width={"100%"}>
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
                                               id={dataSources[0]?.id}>{dataSources[0]?.label} {dataSources.length > 1 && `/${dataSources?.[1]?.label}`}</DataTableCell>))
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
