import { atom } from "recoil";
import { useDataEngine } from "@dhis2/app-runtime";

export const EngineState = atom<ReturnType<typeof useDataEngine>>({
	key: "engineState",
});
