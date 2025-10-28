import { useBoolean } from "usehooks-ts";
import i18n from "@dhis2/d2-i18n";
import { Button, IconShare24, SharingAccess, SharingDialog, SharingObject } from "@dhis2/ui";
import { useParams } from "react-router-dom";
import { DATASTORE_NAMESPACE, getUserAuthority, UserState } from "@/shared";
import { useAlert, useDataQuery } from "@dhis2/app-runtime";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";

const keyMetaQuery = {
	meta: {
		resource: `dataStore/${DATASTORE_NAMESPACE}`,
		id: ({ id }: { id: string }) => `${id}/metaData`,
		params: {
			fields: "id,sharing[public,user]"
		}
	}
};

type Response = {
	meta: {
		id: string;
		sharing: {
			owner: string;
			external: boolean;
			users: Record<string, SharingObject>;
			userGroups: Record<string, SharingObject>;
			public: SharingAccess;
		};
	};
};

export function ScorecardSharing() {
	const user = useRecoilValue(UserState);
	const { id } = useParams<{ id: string }>();
	// @ts-expect-error Query type errors
	const { data, loading } = useDataQuery<Response>(keyMetaQuery, {
		variables: {
			id
		},
		lazy: !id
	});
	const { show } = useAlert(
		({ message }) => message,
		({ type }) => ({ ...type, duration: 3000 })
	);
	const sharing = useMemo(() => {
		if (!data) return;
		//@ts-expect-error will be fixed in the future
		return getUserAuthority(user!, data.meta.sharing);
	}, [data, user]);

	const {
		value: hide,
		setTrue: onClose,
		setFalse: onOpen
	} = useBoolean(true);


	return (
		<>
			<div className="flex flex-col gap-2">
				<div>
					<Button
						loading={loading}
						icon={<IconShare24 />}
						onClick={onOpen}
						disabled={!data || !sharing?.write}
					>
						{i18n.t("Share")}
					</Button>
				</div>
				{!data && !loading && <span
					className="text-xs text-gray-600">{i18n.t("You need to create the scorecard first to share it")}</span>}
			</div>
			{!hide && (
				<SharingDialog
					onSave={() => {
						show({
							message: i18n.t(
								"Sharing settings updated successfully"
							),
							type: { success: true }
						});
						onClose();
					}}
					onError={() => {
						show({
							message: i18n.t("Error saving sharing settings"),
							type: { critical: true }
						});
					}}
					onClose={onClose}
					id={data!.meta.id}
					type="dataStore"
				/>
			)}
		</>
	);
}
