import { ScorecardConfig } from "@hisptz/dhis2-analytics";

export type ScorecardListItem = Pick<
	ScorecardConfig,
	"id" | "title" | "additionalLabels" | "description"
>;
