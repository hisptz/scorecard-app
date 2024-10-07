import i18n from "@dhis2/d2-i18n";

export class ScorecardAccessType {
	static READ_WRITE = "rw------";
	static READ_ONLY = "r-------";
	static NO_ACCESS = "--------";
}

export const DefaultAuthority = {
	read: false,
	write: false,
	delete: false
};

export const AccessTypes = {
	USER: "user",
	USER_GROUP: "userGroup",
	PUBLIC: "public",
	EXTERNAL: "external"
};
export const ACCESS_TYPES = [
	ScorecardAccessType.NO_ACCESS,
	ScorecardAccessType.READ_ONLY,
	ScorecardAccessType.READ_WRITE
];

export const ACCESS_NONE = {
	value: ScorecardAccessType.NO_ACCESS,
	label: i18n.t("No Access")
} as const;
export const ACCESS_VIEW_ONLY = {
	value: ScorecardAccessType.READ_ONLY,
	label: i18n.t("View Only")
} as const;
export const ACCESS_VIEW_AND_EDIT = {
	value: ScorecardAccessType.READ_WRITE,
	label: i18n.t("View and Edit")
} as const;

export const ACCESS_TYPES_LABELLED = [
	ACCESS_NONE,
	ACCESS_VIEW_ONLY,
	ACCESS_VIEW_AND_EDIT
] as const;
