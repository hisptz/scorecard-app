import i18n from "@dhis2/d2-i18n";
import { Button, IconDragHandle24, UserAvatar } from "@dhis2/ui";
import { IconDelete16 } from "@dhis2/ui-icons";
import React from "react";
import { ScorecardDataSource } from "@hisptz/dhis2-analytics";

export default function DataSource({ dataSource, index, onDelete }: { dataSource: ScorecardDataSource, index: number, onDelete: (index: number) => void }) {
	const { label, type } = dataSource;
	return (
		<div>
			<div className="container-bordered data-source p-8 w-100">
				<div className="row space-between align-items-center">
					<div className="row flex-1 align-items-center">
						<IconDragHandle24 />
						<UserAvatar name={type} />
						<p className="data-source name flex-1">{label}</p>
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
