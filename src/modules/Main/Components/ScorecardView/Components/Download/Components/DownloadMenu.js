import i18n from '@dhis2/d2-i18n'
import {FlyoutMenu, Layer, MenuItem, Popper} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import {DownloadTypes} from "../../../../../../../core/constants/download";

export default function DownloadMenu({reference, onClose, onDownload}) {

    return (
        <Layer onClick={onClose}>
            <Popper reference={reference} placement="bottom-start">
                <FlyoutMenu>
                    {
                        Object.values(DownloadTypes)?.map(type => <MenuItem onClick={() => {
                            onDownload(type)
                            onClose()
                        }}
                                                                            key={`${type}-download-menu`}
                                                                            label={type}/>)
                    }
                    <MenuItem label={'ALMA'}>
                        <MenuItem label={`${i18n.t('Data')}(JSON)`} onClick={() => {
                            onDownload('ALMAData')
                            onClose()
                        }}/>
                        <MenuItem label={i18n.t('Metadata')} onClick={() => {
                            onDownload('ALMAMeta')
                            onClose()
                        }}/>
                    </MenuItem>
                </FlyoutMenu>
            </Popper>
        </Layer>
    )
}

DownloadMenu.propTypes = {
    reference: PropTypes.any.isRequired,
    onClose: PropTypes.func.isRequired,
    onDownload: PropTypes.func.isRequired
};
