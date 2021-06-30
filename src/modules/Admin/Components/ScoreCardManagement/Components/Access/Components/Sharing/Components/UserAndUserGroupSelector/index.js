import {FlyoutMenu, InputField, MenuItem, Popper} from '@dhis2/ui'
import {debounce} from "lodash";
import PropTypes from 'prop-types'
import React, {Fragment, useRef, useState} from 'react'
import {getAccessIcon} from "../../utils";
import useSearchUserAndUserGroup from "./hooks/useSearch";


function UserAndUserGroupsMenu({data, onSelect, reference, onClose}) {
    console.log(reference)

    const onSelectElement = (selected) => {
        onSelect(selected)
        onClose()
    }

    return (
        reference ?
            <Popper reference={reference} placement='bottom-start'>
                <FlyoutMenu maxHeight="400px">
                    {
                        data?.map((element) => (
                            <MenuItem key={element?.id} onClick={() => onSelectElement(element)}
                                      label={element?.displayName}
                                      icon={getAccessIcon(element?.type)}/>
                        ))
                    }
                </FlyoutMenu>
            </Popper>
            : null
    )
}

UserAndUserGroupsMenu.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    reference: PropTypes.any.isRequired,
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
};


export default function UserAndUserGroupSelector({selected, onChange}) {
    const [value, setValue] = useState(selected?.displayName);
    const {data, loading, error, setKeyword} = useSearchUserAndUserGroup(value)
    const reference = useRef()
    const [inputReference, setInputReference] = useState();

    const onSearch = debounce(() => {
        setKeyword(value?.trim())
    }, 1000)

    const onKeywordChange = ({value: keyword}, event) => {
        setValue(keyword)
        setInputReference(event?.target)
        onSearch()
    }

    const onValueSelect = (selectedValue) => {
        setValue(selectedValue?.displayName)
        onChange(selectedValue)
    }

    return (
        <Fragment>
            <div ref={reference}>
                <InputField loading={loading} error={error} validationText={error?.message}
                            label='Select User or User Group' value={value} onChange={onKeywordChange}/>
            </div>
            {
                (inputReference && data) &&
                <UserAndUserGroupsMenu onClose={() => setInputReference(undefined)} reference={inputReference}
                                       onSelect={onValueSelect} data={data}/>
            }
        </Fragment>
    )
}

UserAndUserGroupSelector.propTypes = {
    onChange: PropTypes.func.isRequired,
    selected: PropTypes.object,
};

