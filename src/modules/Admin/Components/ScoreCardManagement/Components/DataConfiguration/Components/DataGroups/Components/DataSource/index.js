import {colors} from '@dhis2/ui'
import {Avatar, IconButton} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types'
import React from 'react'
import {Draggable} from "react-beautiful-dnd";
import {useRecoilState, useRecoilValue} from "recoil";
import {ScorecardEditState, ScorecardStateSelector} from "../../../../../../../../../../core/state/scorecard";
import {getDataSourceShortName} from "../../../../../../../../../../shared/utils/utils";

export default function DataSource({index, onDelete}) {

    const [scorecardEditState, setScorecardEditState] = useRecoilState(ScorecardEditState)
    const {selectedDataSourceIndex} = scorecardEditState || {}
    const path = ['dataSourceGroups', scorecardEditState.selectedGroupIndex, 'dataSources', index]
    const source = useRecoilValue(ScorecardStateSelector(path))
    const {label, type, id} = source || {}
    const selected = selectedDataSourceIndex === index;

    return (
        <Draggable draggableId={id} index={index}>
            {
                provided => (
                    <div  {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}>
                        <div
                            onClick={() => {
                                if (id) {
                                    setScorecardEditState(prevState => ({
                                        ...prevState,
                                        selectedDataSourceIndex: index
                                    }))
                                }
                            }}
                            className='bordered data-source p-8 w-100' style={{background: selected && colors.grey300}}>
                            <div className='row space-between align-items-center'>
                                <div className='row align-items-center '>
                                    <Avatar className='data-source avatar'>{getDataSourceShortName(type)}</Avatar>
                                    <p className='data-source name'>{label} </p>
                                </div>
                                <div>
                                    <IconButton onClick={(event) => {
                                        event.stopPropagation();
                                        onDelete(index)
                                    }} className='data-source close-icon'>
                                        <CloseIcon/>
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </Draggable>
    )
}

DataSource.propTypes = {
    index: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
};
