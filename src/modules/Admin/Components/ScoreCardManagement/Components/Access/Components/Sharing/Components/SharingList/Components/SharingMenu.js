import {FlyoutMenu, Layer, MenuItem, Popper} from "@dhis2/ui";
import CheckIcon from '@material-ui/icons/Check';
import PropTypes from 'prop-types'
import React, {Fragment} from 'react'
import {ACCESS_TYPES} from "../../../../../../../../../../../shared/constants/sharing";

export default function SharingMenu({reference, onClose, selectedAccessId, onAccessChange}) {


    return (
        <Layer onClick={onClose}>
            <Popper reference={reference} placement='bottom-start'>
                <FlyoutMenu>
                    {
                        ACCESS_TYPES?.map(({label, id}) => (
                            <Fragment key={id}>
                                <MenuItem onClick={()=>onAccessChange(id)} active={selectedAccessId === id} label={label}
                                          icon={selectedAccessId === id && <CheckIcon/>}/>
                            </Fragment>
                        ))
                    }
                </FlyoutMenu>
            </Popper>
        </Layer>
    )
}

SharingMenu.propTypes = {
    reference: PropTypes.object.isRequired,
    selectedAccessId: PropTypes.string.isRequired,
    onAccessChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};



