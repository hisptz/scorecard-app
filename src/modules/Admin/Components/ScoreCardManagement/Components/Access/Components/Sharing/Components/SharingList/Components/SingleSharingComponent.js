import {Button, ButtonStrip, colors, MenuItem} from '@dhis2/ui'
import DeleteIcon from '@material-ui/icons/Close';
import EditIcon from "@material-ui/icons/Edit";
import ShareIcon from '@material-ui/icons/Share';
import {cloneDeep, find, set} from 'lodash'
import PropTypes from 'prop-types'
import React, {useState} from 'react'
import {ACCESS_TYPES} from "../../../../../../../../../../../shared/constants/sharing";
import SharingMenu from "./SharingMenu";

export default function SingleSharingComponent({access, onDelete, onAccessChange}) {
    const {userGroup, access: selectedAccessId} = access;
    const selectedAccess = find(ACCESS_TYPES, ['id', selectedAccessId])
    const [ref, setRef] = useState()

    const onChange = (id) => {
        const updatedAccess = cloneDeep(access)
        set(updatedAccess, ['access'], id)
        onAccessChange(updatedAccess)
        setRef(undefined)
    }

    return (
        <MenuItem
            icon={<ShareIcon/>}
            label={
                <div className='row space-between align-items-center'>
                    <div className='column'>
                        <p style={{margin: 2, fontSize: 16}}>{userGroup?.displayName}</p>
                        <p style={{color: colors.grey500, fontSize: 14, margin: 0}}>{selectedAccess?.label}</p>
                    </div>
                    <div className='column align-items-end'>
                        <ButtonStrip>
                            <Button onClick={(_, e) => setRef(e.currentTarget)} icon={<EditIcon/>}>Edit</Button>
                            <Button onClick={() => {
                                onDelete(access)
                            }} destructive icon={<DeleteIcon/>}>Remove</Button>
                        </ButtonStrip>
                    </div>
                    {ref &&
                    <SharingMenu reference={ref} onClose={() => setRef(undefined)} selectedAccessId={selectedAccessId}
                                 onAccessChange={onChange}/>}
                </div>}>
        </MenuItem>
    )
}

SingleSharingComponent.propTypes = {
    access: PropTypes.object.isRequired,
    onAccessChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

