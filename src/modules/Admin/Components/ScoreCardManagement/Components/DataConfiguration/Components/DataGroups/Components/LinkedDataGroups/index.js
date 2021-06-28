import PropTypes from 'prop-types'
import React from 'react'
import {Draggable} from "react-beautiful-dnd";
import LinkedDataSource from "./Components/LinkedDataSource";

export default function LinkedDataGroups({dataSources, id, index}){

    return (
        <Draggable draggableId={id} index={index}>
            {
                provided=>(
                    <div  {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}>
                        <div className='container-bordered p-16'>
                            {
                                dataSources.map((dataGroup, index)=>{
                                    return (
                                        <LinkedDataSource dataSource={dataGroup} key={dataGroup.id} onDelete={()=>{}} index={index}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }
        </Draggable>
    )
}

LinkedDataGroups.propTypes = {
    dataSources: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired
};



