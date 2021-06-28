import {useDataQuery} from "@dhis2/app-runtime";
import {Button, SingleSelectField, SingleSelectOption} from '@dhis2/ui'
import AddIcon from "@material-ui/icons/Add";
import {find} from 'lodash'
import React, {useState} from 'react'
import {useSetRecoilState} from "recoil";
import {ScorecardStateSelector} from "../../../../../../../../../../../core/state/scorecard";
import {ACCESS_TYPES} from "../../../../../../../../../../../shared/constants/sharing";
import {uid} from "../../../../../../../../../../../shared/utils/utils";


const userGroupsQuery = {
    groups: {
        resource: 'userGroups',
        params: {
            fields: [
                'id',
                'name',
                'displayName'
            ],
            order: 'name:asc'
        }
    }
}



export default function AddSharingAccess() {
    const setSharingSettings = useSetRecoilState(ScorecardStateSelector('sharingSettings'))
    const {data, error, loading} = useDataQuery(userGroupsQuery)
    const [selectedUserGroup, setSelectedUserGroup] = useState();
    const [selectedAccess, setSelectedAccess] = useState();

    const userGroups = data?.groups?.userGroups;

    const onAdd = () => {
        if (selectedAccess && selectedUserGroup) {
            setSharingSettings(prevState => [
                ...(prevState || []),
                {
                    id: uid(),
                    userGroup: find(userGroups, ['id', selectedUserGroup]),
                    access: selectedAccess
                }
            ])
            setSelectedAccess(undefined)
            setSelectedUserGroup(undefined)
        }
    }

    return (
        <div className='row align-items-end'>
            <div className='column' style={{width: '50%'}}>
                <SingleSelectField
                    required
                    selected={selectedUserGroup}
                    onChange={({selected}) => {
                        setSelectedUserGroup(selected)
                    }}
                    filterable
                    label='Select User Group'
                    loading={loading}
                    error={error}
                    validationText={error?.message}>
                    {
                        userGroups?.map(({displayName, id}) => (
                            <SingleSelectOption value={id} key={id} label={displayName}/>))
                    }
                </SingleSelectField>
            </div>
            <div className='column' style={{width: '30%'}}>
                <SingleSelectField required selected={selectedAccess} onChange={({selected}) => {
                    setSelectedAccess(selected)
                }} label='Select Access'>
                    {
                        ACCESS_TYPES?.map(({id, label})=>(<SingleSelectOption value={id} key={id} label={label} />))
                    }
                </SingleSelectField>
            </div>
            <div className='column' style={{width: '20%'}}>
                <Button onClick={onAdd} primary icon={<AddIcon/>}>Add</Button>
            </div>
        </div>
    )
}
