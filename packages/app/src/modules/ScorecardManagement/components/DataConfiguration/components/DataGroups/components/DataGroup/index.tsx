import i18n from "@dhis2/d2-i18n";
import { Button, colors, Tooltip } from "@dhis2/ui";
import { IconAdd24, IconChevronDown24 } from "@dhis2/ui-icons";
import React, { useRef, useState } from "react";
import useDataGroupLayout from "../../../../hooks/useDataGroupLayout";
import useDataGroupManage from "../../../../hooks/useDataGroupManage";
import { Accordion, AccordionDetails, AccordionSummary } from "./components/Accordions";
import GroupTitle from "./components/GroupTitle";
import { DataGroupDraggable } from "./components/DataGroupDraggable";
import { isEmpty } from "lodash";
import { LinkingContainer } from "./components/LinkingContainer";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export function DataGroup(
	{ index, onRemove }: { index: number, onRemove: (index: number) => void }
) {
	const {
		onDataSourceDelete,
		onDataSourceAdd,
		group
	} = useDataGroupManage({ index });

	const { dataHolderChunks, expanded, toggleExpansion, remove, onLink, onUnlink, onDragEnd } = useDataGroupLayout({ index });

	const { id, dataHolders } = group;
	const [openAdd, setOpenAdd] = useState(false);
	const summaryRef = useRef();


	return (
		<DataGroupDraggable id={id}>
			<Accordion
				onDoubleClick={(event) => event.stopPropagation()}
				square
				expanded={expanded}
				onChange={toggleExpansion}
			>
				<Tooltip
					content={i18n.t(
						"Click to {{action}}, drag to rearrange",
						{
							action:
								expanded === id
									? i18n.t("collapse")
									: i18n.t("expand")
						}
					)}
				>
					<AccordionSummary
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
						<GroupTitle
							index={index}
							onDelete={onRemove}
						/>
					</AccordionSummary>
				</Tooltip>
				<AccordionDetails>
					<div className="column data-holders-area">
						{isEmpty(dataHolders) ? (
							<div
								className="column w-100 text-center center"
								style={{ height: 100 }}
							>
								<p style={{ color: colors.grey600 }}>
									{i18n.t("Add a data source")}
								</p>
							</div>
						) : (
							<DragDropContext onDragEnd={onDragEnd}>
								<Droppable droppableId={`${id}`}>
									{(provided: any) => (
										<div
											className="w-100 "
											{...provided.droppableProps}
											ref={provided.innerRef}
										>
											{dataHolderChunks?.map(
												(chunk, i) => (
													<LinkingContainer
														groupIndex={index}
														onDelete={remove}
														onUnlink={onUnlink}
														onLink={onLink}
														chunk={chunk}
														key={`${i}-linking-container-${group?.id}`}
													/>
												)
											)}
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
								icon={<IconAdd24 />}
							>
								{i18n.t("Add Item")}
							</Button>
						</div>
					</div>
					{/*{openAdd && (*/}
					{/*	<DataSourceSelectorModal*/}
					{/*		disabled={selectedDataSourcesIds}*/}
					{/*		onSelect={onDataSourceAdd}*/}
					{/*		onClose={() => setOpenAdd(false)}*/}
					{/*		open={openAdd}*/}
					{/*	/>*/}
					{/*)}*/}
				</AccordionDetails>
			</Accordion>
		</DataGroupDraggable>
	);
}
