import { useDataQuery } from "@dhis2/app-runtime";
import { useMemo } from "react";

const query = {
	levels: {
		resource: "organisationUnitLevels",
		params: {
			fields: ["level", "id", "displayName"],
		},
	},
	groups: {
		resource: "organisationUnitGroups",
		params: {
			fields: ["id", "displayName"],
		},
	},
};

type QueryResponse = {
	levels: {
		organisationUnitLevels: Array<{
			id: string;
			displayName: string;
			level: number;
		}>;
	};

	groups: {
		organisationUnitGroups: Array<{
			id: string;
			displayName: string;
		}>;
	};
};

export function useOrganisationUnitLevelsAndGroups() {
	const { data, loading } = useDataQuery<QueryResponse>(query);

	const orgUnitLevels = useMemo(() => {
		return data?.levels?.organisationUnitLevels ?? [];
	}, [data?.levels?.organisationUnitLevels]);

	const orgUnitGroups = useMemo(() => {
		return data?.groups?.organisationUnitGroups ?? [];
	}, [data?.groups?.organisationUnitGroups]);

	return {
		orgUnitLevels,
		orgUnitGroups,
		loading,
	};
}
