import i18n from "@dhis2/d2-i18n";
import { Button, colors } from "@dhis2/ui";
import { IconButton } from "@material-ui/core";
import { IconDelete24, IconEdit24 } from "@dhis2/ui-icons";
import React from "react";
import { useBoolean } from "usehooks-ts";
import EditTitle from "./EditTitle";
import { useFormContext, useWatch } from "react-hook-form";
import { ScorecardConfig } from "@hisptz/dhis2-scorecard";
import { ErrorIcon } from "../../../../../../../../../shared";

export default function GroupTitle({
									   index,
									   onDelete
								   }: { index: number; onDelete: (index: number) => void }) {
	const { value: editTitleOpen, setTrue: openEditTitle, setFalse: closeEditTitle } = useBoolean(false);
	const title = useWatch<ScorecardConfig, `dataSelection.dataGroups.${number}.title`>({
		name: `dataSelection.dataGroups.${index}.title`
	});
	const { getFieldState } = useFormContext<ScorecardConfig>();

	const error = getFieldState(`dataSelection.dataGroups.${index}.dataHolders`)?.error;

	if (editTitleOpen) {
		return <EditTitle index={index} onClose={closeEditTitle} />;
	}


	return (
		<div className="row space-between align-items-center">
			<div className="row  align-items-center accordion-title-container">
				<div className="column w-auto">
					<p
						onDoubleClick={(event) => {
							event.stopPropagation();
							openEditTitle();
						}}
						onClick={(event) => event.stopPropagation()}
						className="accordion-title group-name-area"
					>
						{title}
					</p>
					{error && (
						<p
							style={{
								fontSize: 12,
								margin: 4,
								color: colors.red500
							}}
						>
							{error?.message}
						</p>
					)}
				</div>
				<IconButton
					onClick={(event) => {
						event.stopPropagation();
						openEditTitle();
					}}
					size="small"
					className="accordion-title-edit"
				>
					<IconEdit24 />
				</IconButton>
			</div>
			<div className="">
				<div className="row align-items-center">
					<Button
						className="delete-group-icon"
						onClick={(_: any, event: any) => {
							event.stopPropagation();
							if (onDelete) {
								onDelete(index);
							}
						}}
						icon={<IconDelete24 />}
					>
						{i18n.t("Delete")}
					</Button>
					{error && (
						<div style={{ paddingLeft: 16 }}>
							<ErrorIcon color={colors.red500} size={24} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

