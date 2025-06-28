import { useBoolean } from "usehooks-ts";
import i18n from "@dhis2/d2-i18n";
import {
	Button,
	IconShare24,
	SharingAccess,
	SharingDialog,
	SharingObject,
} from "@dhis2/ui";
import { useParams } from "react-router-dom";
import { DATASTORE_NAMESPACE } from "../../../../../shared";
import { useAlert, useDataQuery } from "@dhis2/app-runtime";

const keyMetaQuery = {
	meta: {
		resource: `dataStore/${DATASTORE_NAMESPACE}`,
		id: ({ id }: { id: string }) => `${id}/metaData`,
		params: {
			fields: "id,sharing[public,user]",
		},
	},
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
	const { id } = useParams<{ id: string }>();
	// @ts-expect-error Query type errors
	const { data, loading } = useDataQuery<Response>(keyMetaQuery, {
		variables: {
			id,
		},
		lazy: !id,
	});
	const { show } = useAlert(
		({ message }) => message,
		({ type }) => ({ ...type, duration: 3000 })
	);

	const {
		value: hide,
		setTrue: onClose,
		setFalse: onOpen,
	} = useBoolean(true);

	return (
		<>
			<Button
				loading={loading}
				icon={<IconShare24 />}
				onClick={onOpen}
				disabled={!data}
			>
				{i18n.t("Sharing")}
			</Button>
			{!hide && (
				<SharingDialog
					onSave={() => {
						show({
							message: i18n.t(
								"Sharing settings updated successfully"
							),
							type: { success: true },
						});
						onClose();
					}}
					onError={() => {
						show({
							message: i18n.t("Error saving sharing settings"),
							type: { critical: true },
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
