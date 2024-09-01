import i18n from "@dhis2/d2-i18n";
import {
	Button,
	DataTable,
	DataTableCell,
	DataTableColumnHeader,
	DataTableHead,
	DataTableRow,
	TableBody,
} from "@dhis2/ui";
import {
	Help,
	HIGHLIGHTED_TABLE_HELP_STEPS,
	ScorecardConfigEditState,
} from "@scorecard/shared";
import { IconDelete24 } from "@dhis2/ui-icons";
import { cloneDeep, findIndex, get, isEmpty, remove } from "lodash";
import React, { Fragment, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useRecoilState } from "recoil";

const columns = [
	{
		label: "Name",
		path: "displayName",
	},
	{
		label: "Label",
		path: "label",
	},
];

export default function HighlightedIndicatorsTable() {
	const { watch, setValue, trigger } = useFormContext();

	const highlightedIndicators = watch("highlightedIndicators");

	const setHighlightedIndicators = useCallback(
		(highlightedIndicators: any) => {
			setValue("highlightedIndicators", highlightedIndicators);
		},
		[setValue],
	);

	const [scorecardEditState, setScorecardEditorState] = useRecoilState(
		ScorecardConfigEditState,
	);

	const onRowClick = async (index: any) => {
		if (await trigger()) {
			setScorecardEditorState((prevState: any) => ({
				...prevState,
				selectedHighlightedIndicatorIndex: index,
			}));
		}
	};

	const onRemove = useCallback(
		(id: any) => {
			if (
				findIndex(highlightedIndicators, ["id", id]) ===
				scorecardEditState.selectedHighlightedIndicatorIndex
			) {
				setScorecardEditorState((prevState: any) => ({
					...prevState,
					selectedHighlightedIndicatorIndex: undefined,
				}));
			}
			const updatedList = cloneDeep(highlightedIndicators);
			remove(updatedList, ["id", id]);
			setHighlightedIndicators(updatedList);
		},
		[
			highlightedIndicators,
			scorecardEditState.selectedHighlightedIndicatorIndex,
			setHighlightedIndicators,
			setScorecardEditorState,
		],
	);

	return !isEmpty(highlightedIndicators) ? (
		<Fragment>
			<Help helpSteps={HIGHLIGHTED_TABLE_HELP_STEPS} />
			<DataTable fixed scrollHeight={"75vh"}>
				<DataTableHead>
					<DataTableRow>
						{columns?.map(({ label, path }) => (
							<DataTableColumnHeader
								fixed
								top={"0"}
								key={`${path}-column`}
							>
								{label}
							</DataTableColumnHeader>
						))}
						<DataTableColumnHeader fixed top={"0"} />
					</DataTableRow>
				</DataTableHead>
				<TableBody>
					{highlightedIndicators?.map((data: any, index: number) => (
						<DataTableRow
							selected={
								scorecardEditState?.selectedHighlightedIndicatorIndex ===
								index
							}
							key={`${data?.id}`}
						>
							{columns?.map(({ path }) => (
								<DataTableCell
									onClick={() => onRowClick(index)}
									key={`${data?.id}-${path}`}
								>
									{get(data, path)}
								</DataTableCell>
							))}
							<DataTableCell align="center">
								<Button
									onClick={(value: any, e: any) => {
										e.stopPropagation();
										onRemove(data?.id);
									}}
									icon={<IconDelete24 />}
								>
									{i18n.t("Delete")}
								</Button>
							</DataTableCell>
						</DataTableRow>
					))}
				</TableBody>
			</DataTable>
		</Fragment>
	) : null;
}