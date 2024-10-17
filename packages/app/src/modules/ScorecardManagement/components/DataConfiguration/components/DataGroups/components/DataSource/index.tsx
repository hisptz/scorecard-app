import i18n from "@dhis2/d2-i18n";
import { Button, colors, IconDragHandle24, UserAvatar } from "@dhis2/ui";
import { IconDelete16 } from "@dhis2/ui-icons";
import React from "react";
import { ScorecardDataSource } from "@hisptz/dhis2-scorecard";
import { FieldError, useFormContext } from "react-hook-form";

export default function DataSource({ dataSource, index, onDelete, groupIndex, holderIndex }: { groupIndex: number; holderIndex: number; dataSource: ScorecardDataSource, index: number, onDelete: (index: number) => void }) {
	const { label, type } = dataSource;
	const { getFieldState } = useFormContext();

	const error = getFieldState(`dataSelection.dataGroups.${groupIndex}.dataHolders.${holderIndex}.dataSources.${index}`).error;
	const errorMessages = error ? Object.values(error as unknown as Record<string, FieldError>)?.map(({ message }) => message) : [];

	return (
		<div>
			<div style={error ? { borderColor: colors.red500 } : undefined} className="container-bordered data-source p-8 w-100">
				<div className="row space-between align-items-center">
					<div style={{ gap: 8 }} className="row flex-1 align-items-center">
						<IconDragHandle24 />
						<UserAvatar name={type} />
						<div>
							<p style={{ margin: 2 }} className=" flex-1">{label}</p>
							{
								error && (<span
									style={{
										fontSize: 12,
										margin: 4,
										color: colors.red500
									}}
								>
						{errorMessages?.join(", ")}
					</span>)
							}
						</div>
					</div>
					<div>
						<Button
							className="data-source close-icon"
							small
							onClick={(_: any, event: any) => {
								event.stopPropagation();
								onDelete(index);
							}}
							icon={<IconDelete16 />}
						>
							{i18n.t("Delete")}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
