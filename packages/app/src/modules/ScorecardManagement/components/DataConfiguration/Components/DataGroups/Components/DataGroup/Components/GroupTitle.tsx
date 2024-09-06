import i18n from "@dhis2/d2-i18n";
import { Button } from "@dhis2/ui";
import { ErrorIcon } from "@scorecard/shared";
import { IconButton } from "@material-ui/core";
import { IconDelete24, IconEdit24 } from "@dhis2/ui-icons";
import PropTypes from "prop-types";
import React from "react";

export default function GroupTitle({
	setTitleEditOpen,
	title,
	error,
	onDelete,
	id,
}: any) {
	return (
		<div className="row space-between align-items-center">
			<div className="row  align-items-center accordion-title-container">
				<div className="column w-auto">
					<p
						onDoubleClick={(event) => {
							event.stopPropagation();
							setTitleEditOpen(true);
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
								color: "#f44336",
							}}
						>
							{error?.message}
						</p>
					)}
				</div>
				<IconButton
					onClick={(event) => {
						event.stopPropagation();
						setTitleEditOpen(true);
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
								onDelete(id);
							}
						}}
						icon={<IconDelete24 />}
					>
						{i18n.t("Delete")}
					</Button>
					{error && (
						<div style={{ paddingLeft: 16 }}>
							<ErrorIcon color={"#f44336"} size={24} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

GroupTitle.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	setTitleEditOpen: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	error: PropTypes.any,
};
