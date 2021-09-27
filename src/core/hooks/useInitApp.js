import { useConfig, useDataEngine } from "@dhis2/app-runtime";
import { Fn } from "@iapps/function-analytics";
import { useWebVitals } from "react-web-vitals";
import { getWindowDimensions } from "../../shared/utils/utils";
import { EngineState } from "../state/engine";
import { ScreenDimensionState } from "../state/window";

export default function useInitApp() {
  useWebVitals();
  const { baseUrl, apiVersion } = useConfig();
  Fn.init({
    baseUrl: `${baseUrl}/api/${apiVersion}/`,
  });
  const engine = useDataEngine();

  function initializeState({ set }) {
    set(ScreenDimensionState, getWindowDimensions());
    set(EngineState, engine);
  }

  return {
    initializeState,
  };
}
