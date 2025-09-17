import i18n from "@dhis2/d2-i18n";
import { Button, IconAdd24 } from "@dhis2/ui";
import { generateLegendDefaults, Help, HIGHLIGHTED_INDICATOR_HELP_STEPS } from "../../../../shared";
import { isEmpty } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import DataSourceSelectorModal from "../DataConfiguration/components/DataGroups/components/DataSourceSelectorModal";
import { getNonDefaultLegendDefinitions } from "../General/utils/utils";
import HighlightedIndicatorsTable from "./Table";
import { SelectedDataItem } from "@hisptz/dhis2-ui";
import { ScorecardConfig, ScorecardDataSource } from "@hisptz/dhis2-scorecard";

export default function HighlightedIndicatorsScorecardForm() {
	const { getValues, setValue } = useFormContext<ScorecardConfig>();
	const { fields, append, remove } = useFieldArray<ScorecardConfig, "highlightedIndicators">({
		name: "highlightedIndicators"
	});

	useEffect(() => {
		const indicators = getValues(`highlightedIndicators`);
		if (!Array.isArray(indicators)) {
			setValue("highlightedIndicators", []);
		}
	}, []);

	const [addOpen, setAddOpen] = useState(false);

	const onAddClick = () => {
		setAddOpen(true);
	};

	const onAdd = useCallback(
		(dataSources: SelectedDataItem[]) => {
			const legendDefinitions = getNonDefaultLegendDefinitions(getValues(`legendDefinitions`));
			const newDataSources = dataSources?.map(
				(item) => ({
					id: item.id,
					highIsGood: true,
					type: item.type,
					label: item.displayName,
					name: item.displayName,
					weight: 100,
					showColors: true,
					displayArrows: false,
					effectiveGap: 5,
					legends: generateLegendDefaults({
						legendDefinitions: legendDefinitions,
						weight: 100,
						highIsGood: true
					}),
					specificTargetsSet: false,
					specificTargets: []

				} as ScorecardDataSource)
			);
			append(newDataSources);
		},
		[
			append
		]
	);

	const highlightedIndicators = useWatch<ScorecardConfig, `highlightedIndicators`>({
		name: "highlightedIndicators"
	});

	return (
		<div className="column" style={{ height: "100%" }}>
			<Help helpSteps={HIGHLIGHTED_INDICATOR_HELP_STEPS} />
			{!isEmpty(highlightedIndicators) ? (
				<div style={{ gap: 16 }} className="column ">
					<div className="rowlabel ">
						<Button
							className="add-highlighted-indicator-button"
							onClick={onAddClick}
							icon={<IconAdd24 />}
						>
							{i18n.t("Add")}
						</Button>
					</div>
					<div className="">
						<HighlightedIndicatorsTable fields={fields} onRemove={remove} />
					</div>
				</div>
			) : (
				<div className="row align-items-center center flex-1">
					<Button
						className="add-highlighted-indicator-button"
						onClick={onAddClick}
						icon={<IconAdd24 />}
					>
						{i18n.t("Add Highlighted Indicator")}
					</Button>
				</div>
			)}
			{addOpen && (
				<DataSourceSelectorModal
					open={addOpen}
					onSelect={onAdd}
					disabled={highlightedIndicators?.map(({ id }: any) => id)}
					onClose={() => setAddOpen(false)}
				/>
			)}
		</div>
	);
}
