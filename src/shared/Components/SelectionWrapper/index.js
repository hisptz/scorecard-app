import i18n from '@dhis2/d2-i18n'
import {Box, Chip} from '@dhis2/ui';
import PropTypes from 'prop-types';
import React from 'react'
import {FilterComponentTypes} from '../../../core/constants/selection';

export default function SelectionWrapper({
                                             type,
                                             onClick,
                                             selectedItems = [],
                                             ...props
                                         }) {

    const selectText = type === FilterComponentTypes.PERIOD ? i18n.t('Selected period') : i18n.t('Selected organisation unit')


    return (
        <div onClick={onClick}>
            <Box
                className='selection-box'
                {...props}
            >
                <p className='selection-box-header'>{selectText}</p>
                <Box
                    className='selection-text-box'
                    width="90%"
                    height="40%"
                >
                    {
                        selectedItems?.map(({name, displayName, id})=>(
                            <Chip key={id}>
                                {name ?? displayName}
                            </Chip>
                        ))
                    }

                </Box>
            </Box>
        </div>
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
    selectedItems: PropTypes.array,
};
