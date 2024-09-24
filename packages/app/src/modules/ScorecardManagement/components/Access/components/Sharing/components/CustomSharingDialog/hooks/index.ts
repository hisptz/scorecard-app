import { useController } from "react-hook-form";
import { useMemo } from "react";
import { find, has, unset } from "lodash";
import i18n from "@dhis2/d2-i18n";
import { useDialog } from "@hisptz/dhis2-ui";
import { ACCESS_TYPES_LABELLED, AccessTypes } from "@scorecard/shared";
import { ScorecardConfig, ScorecardSharing } from "@hisptz/dhis2-analytics";

export default function useManageAccess(): {
	publicAccess: string;
	allUserAccess?: { label: string; value: string };
	userGroups: ScorecardSharing["userGroups"];
	users: ScorecardSharing["users"];
	onChangeAccess: (
		type: string
	) => (access: { id: string; access: string }) => void;
	onRemove: (type: string) => (id: string) => void;
} {
	const { confirm } = useDialog();
	const { field: publicAccessField } = useController<
		ScorecardConfig,
		"sharing.public"
	>({
		name: "sharing.public"
	});
	const { field: userGroupAccessField } = useController<
		ScorecardConfig,
		"sharing.userGroups"
	>({
		name: "sharing.userGroups"
	});
	const { field: userAccessField } = useController<
		ScorecardConfig,
		"sharing.users"
	>({
		name: "sharing.users"
	});

	const allUserAccess = useMemo(
		() => find(ACCESS_TYPES_LABELLED, ["value", publicAccessField.value]),
		[publicAccessField]
	);

	const onChangeAccess =
		(type: typeof AccessTypes[keyof typeof AccessTypes]) => (access: { id: string; access: string }) => {
			if (type === AccessTypes.PUBLIC) {
				publicAccessField.onChange(access.access);
				return;
			}
			if (type === AccessTypes.USER) {
				if (has(access, "id")) {
					userAccessField.onChange({
						...userAccessField,
						[access.id]: access
					});
				}
				return;
			}
			if (type === AccessTypes.USER_GROUP) {
				if (has(access, "id")) {
					userGroupAccessField.onChange({
						...userGroupAccessField,
						[access.id]: access
					});
				}
				return;
			}
		};

	const onRemove = (type: string) => (id: string) => {
		confirm({
			title: i18n.t("Confirm action"),
			message: i18n.t("Are you sure you want to delete this access?"),
			onConfirm: () => {
				if (type === "publicAccess") {
					return;
				}
				if (type === AccessTypes.USER) {
					const newState = { ...userAccessField.value };
					unset(newState, id);
					userAccessField.onChange(newState);
				}

				if (type === AccessTypes.USER_GROUP) {
					const newState = {
						...userGroupAccessField.value
					};
					unset(newState, id);
					userGroupAccessField.onChange(newState);
				}
			}
		});
	};

	return {
		publicAccess: publicAccessField.value,
		allUserAccess,
		userGroups: userGroupAccessField.value,
		users: userAccessField.value,
		onChangeAccess,
		onRemove
	};
}
