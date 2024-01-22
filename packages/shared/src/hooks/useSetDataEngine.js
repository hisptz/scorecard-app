import {useDataEngine} from "@dhis2/app-runtime";
import {useEffect} from "react";
import {useSetRecoilState} from "recoil";
import {EngineState} from "../state";

export default function useSetDataEngine() {
    const setEngine = useSetRecoilState(EngineState);
    const engine = useDataEngine();

    useEffect(() => {
        setEngine(engine);
    }, []);
}
