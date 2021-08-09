import i18n from '@dhis2/d2-i18n'
import {Button, SingleSelectField, SingleSelectOption} from '@dhis2/ui'
import AddIcon from "@material-ui/icons/Add";
import React, {useState} from 'react'
import {useRecoilState} from "recoil";
import ScorecardAccess from "../../../../../../../../../../../core/models/scorecardAccess";
import {ScorecardConfigDirtyState} from "../../../../../../../../../../../core/state/scorecard";
import {ACCESS_TYPES} from "../../../../../../../../../../../shared/constants/sharing";
import {getAccessName} from "../../../utils";
import UserAndUserGroupSelector from "../../UserAndUserGroupSelector";
export default function AddSharingAccess() {
    const [userAccess, setUserAccess] = useRecoilState(ScorecardConfigDirtyState('userAccesses'))
    const [userGroupAccess, setUserGroupAccess] = useRecoilState(ScorecardConfigDirtyState('userGroupAccesses'))
    const [selectedUserGroup, setSelectedUserGroup] = useState();
    const [selectedAccess, setSelectedAccess] = useState();

    const selectedList = [...(userAccess ?? []), ...(userGroupAccess ?? [])]

    const onAdd = () => {
        if (selectedAccess && selectedUserGroup) {
            if (selectedUserGroup?.type === 'user') {
                setUserAccess(prevState => ([
                    ...prevState,
                    new ScorecardAccess({
                        id: selectedUserGroup?.id,
                        displayName: selectedUserGroup?.displayName,
                        type: 'user',
                        access: selectedAccess
                    })
                ]))
            } else {
                setUserGroupAccess(prevState => ([
                    ...prevState,
                    new ScorecardAccess({
                        id: selectedUserGroup?.id,
                        displayName: selectedUserGroup?.displayName,
                        type: 'userGroup',
                        access: selectedAccess
                    })
                ]))
            }
            setSelectedAccess(undefined)
            setSelectedUserGroup(undefined)
        }
    }

    return (
        <div className='row align-items-end'>
            <div className='column pr-16' style={{width: '50%'}}>
                <UserAndUserGroupSelector selectedList={selectedList?.map(({id}) => id)} selected={selectedUserGroup}
                                          onChange={setSelectedUserGroup}/>
            </div>
            <div className='column pr-16' style={{width: '30%'}}>
                <SingleSelectField required selected={selectedAccess} onChange={({selected}) => {
                    setSelectedAccess(selected)
                }} label={i18n.t('Select Access')}>
                    {
                        ACCESS_TYPES?.map(accessType => (<SingleSelectOption value={accessType} key={accessType}
                                                                             label={getAccessName(accessType)}/>))
                    }
                </SingleSelectField>
            </div>
            <div className='column' style={{width: '20%'}}>
                <Button onClick={onAdd} primary icon={<AddIcon/>}>{i18n.t('Add')}</Button>
            </div>
        </div>
    )
}
