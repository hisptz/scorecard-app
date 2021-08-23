import {colors} from '@dhis2/ui'
import MaterialErrorIcon from '@material-ui/icons/Error';
import PropTypes from 'prop-types'
import React from 'react'

export default function ErrorIcon({size}) {

    return (
        <MaterialErrorIcon style={{
            color: colors.grey500,
            fontSize: size ?? 24
        }}/>
    )
}

ErrorIcon.propTypes = {
    size: PropTypes.number.isRequired
};
