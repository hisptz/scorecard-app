import i18n from "@dhis2/d2-i18n";
import {Button, colors, Tooltip} from "@dhis2/ui";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {ScorecardIndicatorGroup} from "@scorecard/shared";
import {isEmpty,} from "lodash";
import PropTypes from "prop-types";
import React, {forwardRef, useRef, useState} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import useDataGroupLayout from "../../../../hooks/useDataGroupLayout";
import useDataGroupManage from "../../../../hooks/useDataGroupManage";
import useDataHolders from "../../../../hooks/useDataHolders";
import DataSourceSelectorModal from "../DataSourceSelectorModal";
import {Accordion, AccordionDetails, AccordionSummary,} from "./Components/Accordions";
import EditTitle from "./Components/EditTitle";
import GroupTitle from "./Components/GroupTitle";
import LinkingContainer from "./Components/LinkingContainer";

function DataGroup({
                       handleAccordionChange,
                       expanded,
                       index,
                       onDelete,
                       error,
                   }, ref) {

    const {
        onDataSourceDelete,
        onDataSourceAdd,
        onTitleEditSubmit,
        titleEditValue,
        titleEditOpen, setTitleEditOpen, setTitleEditValue, group,
    } = useDataGroupManage({index, expanded})

    const {
        onLink,
        onUnlink,
        onDragEnd,
        onExpand
    } = useDataGroupLayout({handleAccordionChange, index});

    const {
        dataHolderChunks,
        selectedDataSourcesIds
    } = useDataHolders({index})

    const {title, id, dataHolders} = group ?? new ScorecardIndicatorGroup();
    const [openAdd, setOpenAdd] = useState(false);
    const summaryRef = useRef();

    return (
        <Draggable ref={ref} index={index} draggableId={id}>
            {(provided) => (
                <Accordion
                    innerRef={provided.innerRef}
                    onDoubleClick={(event) => event.stopPropagation()}
                    expandIcon={<ExpandMoreIcon/>}
                    square
                    expanded={expanded === id}
                    onChange={onExpand}
                >
                    <Tooltip
                        content={i18n.t("Click to {{action}}, drag to rearrange", {
                            action: expanded === id ? i18n.t("collapse") : i18n.t("expand"),
                        })}
                    >
                        <AccordionSummary
                            innerRef={summaryRef}
                            onClick={(event) => event.stopPropagation()}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            expandIcon={
                                <ExpandMoreIcon
                                    className="expand-group-icon"
                                    dataTest="scorecard-group-expand"
                                />
                            }
                            aria-controls={`${id}d-content`}
                            id={`${id}d--header`}
                            dataTest="scorecard-group-item"
                        >
                            {titleEditOpen ? (
                                <EditTitle
                                    onTitleEditSubmit={onTitleEditSubmit}
                                    titleEditValue={titleEditValue}
                                    onClose={setTitleEditOpen}
                                    title={title}
                                    setTitleEditValue={setTitleEditValue}
                                />
                            ) : (
                                <GroupTitle
                                    title={title}
                                    onDelete={onDelete}
                                    setTitleEditOpen={setTitleEditOpen}
                                    id={id}
                                    error={error}
                                />
                            )}
                        </AccordionSummary>
                    </Tooltip>
                    <AccordionDetails>
                        <div className="column data-holders-area">
                            {isEmpty(dataHolders) ? (
                                <div
                                    className="column w-100 text-center center"
                                    style={{height: 100}}
                                >
                                    <p style={{color: colors.grey600}}>
                                        {i18n.t("Add a data source")}
                                    </p>
                                </div>
                            ) : (
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <Droppable droppableId={`${id}`}>
                                        {(provided) => (
                                            <div
                                                className="w-100 "
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                            >
                                                {dataHolderChunks?.map((chunk, i) => (
                                                    <LinkingContainer
                                                        dataHolders={dataHolders}
                                                        onUnlink={onUnlink}
                                                        onLink={onLink}
                                                        chunk={chunk}
                                                        chunkIndex={i}
                                                        onDataSourceDelete={onDataSourceDelete}
                                                        key={`${i}-linking-container-${group?.id}`}
                                                    />
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            )}
                            <div>
                                <Button
                                    className="scorecard-indicator-add"
                                    dataTest="scorecard-indicator-add"
                                    onClick={() => setOpenAdd(true)}
                                    icon={<AddIcon/>}
                                >
                                    {i18n.t("Add Item")}
                                </Button>
                            </div>
                        </div>
                        {openAdd && (
                            <DataSourceSelectorModal
                                disabled={selectedDataSourcesIds}
                                onSelect={onDataSourceAdd}
                                onClose={() => setOpenAdd(false)}
                                open={openAdd}
                            />
                        )}
                    </AccordionDetails>
                </Accordion>
            )}
        </Draggable>
    );
}

export default forwardRef(DataGroup)

DataGroup.propTypes = {
    index: PropTypes.number.isRequired,
    error: PropTypes.object,
    expanded: PropTypes.string,
    handleAccordionChange: PropTypes.func,
    onDelete: PropTypes.func,
};
