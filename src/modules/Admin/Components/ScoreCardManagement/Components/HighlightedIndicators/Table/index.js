import {
    Button,
    DataTable,
    DataTableCell,
    DataTableColumnHeader,
    DataTableHead,
    DataTableRow,
    TableBody
} from '@dhis2/ui'
import DeleteIcon from "@material-ui/icons/Close";
import {cloneDeep, get, isEmpty, remove} from 'lodash'
import React from 'react'
import {useRecoilState} from "recoil";
import {ScorecardEditState, ScorecardStateSelector} from "../../../../../../../core/state/scorecard";


const columns = [
    {
        label: 'Name',
        path: 'displayName'
    },
    {
        label: 'Label',
        path: 'label'
    },
]

export default function HighlightedIndicatorsTable() {
    const [highlightedIndicators, setHighlightedIndicators] = useRecoilState(ScorecardStateSelector('highlightedIndicators'))
    const [scorecardEditState, setScorecardEditorState] = useRecoilState(ScorecardEditState)


    const onRowClick = (index) => {
        setScorecardEditorState(prevState => ({
            ...prevState,
            selectedHighlightedIndicatorIndex: index
        }))
    }

    const onRemove = (id) => {
        const updatedList = cloneDeep(highlightedIndicators)
        remove(updatedList, ['id', id])
        setHighlightedIndicators(updatedList)
    }

    return (!isEmpty(highlightedIndicators) ?
            <DataTable>
                <DataTableHead>
                    <DataTableRow>
                        {
                            columns?.map(({label, path}) => (
                                <DataTableColumnHeader key={`${path}-column`}>{label}</DataTableColumnHeader>))
                        }
                        <DataTableColumnHeader/>
                    </DataTableRow>
                </DataTableHead>
                <TableBody>
                    {
                        highlightedIndicators?.map((data, index) => (
                            <DataTableRow selected={scorecardEditState?.selectedHighlightedIndicatorIndex === index}
                                          key={`${data?.id}`}>
                                {
                                    columns?.map(({path}) => (<DataTableCell onClick={() => onRowClick(index)}
                                                                             key={`${data?.id}-${path}`}>{get(data, path)}</DataTableCell>))
                                }
                                <DataTableCell align='center'>
                                    <Button destructive onClick={() => onRemove(data?.id)}
                                            icon={<DeleteIcon/>}>Remove</Button>
                                </DataTableCell>
                            </DataTableRow>))
                    }
                </TableBody>
            </DataTable> : null
    )
}




