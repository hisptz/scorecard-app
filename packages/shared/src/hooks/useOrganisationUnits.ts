import { useDataQuery } from "@dhis2/app-runtime";
import { debounce, isEmpty } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilValueLoadable } from "recoil";
import { OrgUnitChildren } from "../state";

export function useOrganisationUnitChildren(orgUnitId = "") {
	const [id, setId] = useState(orgUnitId);
	const { state, contents } = useRecoilValueLoadable(OrgUnitChildren(id));
	return {
		loading: state === "loading",
		orgUnits: state === "hasValue" ? contents : [],
		error: state === "hasError" ? contents : undefined,
		setId,
	};
}

const orgUnitSearchQuery = {
	nameQuery: {
		resource: "organisationUnits",
		params: ({ keyword }) => ({
			filter: [`displayName:ilike:${keyword}`],
			fields: ["id", "displayName", "path", "level"],
		}),
	},
	idQuery: {
		resource: "organisationUnits",
		params: ({ keyword }) => ({
			filter: [`id:ilike:${keyword}`],
			fields: ["id", "displayName", "path", "level"],
		}),
	},
};

function formatSearchedOrgUnits(orgUnits) {
	return orgUnits.map((orgUnit) => {
		return {
			...orgUnit,
			hierarchy: orgUnit.displayName,
		};
	});
}

export async function searchOrganisationUnit(keyword, engine) {
	if (!isEmpty(keyword)) {
		const data = await engine.query(orgUnitSearchQuery, {
			variables: { keyword },
		});
		if (!isEmpty(data)) {
			const idResponse = data?.idQuery?.organisationUnits ?? [];
			const nameResponse = data?.nameQuery?.organisationUnits ?? [];
			return formatSearchedOrgUnits([...idResponse, ...nameResponse]);
		}
	}
	return [];
}

export function useSearchOrganisationUnit() {
	const [keyword, setKeyword] = useState();
	const { data, error, loading, refetch } = useDataQuery(orgUnitSearchQuery, {
		lazy: true,
	});
	const updateKeyword = useRef(
		debounce(setKeyword, 1000, { trailing: true, leading: false }),
	);

	const orgUnits = useMemo(() => {
		if (!isEmpty(data)) {
			const idResponse = data?.idQuery?.organisationUnits ?? [];
			const nameResponse = data?.nameQuery?.organisationUnits ?? [];
			return [...idResponse, ...nameResponse];
		}
		return [];
	}, [data]);

	useEffect(() => {
		if (!isEmpty(keyword)) {
			refetch({ keyword });
		}
	}, [keyword]);

	return {
		orgUnits,
		error,
		loading,
		updateKeyword: updateKeyword.current,
	};
}

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
