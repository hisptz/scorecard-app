import { colors } from "@dhis2/ui";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import DataSource from "../DataSource";
import { ScorecardConfig, ScorecardDataHolder, ScorecardDataSource } from "@hisptz/dhis2-analytics";
import { useFormContext } from "react-hook-form";

export default function DataSourceHolder({
											 index,
											 dataHolder,
											 onDelete,
											 groupIndex
										 }: { index: number; dataHolder: ScorecardDataHolder, onDelete: (index: number) => void, groupIndex: number; onUnlink: (index: number) => void }) {
	const { setValue, getValues } = useFormContext<ScorecardConfig>();
	const { id, dataSources } = dataHolder ?? {};
	const selected = false;
	const hasLinked = dataSources?.length > 1;
	const onDataSourceDelete = (indicatorIndex: number) => {
		const dataHolders = getValues(`dataSelection.dataGroups.${groupIndex}.dataHolders`) ?? [];
		const dataHolderIndex = dataHolders.findIndex((holder) => holder.id === id);
		if (hasLinked) {
			//We should remove the specific data item and not the whole data holder
			dataSources.splice(indicatorIndex, 1);
			setValue(`dataSelection.dataGroups.${groupIndex}.dataHolders.${dataHolderIndex}`, { ...dataHolder, dataSources });
			return;
		}
		//Just remove the whole data holder
		onDelete(dataHolderIndex);
	};
	return (
		<Draggable draggableId={`${id}`} index={index}>
			{(provided) => (
				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					<div className="row align-items-center">
						<div
							onClick={async () => {
								if (id) {

								}
							}}
							className="column center"
							style={{
								border: hasLinked
									? `1px solid ${colors.grey400}`
									: undefined,
								background: selected
									? `${colors.teal200}`
									: undefined,
								padding: hasLinked ? 8 : undefined,
								marginBottom: 8
							}}
						>
							{dataSources?.map((dataGroup: ScorecardDataSource, index: number) => {
								return (
									<div
										className="data-holder"
										key={dataGroup.id}
										style={{ margin: "4px 0" }}
									>
										<DataSource
											dataSource={dataGroup}
											key={dataGroup.id}
											onDelete={onDataSourceDelete}
											index={index}
										/>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			)}
		</Draggable>
	);
}
