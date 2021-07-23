import {useDataEngine} from "@dhis2/app-runtime";
import {atom, selector} from "recoil";
import getCustomFunctions from "../../shared/services/getCustomFunctions";
import {EngineState} from "./engine";

const customFunctionsKeysQuery = {
    keys: {
        resource: 'dataStore/functions'
    }
}

export const CustomFunctionsKeysState = atom({
    key: 'customFunctionsKeys',
    default: selector({
        key: 'customFunctionKeysSelector',
        get: async () => {
            try {
                const engine = useDataEngine();
                const {keys} = await engine.query(customFunctionsKeysQuery)
                if (keys) return keys;
                return []
            } catch (e) {
                console.log(e)
                return []
            }
        }
    })
})

export const CustomFunctionsState = atom({
    key: 'customFunctions',
    default: selector({
        key: 'customFunctionsSelector',
        get: async ({get}) => {
            const engine = get(EngineState)
            const customFunctionKeys = get(CustomFunctionsKeysState)
            return await getCustomFunctions(customFunctionKeys, engine)
        }
    })
})
