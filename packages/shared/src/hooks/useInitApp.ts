import { useDataEngine } from "@dhis2/app-runtime";
import { useWebVitals } from "react-web-vitals";
import { EngineState, ScreenDimensionState } from "../state";
import { getWindowDimensions } from "../utils";

export default function useInitApp() {
	useWebVitals();
	const engine = useDataEngine();

	function initializeState({ set }: any) {
		set(ScreenDimensionState, getWindowDimensions());
		set(EngineState, engine);
	}

	return {
		initializeState
	};
}
