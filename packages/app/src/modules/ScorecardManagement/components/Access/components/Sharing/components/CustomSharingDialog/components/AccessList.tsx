import i18n from "@dhis2/d2-i18n";
import React from "react";
import Title from "./Title";
import { ListItem } from "./ListAccessItem";
import useManageAccess from "../hooks";
import { AccessTypes } from "@scorecard/shared";

export function AccessList(): React.ReactElement {
	const {
		userGroups,
		users,
		onChangeAccess,
		onRemove,
		publicAccess
	} = useManageAccess();

	return (
		<>
			<Title
				title={i18n.t("Users and groups that currently have access")}
			/>
			<div className="header">
				<div className="header-left-column">
					{i18n.t("User / Group / Role")}
				</div>
				<div className="header-right-column">
					{i18n.t("Access level")}
				</div>
			</div>
			<div className="access-list">
				<ListItem
					entity={{
						name: i18n.t("All users"),
						displayName: i18n.t("All users"),
						id: "publicAccess",
						access: publicAccess
					}}
					target={AccessTypes.PUBLIC}
					onChange={onChangeAccess(AccessTypes.PUBLIC)}
				/>
				{Object.values(userGroups)?.map((uGroup) => (
					<ListItem
						key={`${uGroup.id}`}
						entity={uGroup}
						target={AccessTypes.USER_GROUP}
						onChange={onChangeAccess(AccessTypes.USER_GROUP)}
						onRemove={onRemove(AccessTypes.USER_GROUP)}
					/>
				))}
				{Object.values(users)?.map((entity) => (
					<ListItem
						entity={entity}
						key={entity.id}
						target={AccessTypes.USER}
						onChange={onChangeAccess(AccessTypes.USER)}
						onRemove={onRemove(AccessTypes.USER)}
					/>
				))}
			</div>
		</>
	);
}
