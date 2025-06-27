import { useCallback } from "react";
import { ScorecardConfig } from "@hisptz/dhis2-scorecard";
import { useParams } from "react-router-dom";
import { useAlert, useDataEngine, useDataMutation, useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import { DATASTORE_NAMESPACE } from "../../../shared";

const metadataQuery: any = {
	meta: {
		resource: `dataStore/${DATASTORE_NAMESPACE}`,
		id: ({ id }: { id: string }) => `${id}/metaData`
	}
};

const updateMutation: any = {
	type: "update" as const,
	resource: `dataStore/${DATASTORE_NAMESPACE}`,
	id: ({ id }: { id: string }) => id,
	data: ({ data }: any) => data
};

const sharingMutation: any = {
	type: "create" as const,
	resource: `sharing`,
	params: ({ id }: { id: string }) => ({
		type: "dataStore",
		id: id ?? "this?"
	}),
	data: ({ data }: any) => data
};

export function useSaveScorecard() {
	const { id } = useParams<{ id: string }>();
	const [update] = useDataMutation(updateMutation);
	const [updateSharing, {}] = useDataMutation(sharingMutation);
	const { refetch: getKeyMetadata } = useDataQuery(metadataQuery, { lazy: true });
	const { show } = useAlert(({ message }) => message, ({ type }) => ({ ...type, duration: 3000 }));
	const engine = useDataEngine();

	const onUpdateSharing = useCallback(async (config: ScorecardConfig) => {
		const metaResponse = await getKeyMetadata({
			id: config.id
		});
		const meta = metaResponse.meta as Record<string, unknown>;
		const payload = {
			object: config.sharing
		};

		if (meta.id) {
			await updateSharing({
				id: meta.id,
				data: payload
			});
		}

	}, [id]);

	const save = useCallback(async (config: ScorecardConfig) => {
		try {
			if (id) {
				//updating
				await update({
					data: config,
					id
				});
				await onUpdateSharing(config);
				show({ message: i18n.t("Scorecard updated successfully"), type: { success: true } });
			} else {
				const mutation: any = {
					type: "create",
					resource: `dataStore/${DATASTORE_NAMESPACE}/${config.id}`,
					data: config
				};
				await engine.mutate(mutation);
				await onUpdateSharing(config);
				show({ message: i18n.t("Scorecard created successfully"), type: { success: true } });
			}
		} catch (e: any) {
			show({ message: `${i18n.t("Error saving scorecard")}: ${e.message}`, type: { critical: true } });
			throw e;
		}
	}, [id]);
	const saveSilently = useCallback(async (config: ScorecardConfig) => {
		if (id) {
			//updating
			await update({
				data: config,
				id
			});
			await onUpdateSharing(config);
		} else {
			const mutation: any = {
				type: "create",
				resource: `dataStore/${DATASTORE_NAMESPACE}/${config.id}`,
				data: config
			};
			await engine.mutate(mutation);

			await onUpdateSharing(config);
		}

	}, [id]);

	return { save, saveSilently };

}
