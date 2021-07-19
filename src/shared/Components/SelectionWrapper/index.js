import i18n from '@dhis2/d2-i18n'
import {Box} from '@dhis2/ui';
import PropTypes from 'prop-types';
import React from 'react'
import {FilterComponentTypes} from '../../../core/constants/selection';

export default function SelectionWrapper({
                                     type,
                                     onClick,
                                     dataObj,
                                     periodItems, ...props
                                 }) {
    const componentTypes = {
        [FilterComponentTypes.ORG_UNIT]: {
            text: i18n.t('Selected organisation unit'),
            data: dataObj ? dataObj : null,
        },
        [FilterComponentTypes.PERIOD]: {
            text: i18n.t('Selected period'),
            data: dataObj ? dataObj : null,
        },
    };
    const selectDataObj = componentTypes[type] || null;
    const selectText =
        selectDataObj && selectDataObj.text ? selectDataObj.text : '';

    return (
        <Box
            className='selection-box'
            component="div"
            borderRadius="8px"
            height="6em"
            width="25rem"
            bgcolor="#EEEEEE"
            padding="1em"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            onClick={onClick}
            {...props}
        >
            <p className='selection-box-header'>{selectText}</p>
            <Box
                className='selection-text-box'
                component="div"
                marginTop="auto"
                borderLeft="4px solid #28468B"
                marginBottom="auto"
                marginLeft="0.5em"
                width="80%"
                height="40%"
                display="flex"
                flexDirection="row"
                paddingLeft="0.5em"
                textAlign="center"
            >
                <p style={{marginTop: 'auto', marginBottom: 'auto', fontSize: '0.9em'}}>
                    {type === FilterComponentTypes.ORG_UNIT &&
                    selectDataObj?.data?.displayName}
                    {type === FilterComponentTypes.PERIOD &&
                    periodItems?.name}
                </p>
            </Box>
        </Box>
    );
}


SelectionWrapper.defaultProps = {
    type: '',
    name: '',
};

SelectionWrapper.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf([FilterComponentTypes.PERIOD, FilterComponentTypes.ORG_UNIT]).isRequired,
    onClick: PropTypes.func.isRequired,
    dataObj: PropTypes.object,
    periodItems: PropTypes.object
};
