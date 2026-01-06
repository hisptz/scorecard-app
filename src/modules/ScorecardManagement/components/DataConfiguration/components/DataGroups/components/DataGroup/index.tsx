import i18n from "@dhis2/d2-i18n";
import { Button, colors, IconAdd24, IconChevronDown24, IconDragHandle24, Tooltip } from "@dhis2/ui";
import React, { useRef, useState } from "react";
import useDataGroupManage from "../../../../hooks/useDataGroupLayout";
import { Accordion, AccordionDetails, AccordionSummary } from "./components/Accordions";
import GroupTitle from "./components/GroupTitle";
import { isEmpty } from "lodash";
import { LinkingContainer } from "./components/LinkingContainer";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DataSourceSelectorModal from "../DataSourceSelectorModal";

export function DataGroup({
							  index,
							  onRemove
						  }: {
	index: number;
	onRemove: (index: number) => void;
}) {
	const {
		dataHolderChunks,
		expanded,
		toggleExpansion,
		onDelete,
		onLink,
		onUnlink,
		onDragEnd,
		group,
		onDataItemAdd,
		selectedDataItems
	} = useDataGroupManage({ index });
	const { id, dataHolders } = group;
	const [openAdd, setOpenAdd] = useState(false);
	const summaryRef = useRef();

	return (
		<div className="w-100">
			<Draggable draggableId={`${id}`} index={index}>
				{(provided) => {
					return (
						<Accordion
							/*
      						// @ts-expect-error mui accordion issues */
							innerRef={provided.innerRef}
							onDoubleClick={(event) => event.stopPropagation()}
							square
							expanded={expanded}
							onChange={toggleExpansion}
						>
							<Tooltip
								content={i18n.t(
									"Click to {{action}}, drag to rearrange",
									{
										action: expanded
											? i18n.t("collapse")
											: i18n.t("expand")
									}
								)}
							>
								<AccordionSummary
									{...provided.draggableProps}
									{...provided.dragHandleProps}
									/*
      								// @ts-expect-error accordion mui issues */
									innerRef={summaryRef}
									onClick={(event) => event.stopPropagation()}
									expandIcon={
										<IconChevronDown24
											key={"scorecard-group-expand"}
										/>
									}
									aria-controls={`${id}d-content`}
									id={`${id}d--header`}
								>
									<div
										style={{ gap: 8 }}
										className="row align-items-center"
									>
										<IconDragHandle24 />
										<GroupTitle
											index={index}
											onDelete={onRemove}
										/>
									</div>
								</AccordionSummary>
							</Tooltip>
							<AccordionDetails>
								<div className="column data-holders-area">
									{isEmpty(dataHolders) ? (
										<div
											className="column w-100 text-center center"
											style={{ height: 100 }}
										>
											<p
												style={{
													color: colors.grey600
												}}
											>
												{i18n.t("Add a data source")}
											</p>
										</div>
									) : (
										<DragDropContext onDragEnd={onDragEnd}>
											<Droppable droppableId={`${id}`}>
												{(provided) => (
													<div
														className="w-100"
														{...provided.droppableProps}
														ref={provided.innerRef}
													>
														{dataHolderChunks?.map(
															(chunk, i) => (
																<LinkingContainer
																	index={i}
																	groupIndex={
																		index
																	}
																	onDelete={
																		onDelete
																	}
																	onUnlink={
																		onUnlink
																	}
																	onLink={
																		onLink
																	}
																	chunk={
																		chunk
																	}
																	key={`${i}-linking-container-${group?.id}`}
																/>
															)
														)}
														{
															provided.placeholder as React.ReactNode
														}
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
											icon={<IconAdd24 />}
										>
											{i18n.t("Add Item")}
										</Button>
									</div>
								</div>
								{openAdd && (
									<DataSourceSelectorModal
										disabled={selectedDataItems}
										onSelect={onDataItemAdd}
										onClose={() => setOpenAdd(false)}
										open={openAdd}
									/>
								)}
							</AccordionDetails>
						</Accordion>
					);
				}}
			</Draggable>
		</div>
	);
}
