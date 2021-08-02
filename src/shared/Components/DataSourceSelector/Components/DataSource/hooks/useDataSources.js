import {useDataEngine} from "@dhis2/app-runtime";
import {filter, flattenDeep} from 'lodash'
import {useEffect, useMemo, useState} from "react";
import {useRecoilValueLoadable} from "recoil";
import {CustomFunctionsState} from "../../../../../../core/state/customFunctions";


export default function useDataSources(selectedDataSourceType, selectedGroup) {
    const customFunctions = useRecoilValueLoadable(CustomFunctionsState)
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [data, setData] = useState([]);
    const [error, setError] = useState(customFunctions.state === 'hasError' ? customFunctions.contents : undefined);
    const [loading, setLoading] = useState(customFunctions.state === 'loading');
    const engine = useDataEngine();

    const functionRules = useMemo(() => {
        if (selectedDataSourceType.type === 'customFunction') {
            if (customFunctions.state === 'hasValue') {
                if (selectedGroup) {
                    return selectedGroup?.rules?.map((rule) => ({...rule, displayName: rule.name})) ?? []
                }
                return flattenDeep(Object.values(customFunctions?.contents)?.map(({rules}) => rules))?.map((rule) => ({
                    ...rule,
                    displayName: rule.name
                }))
            }
        }
        return []
    }, [customFunctions.state, selectedGroup, selectedDataSourceType]);

    useEffect(() => {
        setLoading(customFunctions.state === 'loading')
        if (customFunctions.state === 'hasError') {
            setError(customFunctions.contents)
        }
    }, [customFunctions.state]);

    const searchRules = (keyword) => {
        return filter(functionRules, (rule) => {
            const indexString = `${rule.name}-${rule.description}-${rule.id}`.toLowerCase()
            return indexString.match(new RegExp(keyword.toLowerCase()))
        })
    }

    const search = async (keyword) => {
        setLoading(true);
        if (selectedDataSourceType?.type === 'customFunction') {
            try {
                setPage(1);
                setTotalPages(undefined)
                setData([])
                setData(searchRules(keyword))
                setTotalPages(1)
                setError(undefined)
            } catch (e) {
                setError(e)
                setLoading(false)
            }
        } else {
            try {
                setPage(1);
                setTotalPages(undefined)
                setData([])
                const response = await fetchData(1, keyword);
                setData([...response?.data])
                setTotalPages(response.pager.pageCount)
                setError(undefined)
            } catch (e) {
                setError(e)
                setLoading(false)
            }
        }
        setLoading(false)
    }

    const nexPage = async () => {
        if (totalPages && page < totalPages) {
            if (selectedDataSourceType?.type !== 'customFunction') {
                try {
                    setLoading(true)
                    setPage(prevPage => prevPage + 1)
                    const response = await fetchData(page + 1);
                    setData([...data, ...response?.data])
                    setError(undefined)
                    setLoading(false)
                } catch (e) {
                    setLoading(false)
                    setError(e)
                }
            }
        }
    }

    async function fetchData(currentPage, searchKeyword) {
        if (searchKeyword || selectedGroup) {
            return await selectedDataSourceType.filter(engine, {page: currentPage, searchKeyword, selectedGroup})
        }
        return await selectedDataSourceType.getDataSources(engine, {page: currentPage})
    }

    useEffect(() => {
        async function fetch() {
            if (selectedDataSourceType) {
                setLoading(true)
                if (selectedDataSourceType?.type === 'customFunction') {
                    try {
                        setPage(1);
                        setTotalPages(undefined)
                        setData([])
                        setData(functionRules)
                        setTotalPages(1)
                        setError(undefined)
                    } catch (e) {
                        setLoading(false)
                        setError(e)
                    }
                } else {
                    try {
                        setPage(1);
                        setTotalPages(undefined)
                        setData([])
                        const response = await fetchData(1);
                        setData(response?.data)
                        setTotalPages(response?.pager.pageCount)
                        setError(undefined)
                    } catch (e) {
                        setLoading(false)
                        setError(e)
                    }
                }
                setLoading(false)
            }
        }

        fetch();
    }, [selectedGroup, selectedDataSourceType])


    return {data, error, loading, nexPage, search}
}
