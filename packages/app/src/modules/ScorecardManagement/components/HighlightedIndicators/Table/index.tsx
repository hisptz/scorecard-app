import i18n from "@dhis2/d2-i18n";
import { Button, ButtonStrip, IconEdit16, Table, TableBody, TableCell, TableCellHead, TableHead, TableRow, TableRowHead } from "@dhis2/ui";
import { Help, HIGHLIGHTED_TABLE_HELP_STEPS } from "@scorecard/shared";
import { IconDelete16 } from "@dhis2/ui-icons";
import { get, isEmpty } from "lodash";
import React, { Fragment } from "react";
import { useController } from "react-hook-form";
import { ScorecardConfig } from "@hisptz/dhis2-analytics";
import { useBoolean } from "usehooks-ts";
import HighlightedDataSourceConfigurationForm from "../HighlightedDataSourceConfigurationForm";

const columns = [
	{
		label: i18n.t("Name"),
		path: "name"
	},
	{
		label: i18n.t("Label"),
		path: "label"
	},
	{
		label: i18n.t("Weight"),
		path: "weight"
	}
];

function HighlightedTableRow({ index, onRemove }: { index: number; onRemove: (index: number) => void }) {
	const { value: hide, setTrue: onHide, setFalse: onShow } = useBoolean(true);
	const { field, fieldState } = useController<ScorecardConfig, `highlightedIndicators.${number}`>({
		name: `highlightedIndicators.${index}`
	});


	return (
		<TableRow
		>
			{columns?.map(({ path }) => (
				<TableCell
					key={`${index}-${path}`}
				>
					{get(field.value, path)}
				</TableCell>
			))}
			<TableCell>
				<ButtonStrip>
					<Button
						small
						onClick={(_, e) => {
							e.stopPropagation();
							onShow();
						}}
						icon={<IconEdit16 />}
					>
						{i18n.t("Edit")}
					</Button>
					<Button
						small
						onClick={(_, e) => {
							e.stopPropagation();
							onRemove(index);
						}}
						icon={<IconDelete16 />}
					>
						{i18n.t("Delete")}
					</Button>
				</ButtonStrip>
			</TableCell>
			{!hide && (<HighlightedDataSourceConfigurationForm hide={hide} onClose={onHide} index={index} />)}
		</TableRow>
	);

}

export default function HighlightedIndicatorsTable({ fields, onRemove }: { fields: { id: string }[], onRemove: (index: number) => void }) {


	return !isEmpty(fields) ? (
		<>
			<Help helpSteps={HIGHLIGHTED_TABLE_HELP_STEPS} />
			<Table>
				<TableHead>
					<TableRowHead>
						{columns?.map(({ label, path }) => (
							<TableCellHead
								key={`${path}-column`}
							>
								{label}
							</TableCellHead>
						))}
						<TableCellHead>
							{i18n.t("Actions")}
						</TableCellHead>
					</TableRowHead>
				</TableHead>
				<TableBody>
					{fields?.map((data, index: number) => (
						<HighlightedTableRow key={data.id} index={index} onRemove={onRemove} />
					))}
				</TableBody>
			</Table>
		</>
	) : null;
}
