import React from 'react'



export default function Instructions (){


    return(
        <div className='column' style={{height: '100%' }}>
            <div className='row center' >
                    <div className='info-box'>
                        <div className='column'>
                            <h2 className='info-box-title'>Getting Started</h2>
                            <ul className='info-box-list'>
                                <li>Add a data source group</li>
                                <li>Modify the group name </li>
                                <li>Add different data sources to a group</li>
                                <li>Click on a data source to configure it</li>
                                <li>View the changes on the preview panel above</li>
                            </ul>
                        </div>
                    </div>
            </div>
        </div>
    )
}
