import {Menu, MenuDivider} from '@dhis2/ui'
import {cloneDeep, remove, set} from 'lodash'
import React, {Fragment, useMemo} from 'react'
import {useRecoilState} from "recoil";
import {ScorecardConfigDirtyState} from "../../../../../../../../../../core/state/scorecard";
import SingleSharingComponent from "./Components/SingleSharingComponent";


export default function SharingList() {
    const [publicAccess, setPublicAccess] = useRecoilState(ScorecardConfigDirtyState('publicAccess'))
    const [userGroupAccesses, setUserGroupAccesses] = useRecoilState(ScorecardConfigDirtyState('userGroupAccesses'))
    const [userAccesses, setUserAccesses] = useRecoilState(ScorecardConfigDirtyState('userAccesses'))

    const userAndUserGroupAccesses = useMemo(() => [...(userAccesses || []), ...(userGroupAccesses || [])], [userAccesses, userGroupAccesses]);

    const onPublicAccessChange = (value) =>{
        setPublicAccess(value)
    }

    const onDelete = (access) => {
        const {type} = access ||{}
        if(type === 'user'){
            const updatedList = cloneDeep(userAccesses)
            remove(updatedList, ['id', access?.id])
            setUserAccesses(updatedList)
            return;
        }
        const updatedList = cloneDeep(userGroupAccesses)
        remove(updatedList, ['id', access?.id])
        setUserGroupAccesses(updatedList)

    }

    const onUpdate = (index) => (updatedAccess) => {
        const {type} = updatedAccess || {};
        if(type === 'user'){
            const updatedUserAccesses = cloneDeep(userAccesses);
            set(updatedUserAccesses, [index], updatedAccess)
            setUserAccesses(updatedAccess)
            return;
        }
        const updatedUserGroupAccesses = cloneDeep(userGroupAccesses);
        set(updatedUserGroupAccesses, [index], updatedAccess)
        setUserGroupAccesses(updatedAccess)
    }

    return (
        <div>
            <Menu dense>
                <SingleSharingComponent onAccessChange={onPublicAccessChange} access={publicAccess}
                                        />
                <MenuDivider/>
                {
                    userAndUserGroupAccesses?.map((access, index) => (
                        <Fragment key={access?.id}>
                            <SingleSharingComponent onAccessChange={onUpdate(index)} access={access}
                                                    onDelete={onDelete}/>
                            <MenuDivider/>
                        </Fragment>))
                }
            </Menu>

        </div>
    )
}
