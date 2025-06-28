import React from "react";
import { useFieldArray } from "react-hook-form";
import { ScorecardConfig, ScorecardDataGroup } from "@hisptz/dhis2-scorecard";
import { isEmpty } from "lodash";
import EmptyDataGroups from "../EmptyDataGroups";
import { uid } from "@hisptz/dhis2-utils";
import i18n from "@dhis2/d2-i18n";
import { Button } from "@dhis2/ui";
import { IconAdd24 } from "@dhis2/ui-icons";
import { DataGroup } from "./components/DataGroup";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

export default function DataGroups() {
	const { fields, append, remove, move } = useFieldArray<
		ScorecardConfig,
		"dataSelection.dataGroups"
	>({
		name: "dataSelection.dataGroups",
	});

	const onGroupAdd = () => {
		append({
			id: uid(),
			dataHolders: [],
			title: `${i18n.t("Default")} ${fields.length + 1}`,
			style: {},
		} as ScorecardDataGroup);
	};

	if (isEmpty(fields)) {
		return <EmptyDataGroups onGroupAdd={onGroupAdd} />;
	}

	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result;
		if (destination) {
			move(source.index, destination.index);
		}
	};

	return (
		// @ts-expect-error react-dnd issues
		<DragDropContext onDragEnd={onDragEnd}>
			{/*
			 // @ts-expect-error react-dnd issues */}
			<Droppable droppableId={"group-area"}>
				{(provided) => {
					return (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							style={{ gap: 24 }}
							className="column"
						>
							<div style={{ flex: 1 }} className="column">
								{fields.map((field, i) => (
									<DataGroup
										onRemove={remove}
										key={field.id}
										index={i}
									/>
								))}
							</div>
							<div style={{ padding: 16 }}>
								<Button
									onClick={onGroupAdd}
									icon={<IconAdd24 />}
								>
									{i18n.t("Add group")}
								</Button>
							</div>
							{provided.placeholder as React.ReactNode}
						</div>
					);
				}}
			</Droppable>
		</DragDropContext>
	);
}
