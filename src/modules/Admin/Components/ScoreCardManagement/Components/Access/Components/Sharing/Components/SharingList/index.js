import {Menu, MenuDivider} from '@dhis2/ui'
import {cloneDeep, remove, set} from 'lodash'
import React, {Fragment} from 'react'
import {useRecoilState} from "recoil";
import {ScorecardStateSelector} from "../../../../../../../../../../core/state/scorecard";
import SingleSharingComponent from "./Components/SingleSharingComponent";




export default function SharingList(){
    const [sharingList, setSharingList] = useRecoilState(ScorecardStateSelector('sharingSettings'))

    const onDelete = (access) =>{
        const updatedList = cloneDeep(sharingList)
        remove(updatedList, ['id', access?.id])
        setSharingList(updatedList)
    }

    const onUpdate = (index) => (updatedAccess)=>{
        const updatedList = cloneDeep(sharingList)
        set(updatedList, [index], updatedAccess)
        setSharingList(updatedList)
    }

    return (
        <div>
            <Menu dense>
                {
                    sharingList?.map((access, index)=>(
                        <Fragment key={access?.userGroup}>
                        <SingleSharingComponent onAccessChange={onUpdate(index)}  access={access} onDelete={onDelete}  />
                        <MenuDivider/>
                        </Fragment>))
                }
            </Menu>

        </div>
    )
}
