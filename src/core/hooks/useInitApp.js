import {useConfig, useDataEngine} from "@dhis2/app-runtime";
import {Fn} from "@iapps/function-analytics";
import {useWebVitals} from "react-web-vitals";
import {useRecoilValue} from "recoil";
import {SystemSettingsState} from "../state/system";


export default function useInitApp() {
    useWebVitals()
    const {baseUrl, apiVersion} = useConfig()
    Fn.init({
        baseUrl: `${baseUrl}/api/${apiVersion}/`,
    });
    const engine = useDataEngine();
    return {
        engine,
    }
}
