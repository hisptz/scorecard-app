import { ScorecardConfig, ScorecardSharing } from "@hisptz/dhis2-scorecard";
import { fromPairs } from "lodash";

export type ScorecardConfigWithOldSharing = Partial<ScorecardConfig> & { user: { id: string }, publicAccess: { access: string; }; userAccesses: Array<{ id: string; access: string; }>; userGroupAccesses: Array<{ id: string; access: string; }> };

export function getSharingSettingsFromOldConfiguration({ user, publicAccess, userGroupAccesses, userAccesses }: ScorecardConfigWithOldSharing): ScorecardSharing {

	return {
		owner: user?.id ?? "",
		public: publicAccess?.access ?? "------",
		external: false,
		users: fromPairs(userAccesses?.map(({ id, ...rest }) => ([id, { ...rest, id }])) ?? []),
		userGroups: fromPairs(userGroupAccesses?.map(({ id, ...rest }) => ([id, { ...rest, id }])) ?? [])
	};


}
