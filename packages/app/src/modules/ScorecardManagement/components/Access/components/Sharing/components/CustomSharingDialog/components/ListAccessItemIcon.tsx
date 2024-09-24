import { colors, IconUserGroup24, IconWorld24, UserAvatar } from "@dhis2/ui";
import React from "react";
import { AccessTypes } from "@scorecard/shared";

export default function ListItemIcon({
										 target,
										 name
									 }: {
	target: typeof AccessTypes[keyof typeof AccessTypes];
	name: string;
}) {
	switch (target) {
		case AccessTypes.EXTERNAL:
			return <IconWorld24 color={colors.grey600} />;
		case AccessTypes.PUBLIC:
		case AccessTypes.USER_GROUP:
			return <IconUserGroup24 color={colors.grey600} />;
		case AccessTypes.USER:
			return <UserAvatar name={name} small />;
		default:
			return null;
	}
}
