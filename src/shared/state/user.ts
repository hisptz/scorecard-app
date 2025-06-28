import { atom, selector } from "recoil";
import { EngineState } from "./engine";

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

export const UserState = atom<D2User | null>({
	key: "userState",
	default: selector<D2User | null>({
		key: "userStateSelector",
		get: async ({ get }) => {
			try {
				const engine = get(EngineState);
				if (engine) {
					const { user } = (await engine.query(
						userQuery
					)) as UserQueryResponse;
					if (user) {
						return user;
					}
					return null;
				}
				return null;
			} catch (e) {
				console.error(e);
				return null;
			}
		},
	}),
});
