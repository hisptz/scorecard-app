import { ScorecardConfig } from "@hisptz/dhis2-scorecard";

export type ScorecardListItem = Pick<
	ScorecardConfig,
	"id" | "title" | "additionalLabels" | "description" | "orgUnitSelection" | "periodSelection" | "sharing"
> & { user: { id: string }, publicAccess: { id: string; access: string; }; userAccesses: Array<{ id: string; access: string; }>; userGroupAccesses: Array<{ id: string; access: string; }> };
