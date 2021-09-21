import i18n from '@dhis2/d2-i18n'
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
import React, {Fragment} from 'react'
import {useRecoilState} from "recoil";
import {HIGHLIGHTED_TABLE_HELP_STEPS} from "../../../../../../../core/constants/help/scorecardManagement";
import {ScorecardConfigDirtyState, ScorecardConfigEditState} from "../../../../../../../core/state/scorecard";
import Help from "../../Help";

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
    const [highlightedIndicators, setHighlightedIndicators] = useRecoilState(ScorecardConfigDirtyState('highlightedIndicators'))
    const [scorecardEditState, setScorecardEditorState] = useRecoilState(ScorecardConfigEditState)


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
            <Fragment>
                <Help helpSteps={HIGHLIGHTED_TABLE_HELP_STEPS}/>
                <DataTable className='highlighted-indicator-table'>
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
                                <DataTableRow className="highlighted-indicator-row"
                                              selected={scorecardEditState?.selectedHighlightedIndicatorIndex === index}
                                              key={`${data?.id}`}>
                                    {
                                        columns?.map(({path}) => (<DataTableCell onClick={() => onRowClick(index)}
                                                                                 key={`${data?.id}-${path}`}>{get(data, path)}</DataTableCell>))
                                    }
                                    <DataTableCell align='center'>
                                        <Button className='highlighted-indicator-delete' destructive
                                                onClick={() => onRemove(data?.id)}
                                                icon={<DeleteIcon/>}>{i18n.t('Remove')}</Button>
                                    </DataTableCell>
                                </DataTableRow>))
                        }
                    </TableBody>
                </DataTable>
            </Fragment> : null
    )
}




