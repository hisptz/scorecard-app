import {useDataEngine} from "@dhis2/app-runtime";
import {useEffect, useState} from "react";


const query = (resource) => ({
    sources: {
        resource,
        params: ({page, filter}) => ({
            page,
            fields: [
                'displayName',
                'id'
            ],
            filter,
            order: 'displayName:asc'
        })
    }
})

export default function useDataSources(selectedDataSourceType, selectedGroup) {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [data, setData] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const engine = useDataEngine();


    const search =  async (keyword) =>{
        console.log(keyword);
        setLoading(true);
        try{
            setPage(1);
            setTotalPages(undefined)
            setData([])
            const response = await fetchData(1, keyword);
            setData([...response.sources?.[selectedDataSourceType.resource]])
            setTotalPages(response.sources.pager.pageCount)
            setError(undefined)
        } catch (e){
            setError(e)
        }
        setLoading(false)
    }

    const nexPage = async () => {
        if (totalPages && page < totalPages) {
            try {
                setLoading(true)
                setPage(prevPage => prevPage + 1)
                const response = await fetchData(page + 1);
                setData([...data, ...response.sources?.[selectedDataSourceType.resource]])
                setError(undefined)
                setLoading(false)
            } catch (e) {
                setError(e)
            }
        }
    }

    async function fetchData(currentPage, searchKeyword) {
        const filter = [];
        const filterType = selectedDataSourceType.filterType || 'eq'
        if (selectedGroup?.id) filter.push(`${selectedDataSourceType.groupKey}:eq:${selectedGroup.id}`)
        if (selectedDataSourceType.resource === 'dataItems') filter.push(`dimensionItemType:${filterType}:${selectedDataSourceType.dimensionItemType}`)
        if(searchKeyword) filter.push(`displayName:like:${searchKeyword}`)
        const updatedQuery = query(selectedDataSourceType.resource);
        return await engine.query(updatedQuery, {
            variables: {
                page: currentPage,
                filter,
            }
        })
    }

    useEffect(() => {
        async function fetch() {
            if (selectedDataSourceType) {
                setLoading(true)
                try {
                    setPage(1);
                    setTotalPages(undefined)
                    setData([])
                    const response = await fetchData(1);
                    setData([...response.sources?.[selectedDataSourceType.resource]])
                    setTotalPages(response.sources.pager.pageCount)
                    setError(undefined)
                } catch (e) {
                    setError(e)
                }
                setLoading(false)
            }
        }

        fetch();
    }, [selectedGroup, selectedDataSourceType])


    return {data, error, loading, nexPage, search}
}
