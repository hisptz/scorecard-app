import { compact } from "lodash";
import { DATASTORE_ENDPOINT } from "../constants";
import { OrgUnitSelection } from "../models";

const query = {
	scorecard: {
		resource: DATASTORE_ENDPOINT,
		id: ({ id }: any) => id,
	},
};

export default async function getScorecard(id = "", engine: any) {
	if (id) {
		try {
			const response = await engine.query(query, { variables: { id } });
			const sanitizedScorecard = sanitizeDataSelection(response?.scorecard);
			return { scorecard: sanitizedScorecard };
		} catch (e) {
			return { error: e };
		}
	}
	return { error: "not found" };
}

function sanitizeDataSelection(scorecard: any) {
	const { dataGroups } = scorecard["dataSelection"] ?? {};
	const sanitizedGroups = dataGroups.map((group: any) => ({
		...group,
		dataHolders: compact(group?.dataHolders),
	}));

	return {
		...scorecard,
		dataSelection: {
			dataGroups: sanitizedGroups,
		},
	};
}

const orgUnitQuery = {
	orgUnits: {
		resource: "organisationUnits",
		params: ({ orgUnits }: any) => ({
			filter: [`id:in:[${orgUnits?.join(",")}]`],
			fields: ["path", "displayName", "level", "id"],
		}),
	},
};

export async function getOrgUnitSelection(
	{ orgUnitSelection }: any,
	engine: any,
) {
	const { orgUnits: orgUnitsIds } = orgUnitSelection ?? {};
	const { orgUnits: resolvedOrgUnits } = await engine.query(orgUnitQuery, {
		variables: { orgUnits: orgUnitsIds?.map(({ id }: any) => id) ?? [] },
	});
	return new OrgUnitSelection({
		...orgUnitSelection,
		orgUnits: resolvedOrgUnits?.organisationUnits,
	});
}
