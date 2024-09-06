import { DATASTORE_NAMESPACE, ScorecardConfig, scorecardConfigSchema } from "@scorecard/shared";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDataQuery } from "@dhis2/app-runtime";
import { useGetScorecardSharingSettings } from "../../ScorecardList/hooks/authority";
import { useEffect, useState } from "react";


const query: any = {
	scorecard: {
		resource: `dataStore/${DATASTORE_NAMESPACE}`,
		id: ({ id }: { id: string }) => id

	}
};


export default function useScorecardFormMetadata() {
	const { id } = useParams<{ id: string }>();
	const [access, setAccess] = useState<{ read: boolean; write: boolean } | null>(null);
	const { refetch } = useDataQuery<{ scorecard: ScorecardConfig }>(query, {
		variables: {
			id
		},
		lazy: true
	});
	const getAccess = useGetScorecardSharingSettings();
	const form = useForm<ScorecardConfig>({
		shouldFocusError: true,
		defaultValues: async () => {
			if (id) {
				const scorecardDefaultValues = await refetch() as { scorecard: ScorecardConfig };
				return scorecardDefaultValues.scorecard;
			}
			return {} as ScorecardConfig;
		},
		reValidateMode: "onChange",
		resolver: zodResolver(scorecardConfigSchema)
	});

	async function getScorecardAccess() {
		setAccess(await getAccess(id!));
	}

	useEffect(() => {
		if (id) {
			getScorecardAccess();
		} else {
			setAccess({ read: true, write: true });
		}
	}, [id]);

	return {
		form,
		access
	};
}
