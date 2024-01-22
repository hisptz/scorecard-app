import i18n from "@dhis2/d2-i18n";
import {Chip} from "@dhis2/ui";
import {isEmpty} from "lodash";
import PropTypes from "prop-types";
import React from "react";
import {DragDropContext} from "react-beautiful-dnd";
import DraggableItem from "./DraggableItem";
import DroppableArea from "./DroppableArea";
import {updateListFromDragAndDrop, updateListsFromDragAndDrop} from "../../../../../../../../../../../utils";
import {LAYOUTS} from "../../../../../../../../../../../constants";

export default function LayoutSelector({layout, onLayoutChange}) {
    const {column, row, series, category, filter} = layout ?? {};

    const onDrop = ({source, destination}) => {
        try {
            if (!isEmpty(source) && !isEmpty(destination)) {
                if (source?.droppableId === destination?.droppableId) {
                    onLayoutChange((prevLayout) => {
                        const newList = updateListFromDragAndDrop(
                            prevLayout[source.droppableId],
                            source?.index,
                            destination?.index
                        );
                        return {
                            ...prevLayout,
                            [source.droppableId]: newList,
                        };
                    });
                } else {
                    onLayoutChange((prevLayout) => {
                        const sourceList = prevLayout[source.droppableId];
                        const destinationList = prevLayout[destination.droppableId];
                        const {
                            destinationList: newDestinationList,
                            sourceList: newSourceList,
                        } = updateListsFromDragAndDrop(
                            {sourceList, destinationList},
                            {
                                sourceIndex: source?.index,
                                destinationIndex: destination?.index,
                            }
                        );

                        return {
                            ...prevLayout,
                            [source.droppableId]: newSourceList,
                            [destination.droppableId]: newDestinationList,
                        };
                    });
                }
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <DragDropContext onDragEnd={onDrop}>
                <div className="grid-2">
                    <div className="column bordered p-8">
                        <p>{column ? i18n.t("Column") : i18n.t("Series")}</p>
                        <DroppableArea onDrop={onDrop} type={column ? "column" : "series"}>
                            {(column ?? series)?.map((val, index) => (
                                <DraggableItem index={index} key={`${val}`} type={val}>
                                    <Chip icon={LAYOUTS?.[val]?.icon} className={"w-100"}>
                                        {LAYOUTS?.[val]?.displayName}
                                    </Chip>
                                </DraggableItem>
                            ))}
                        </DroppableArea>
                    </div>
                    <div className="column bordered p-8">
                        <p>{row ? i18n.t("Row") : i18n.t("Category")}</p>
                        <DroppableArea onDrop={onDrop} type={row ? "row" : "category"}>
                            {(row ?? category)?.map((val, index) => (
                                <DraggableItem index={index} key={`${val}`} type={val}>
                                    <Chip icon={LAYOUTS?.[val]?.icon} className={"w-100"}>
                                        {LAYOUTS?.[val]?.displayName}
                                    </Chip>
                                </DraggableItem>
                            ))}
                        </DroppableArea>
                    </div>
                    <div className="column bordered p-8">
                        <p>{i18n.t("Filter")}</p>
                        <DroppableArea onDrop={onDrop} type={"filter"}>
                            {filter?.map((val, index) => (
                                <DraggableItem index={index} key={`${val}`} type={val}>
                                    <Chip icon={LAYOUTS?.[val]?.icon} className={"w-100"}>
                                        {LAYOUTS?.[val]?.displayName}
                                    </Chip>
                                </DraggableItem>
                            ))}
                        </DroppableArea>
                    </div>
                </div>
            </DragDropContext>
        </div>
    );
}

LayoutSelector.propTypes = {
    layout: PropTypes.object.isRequired,
    onLayoutChange: PropTypes.func.isRequired,
};
