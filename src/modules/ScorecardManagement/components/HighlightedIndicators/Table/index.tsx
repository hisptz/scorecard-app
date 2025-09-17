import i18n from "@dhis2/d2-i18n";
import {
	Button,
	ButtonStrip,
	colors,
	IconDelete16,
	IconEdit16,
	IconError16,
	Table,
	TableBody,
	TableCell,
	TableCellHead,
	TableHead,
	TableRow,
	TableRowHead,
	Tooltip
} from "@dhis2/ui";
import { capitalize, get, isEmpty } from "lodash";
import { FieldError, useController } from "react-hook-form";
import { ScorecardConfig } from "@hisptz/dhis2-scorecard";
import { useBoolean } from "usehooks-ts";
import HighlightedDataSourceConfigurationForm from "../HighlightedDataSourceConfigurationForm";
import { Help, HIGHLIGHTED_TABLE_HELP_STEPS } from "../../../../../shared";

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

	const errorObject = fieldState.error as unknown as Record<string, FieldError> ?? {};

	const errorMessage = Object.keys(errorObject).map((key: string) => `${capitalize(key)}: ${errorObject[key]?.message as string}`);

	return (
		<TableRow
		>
			{columns?.map(({ path }, index) => (
				<TableCell
					key={`${index}-${path}`}
				>
					<div style={{ gap: 8 }} className="row align-items-center">
						{index === 0 && fieldState.error ? <Tooltip content={errorMessage.join(", ")}><IconError16
							color={colors.red500} /></Tooltip> : null}
						{get(field.value, path)}
					</div>
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

export default function HighlightedIndicatorsTable({ fields, onRemove }: {
	fields: { id: string }[],
	onRemove: (index: number) => void
}) {


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
