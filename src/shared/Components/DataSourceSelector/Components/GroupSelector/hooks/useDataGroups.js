import {useDataEngine} from "@dhis2/app-runtime";
import {useEffect, useMemo, useState} from "react";
import {useRecoilValueLoadable} from "recoil";
import {CustomFunctionsState} from "../../../../../../core/state/customFunctions";


export default function useDataGroups(initialSelectedDataType) {
    const customFunctionsState = useRecoilValueLoadable(CustomFunctionsState)
    const [data, setData] = useState();
    const [loading, setLoading] = useState(customFunctionsState.state === "loading");
    const [error, setError] = useState();
    const engine = useDataEngine()
    const query = {
        groups: {
            resource: initialSelectedDataType?.groupResource,
            params: {
                fields: [
                    'displayName',
                    'id',
                    `${initialSelectedDataType.resource}[displayName,id]`
                ]
            }
        }
    }

    const customFunctions = useMemo(() => {
        if (customFunctionsState.state === 'hasValue') {
            return Object.values(customFunctionsState?.contents)
        }
    }, [customFunctionsState.state])

    useEffect(() => {
        setLoading(customFunctionsState.state === 'loading');
        if (customFunctionsState.state === 'hasError') setError(customFunctionsState.contents)
    }, [customFunctionsState.state])

    useEffect(() => {
        async function fetch() {
            if (initialSelectedDataType.type === 'customFunction') {
                setData(customFunctions)
            } else {
                if (initialSelectedDataType && initialSelectedDataType.groupResource) {
                    setLoading(true)
                    try {
                        const response = await engine.query(query)
                        if (response) {
                            setData(response.groups?.[`${initialSelectedDataType.groupResource}`])
                        }

                    } catch (e) {
                        setError(e);
                    }
                    setLoading(false)
                }
            }
        }

        fetch();
    }, [initialSelectedDataType]);

    return {loading, groups: data, error}
}

