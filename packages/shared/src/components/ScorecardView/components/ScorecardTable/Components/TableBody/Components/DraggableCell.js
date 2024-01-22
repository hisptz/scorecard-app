import {colors} from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";
import {useDrag} from "react-dnd";
import {DraggableItems} from "../../../../../../../constants";

export default function DraggableCell({label, type, style, ...props}) {
    const [{isDragging}, dragRef] = useDrag(() => ({
        type,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    return (
        <div
            {...props}
            className="column center"
            style={{
                background: isDragging && colors?.grey400,
                cursor: "move",
                opacity: isDragging ? 0.5 : 1,
                height: "100%",
                width: "100%",
                padding: "0 12px",
                ...style,
            }}
            ref={dragRef}
        >
            {label}
        </div>
    );
}

DraggableCell.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.values(DraggableItems)).isRequired,
    style: PropTypes.object,
};
