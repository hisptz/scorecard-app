import produce from "immer";
import { set } from "lodash";

function sanitizeOrgUnits({ orgUnitSelection }) {
  const { orgUnits } = orgUnitSelection ?? {};
  return {
    ...orgUnitSelection,
    orgUnits: orgUnits?.map(({ id }) => ({ id })),
  };
}

export default function sanitizeScorecard(scorecard) {
  const orgUnitSelection = sanitizeOrgUnits(scorecard);
  return produce(scorecard, (draft) => {
    set(draft, "orgUnitSelection", orgUnitSelection);
  });
}
