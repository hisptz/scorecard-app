import PropTypes from "prop-types";
import React from "react";
import {Draggable} from "react-beautiful-dnd";
import {DraggableItems} from "../../../../../../../../../../../constants";

export default function DraggableItem({children, type, index}) {
    return (
        <Draggable draggableId={type} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        ...provided?.draggableProps?.style,
                        cursor: "move",
                    }}
                >
                    {children}
                </div>
            )}
        </Draggable>
    );
}

DraggableItem.propTypes = {
    children: PropTypes.node.isRequired,
    index: PropTypes.number.isRequired,
    type: PropTypes.oneOf([
        DraggableItems.OU_LAYOUT,
        DraggableItems.DX_LAYOUT,
        DraggableItems.PE_LAYOUT,
    ]).isRequired,
};
