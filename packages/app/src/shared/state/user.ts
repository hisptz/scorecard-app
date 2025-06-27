import { find } from "lodash";
import { atom, selector, selectorFamily } from "recoil";
import { EngineState } from "./engine";
import { ScorecardSummaryState } from "./scorecard";
import { DefaultAuthority } from "../constants";
import { getUserAuthority } from "../utils";

const userQuery = {
	user: {
		resource: "me",
		params: {
			fields: [
				"id",
				"displayName",
				"userGroups",
				"authorities",
				"organisationUnits[id,level,displayName]",
			],
		},
	},
};

export type D2User = {
	id: string;
	displayName: string;
	userGroups: Array<{ id: string }>;
	authorities: string[];
	organisationUnits: Array<{
		id: string;
		level: number;
		displayName: string;
	}>;
};

type UserQueryResponse = {
	user: D2User;
};

export const UserState = atom<D2User>({
	key: "userState",
	default: selector({
		key: "userStateSelector",
		get: async ({ get }) => {
			try {
				const engine = get(EngineState);
				if (engine) {
					const { user } = (await engine.query(
						userQuery,
					)) as UserQueryResponse;

					console.log({ user });
					if (user) {
						return user;
					}
					return null;
				}
			} catch (e) {
				console.error(e);
			}
		},
	}),
});

export const UserAuthorityOnScorecard = selectorFamily({
	key: "user-scorecard-authority",
	get:
		(scorecardId) =>
		({ get }) => {
			const scorecardSummary = find(get(ScorecardSummaryState), [
				"id",
				scorecardId,
			]);
			const user = get(UserState);
			return getUserAuthority(user, scorecardSummary) ?? DefaultAuthority;
		},
});
