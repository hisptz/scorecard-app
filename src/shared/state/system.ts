import { atom, selector } from "recoil";
import { EngineState } from "./engine";

const systemSettingsKeys = ["keyCalendar"];

const systemSettingsQuery = {
	system: {
		resource: "systemSettings",
		params: ({ keys }: any) => ({
			keys: keys?.map((key: any) => `key=${key}`),
		}),
	},
};

export const SystemSettingsState = atom({
	key: "system-settings-state",
	default: selector({
		key: "system-settings-selector",
		get: async ({ get }) => {
			const engine: any = get(EngineState);
			const { system } = await engine.query(systemSettingsQuery, {
				variables: { keys: systemSettingsKeys },
			});
			const { keyCalendar } = system ?? {};
			return {
				calendar: keyCalendar,
			};
		},
	}),
});
