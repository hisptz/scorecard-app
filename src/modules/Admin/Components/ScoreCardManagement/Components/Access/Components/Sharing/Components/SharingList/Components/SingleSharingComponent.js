import {Button, ButtonStrip, colors, MenuItem} from '@dhis2/ui'
import DeleteIcon from '@material-ui/icons/Close';
import EditIcon from "@material-ui/icons/Edit";
import {cloneDeep, set} from 'lodash'
import PropTypes from 'prop-types'
import React, {useState} from 'react'
import ScorecardAccess from "../../../../../../../../../../../core/models/scorecardAccess";
import {getAccessIcon, getAccessName} from "../../../utils";
import SharingMenu from "./SharingMenu";

export default function SingleSharingComponent({access, onDelete, onAccessChange}) {
    const {id, access: selectedAccess, type, displayName} = access;
    const [ref, setRef] = useState()

    const onChange = (newAccess) => {
        const updatedAccess = cloneDeep(access)
        set(updatedAccess, ['access'], newAccess)
        onAccessChange(updatedAccess)
        setRef(undefined)
    }

    return (
        <MenuItem
            icon={getAccessIcon(type)}
            label={
                <div className='row space-between align-items-center'>
                    <div className='column'>
                        <p style={{margin: 2, fontSize: 16}}>{displayName}</p>
                        <p style={{color: colors.grey500, fontSize: 14, margin: 0}}>{getAccessName(selectedAccess)}</p>
                    </div>
                    <div className='column align-items-end'>
                        <ButtonStrip>
                            <Button onClick={(_, e) => setRef(e.currentTarget)} icon={<EditIcon/>}>Edit</Button>
                            {
                                Boolean(onDelete) &&
                                <Button onClick={() => {
                                    onDelete(access)
                                }} destructive icon={<DeleteIcon/>}>Remove</Button>
                            }
                        </ButtonStrip>
                    </div>
                    {ref &&
                    <SharingMenu reference={ref} onClose={() => setRef(undefined)} selectedAccess={selectedAccess}
                                 onAccessChange={onChange}/>}
                </div>}>
        </MenuItem>
    )
}

SingleSharingComponent.propTypes = {
    access: PropTypes.instanceOf(ScorecardAccess).isRequired,
    onAccessChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func
};

