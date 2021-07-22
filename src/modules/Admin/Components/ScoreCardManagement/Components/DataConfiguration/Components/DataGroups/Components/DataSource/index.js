import {Avatar, IconButton} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types'
import React from 'react'
import ScorecardIndicator from "../../../../../../../../../../core/models/scorecardIndicator";
import {getDataSourceShortName} from "../../../../../../../../../../shared/utils/utils";


export default function DataSource({dataSource, index, onDelete,}) {
    const {label, type} = dataSource ?? new ScorecardIndicator();
    return (
            <div>
                <div
                    className='container-bordered data-source p-8 w-100'>
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

DataSource.propTypes = {
    dataSource: PropTypes.instanceOf(ScorecardIndicator).isRequired,
    index: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
};
