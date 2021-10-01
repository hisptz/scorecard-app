import { DATASTORE_ENDPOINT } from "../../core/constants/config";
import OrgUnitSelection from "../../core/models/orgUnitSelection";

const query = {
  scorecard: {
    resource: DATASTORE_ENDPOINT,
    id: ({ id }) => id,
  },
};

export default async function getScorecard(id = "", engine) {
  if (id) {
    try {
      const response = await engine.query(query, { variables: { id } });
      return { scorecard: response?.scorecard };
    } catch (e) {
      return { error: e };
    }
  }
  return { error: "not found" };
}

const orgUnitQuery = {
  orgUnits: {
    resource: "organisationUnits",
    params: ({ orgUnits }) => ({
      filter: [`id:in:[${orgUnits?.join(",")}]`],
      fields: ["path", "displayName", "level", "id"],
    }),
  },
};

export async function getOrgUnitSelection({ orgUnitSelection }, engine) {
  const { orgUnits: orgUnitsIds } = orgUnitSelection ?? {};
  const { orgUnits: resolvedOrgUnits } = await engine.query(orgUnitQuery, {
    variables: { orgUnits: orgUnitsIds?.map(({ id }) => id) ?? [] },
  });
  return new OrgUnitSelection({
    ...orgUnitSelection,
    orgUnits: resolvedOrgUnits?.organisationUnits,
  });
}
