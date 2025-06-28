import { useDataEngine } from "@dhis2/app-runtime";
import { EngineState, ScreenDimensionState } from "../state";
import { getWindowDimensions } from "../utils";

export default function useInitApp() {
	const engine = useDataEngine();

	function initializeState({ set }: any) {
		set(ScreenDimensionState, getWindowDimensions());
		set(EngineState, engine);
	}

	return {
		initializeState,
	};
}
