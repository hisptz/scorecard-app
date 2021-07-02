import React from 'react'
import SharingList from "./Components/SharingList";
import AddSharingAccess from "./Components/SharingList/Components/AddSharingAccess";

export default function Sharing() {
    return (
        <div className='p-16 pl-32'>
            <div><h3>Sharing</h3></div>
            <div>
                <p style={{fontSize: 18}}>Shared With</p>
            </div>
            <div>
                <SharingList/>
            </div>
            <div className='pt-32'>
                <p style={{fontSize: 18}}>Add Access</p>
            </div>
            <div >
                <AddSharingAccess/>
            </div>
        </div>
    )
}
