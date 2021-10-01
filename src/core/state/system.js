import { atom, selector } from "recoil";
import { EngineState } from "./engine";

const systemSettingsKeys = ["keyCalendar"];

const systemSettingsQuery = {
  system: {
    resource: "systemSettings",
    params: ({ keys }) => ({
      keys: keys?.map((key) => `key=${key}`),
    }),
  },
};

export const SystemSettingsState = atom({
  key: "system-settings-state",
  default: selector({
    key: "system-settings-selector",
    get: async ({ get }) => {
      const engine = get(EngineState);
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
