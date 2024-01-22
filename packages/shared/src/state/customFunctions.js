import {atom, selector} from "recoil";
import {EngineState} from "./engine";
import {getCustomFunctions} from "../services";

const customFunctionsKeysQuery = {
    keys: {
        resource: "dataStore/functions",
    },
};

export const CustomFunctionsKeysState = atom({
    key: "customFunctionsKeys",
    default: selector({
        key: "customFunctionKeysSelector",
        get: async ({get}) => {
            try {
                const engine = get(EngineState);
                const {keys} = await engine.query(customFunctionsKeysQuery);
                if (keys) {
                    return keys;
                }
                return [];
            } catch (e) {
                return [];
            }
        },
    }),
});

export const CustomFunctionsState = atom({
    key: "customFunctions",
    default: selector({
        key: "customFunctionsSelector",
        get: async ({get}) => {
            const engine = get(EngineState);
            const customFunctionKeys = get(CustomFunctionsKeysState);
            return await getCustomFunctions(customFunctionKeys, engine);
        },
    }),
});
