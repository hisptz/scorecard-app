import { ScorecardConfig, ScorecardSharing } from "@hisptz/dhis2-analytics";
import { fromPairs } from "lodash";


export function getSharingSettingsFromOldConfiguration({ user, publicAccess, userGroupAccesses, userAccesses }: ScorecardConfig & { user: { id: string }, publicAccess: { access: string; }; userAccesses: Array<{ id: string; access: string; }>; userGroupAccesses: Array<{ id: string; access: string; }> }): ScorecardSharing {

	return {
		owner: user?.id ?? "",
		public: publicAccess?.access ?? "------",
		external: false,
		users: fromPairs(userAccesses?.map(({ id, ...rest }) => ([id, { ...rest, id }])) ?? []),
		userGroups: fromPairs(userGroupAccesses?.map(({ id, ...rest }) => ([id, { ...rest, id }])) ?? [])
	};


}
