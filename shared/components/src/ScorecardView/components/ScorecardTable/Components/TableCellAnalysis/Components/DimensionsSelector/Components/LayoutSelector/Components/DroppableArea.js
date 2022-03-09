import { colors } from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";
import { Droppable } from "react-beautiful-dnd";

export default function DroppableArea({ children, type }) {
  return (
    <Droppable droppableId={type}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{
            ...provided?.droppableProps?.style,
            height: "100%",
            width: "100%",
            minHeight: 100,
            border: snapshot.isDragging && `2px dashed ${colors.grey700}`,
          }}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

DroppableArea.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["column", "row", "filter", "series", "category"])
    .isRequired,
};
