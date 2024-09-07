import React from "react";
import { DndContext } from "@dnd-kit/core";
import { DataGroupDroppable } from "./components/DataGroup/components/DataGroupDroppable";
import { useDataItemSearchState } from "../../states/searchState";
import { useFieldArray } from "react-hook-form";
import { ScorecardConfig, ScorecardDataGroup } from "@hisptz/dhis2-analytics";
import { isEmpty } from "lodash";
import EmptyDataGroups from "../EmptyDataGroups";
import { uid } from "@hisptz/dhis2-utils";
import i18n from "@dhis2/d2-i18n";
import { Button } from "@dhis2/ui";
import { IconAdd24 } from "@dhis2/ui-icons";
import { DataGroup } from "./components/DataGroup";

export default function DataGroups() {
	const [filteredDataGroupIds] = useDataItemSearchState();
	const { fields, append, remove } = useFieldArray<ScorecardConfig, "dataSelection.dataGroups">({
		name: "dataSelection.dataGroups"
	});

	const onGroupAdd = () => {
		append({
			id: uid(),
			dataHolders: [],
			title: i18n.t("Default"),
			style: {}
		} as ScorecardDataGroup);
	};

	if (isEmpty(fields)) {
		return <EmptyDataGroups onGroupAdd={onGroupAdd} />;
	}

	return (
		<DndContext>
			<DataGroupDroppable>
				<div style={{ gap: 24 }} className="column">
					<div style={{ flex: 1 }} className="column">
						{
							fields.map((field, i) => (
								<DataGroup onRemove={remove} key={field.id} index={i} />
							))
						}
					</div>
					<div style={{ padding: 16 }}>
						<Button icon={<IconAdd24 />}>{i18n.t("Add group")}</Button>
					</div>
				</div>
			</DataGroupDroppable>
		</DndContext>
	);
}
