import { AccessTypes } from "@scorecard/shared";
import { ScorecardAccess } from "@scorecard/shared";
import produce from "immer";
import { cloneDeep, findIndex, remove, set } from "lodash";
import { useCallback, useMemo } from "react";
import { useFormContext } from "react-hook-form";

export default function useAccessManage() {
	const { watch, setValue } = useFormContext();

	const publicAccess = watch("publicAccess");

	const setPublicAccess = useCallback(
		(updatedValue: any) => {
			setValue("publicAccess", updatedValue);
		},
		[setValue],
	);

	const userGroupAccesses = watch("userGroupAccesses");

	const setUserGroupAccesses = useCallback(
		(updatedValue: any) => {
			setValue("userGroupAccesses", updatedValue);
		},
		[setValue],
	);

	const userAccesses = watch("userAccesses");

	const setUserAccesses = useCallback(
		(updatedValue: any) => {
			setValue("userAccesses", updatedValue);
		},
		[setValue],
	);

	const userAndUserGroupAccesses = useMemo(
		() => [...(userAccesses || []), ...(userGroupAccesses || [])],
		[userAccesses, userGroupAccesses],
	);

	const onPublicAccessChange = useCallback(
		(value: any) => {
			setPublicAccess(value);
		},
		[setPublicAccess],
	);

	const onDelete = useCallback(
		(access: any) => {
			const { type } = access || {};
			if (type === "user") {
				const updatedList = cloneDeep(userAccesses);
				remove(updatedList, ["id", access?.id]);
				setUserAccesses(updatedList);
				return;
			}
			const updatedList = cloneDeep(userGroupAccesses);
			remove(updatedList, ["id", access?.id]);
			setUserGroupAccesses(updatedList);
		},
		[setUserAccesses, setUserGroupAccesses, userAccesses, userGroupAccesses],
	);

	const onUpdate = useCallback(
		(updatedAccess: any) => {
			const { type } = updatedAccess || {};
			if (type === AccessTypes.USER) {
				const index = findIndex(userAccesses, ["id", updatedAccess?.id]);
				setUserAccesses(
					produce(userAccesses, (draft: any) => {
						set(draft, [index], updatedAccess);
					}),
				);
			}
			const index = findIndex(userGroupAccesses, ["id", updatedAccess?.id]);
			setUserGroupAccesses(
				produce(userGroupAccesses, (draft: any) => {
					set(draft, [index], updatedAccess);
				}),
			);
		},
		[setUserAccesses, setUserGroupAccesses, userAccesses, userGroupAccesses],
	);

	const onAdd = useCallback(
		(selectedAccess: any, selectedUserGroup: any) => {
			if (selectedAccess && selectedUserGroup) {
				if (selectedUserGroup?.type === "user") {
					setUserAccesses([
						...(userAccesses ?? []),
						new ScorecardAccess({
							id: selectedUserGroup?.id,
							displayName: selectedUserGroup?.displayName,
							type: "user",
							access: selectedAccess,
						}),
					]);
				} else {
					setUserGroupAccesses([
						...(userGroupAccesses ?? []),
						new ScorecardAccess({
							id: selectedUserGroup?.id,
							displayName: selectedUserGroup?.displayName,
							type: "userGroup",
							access: selectedAccess,
						}),
					]);
				}
			}
		},
		[setUserAccesses, setUserGroupAccesses, userAccesses, userGroupAccesses],
	);

	return {
		onAdd,
		publicAccess,
		onPublicAccessChange,
		userAndUserGroupAccesses,
		onDelete,
		onUpdate,
	};
}
