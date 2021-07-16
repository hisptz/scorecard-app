import {Button, ButtonStrip, Modal, ModalActions, ModalContent, ModalTitle} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

export default function DeleteConfirmation({onConfirm, onCancel, text, component}) {

    return (
        <Modal onClose={onCancel}>
            <ModalTitle>Delete Confirmation</ModalTitle>
            <ModalContent>
                {
                    component ? component : text ? text : 'Are you sure you want to delete this entity?'
                }
            </ModalContent>
            <ModalActions>
                <ButtonStrip>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button destructive onClick={onConfirm}>Delete</Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    )
}

DeleteConfirmation.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    component: PropTypes.node,
    text: PropTypes.string,
};
