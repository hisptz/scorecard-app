import produce from "immer";
import { set } from "lodash";

function sanitizeOrgUnits({ orgUnitSelection }: any) {
	const { orgUnits } = orgUnitSelection ?? {};
	return {
		...orgUnitSelection,
		orgUnits: orgUnits?.map(({ id }: any) => ({ id })),
	};
}

export default function sanitizeScorecard(scorecard: any) {
	const orgUnitSelection = sanitizeOrgUnits(scorecard);
	return produce(scorecard, (draft: any) => {
		set(draft, "orgUnitSelection", orgUnitSelection);
	});
}
