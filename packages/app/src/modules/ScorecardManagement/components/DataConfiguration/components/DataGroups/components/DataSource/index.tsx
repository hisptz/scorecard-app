import i18n from "@dhis2/d2-i18n";
import { Button } from "@dhis2/ui";
import { getDataSourceShortName } from "@scorecard/shared";
import { Avatar } from "@material-ui/core";
import { IconDelete16 } from "@dhis2/ui-icons";
import React from "react";
import { ScorecardDataSource } from "@hisptz/dhis2-analytics";

export default function DataSource({ dataSource, index, onDelete }: { dataSource: ScorecardDataSource, index: number, onDelete: (index: number) => void }) {
	const { label, type } = dataSource;
	return (
		<div>
			<div className="container-bordered data-source p-8 w-100">
				<div className="row space-between align-items-center">
					<div className="row align-items-center ">
						<Avatar className="data-source avatar">
							{getDataSourceShortName(type)}
						</Avatar>
						<p className="data-source name">{label}</p>
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
