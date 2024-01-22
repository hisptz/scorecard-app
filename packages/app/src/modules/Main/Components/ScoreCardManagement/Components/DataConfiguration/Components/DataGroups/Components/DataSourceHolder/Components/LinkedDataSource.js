import {colors} from "@dhis2/ui";
import {getDataSourceShortName} from "@scorecard/shared";
import {Avatar, IconButton} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import React from "react";
import {Draggable} from "react-beautiful-dnd";

export default function LinkedDataSource({index, onDelete, dataSource}) {
    const {label, type, id} = dataSource || {};
    const selected = false;

    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <div
                        onClick={() => {
                        }}
                        className="container-bordered data-source p-8 w-100"
                        style={{background: selected && colors.grey300}}
                    >
                        <div className="row space-between align-items-center">
                            <div className="row align-items-center ">
                                <Avatar className="data-source avatar">
                                    {getDataSourceShortName(type)}
                                </Avatar>
                                <p className="data-source name">{label} </p>
                            </div>
                            <div>
                                <IconButton
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        onDelete(index);
                                    }}
                                    className="data-source close-icon"
                                >
                                    <CloseIcon/>
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
}

LinkedDataSource.propTypes = {
    dataSource: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
};
