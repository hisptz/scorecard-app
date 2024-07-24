import { useDataEngine } from "@dhis2/app-runtime";
import { useCallback, useEffect, useState } from "react";

export default function useDataSources(
	selectedDataSourceType: any,
	selectedGroup: any,
) {
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState();
	const [data, setData] = useState<any>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<any>();
	const engine = useDataEngine();

	const fetchData = useCallback(
		async (currentPage: any, searchKeyword?: any) => {
			if (searchKeyword || selectedGroup) {
				return await selectedDataSourceType.filter(engine, {
					page: currentPage,
					searchKeyword,
					selectedGroup,
				});
			}
			return await selectedDataSourceType.getDataSources(engine, {
				page: currentPage,
			});
		},
		[engine, selectedDataSourceType, selectedGroup],
	);

	const search = useCallback(
		async (keyword: any) => {
			setLoading(true);
			try {
				setPage(1);
				setTotalPages(undefined);
				setData([]);
				const response = await fetchData(1, keyword);
				setData([...response?.data]);
				setTotalPages(response.pager.pageCount);
				setError(undefined);
			} catch (e) {
				setError(e);
				setLoading(false);
			}
			setLoading(false);
		},
		[fetchData],
	);

	const nexPage = useCallback(async () => {
		if (totalPages && page < totalPages) {
			try {
				setLoading(true);
				setPage((prevPage) => prevPage + 1);
				const response = await fetchData(page + 1);
				setData([...data, ...response?.data]);
				setError(undefined);
				setLoading(false);
			} catch (e) {
				setLoading(false);
				setError(e);
			}
		}
	}, [data, fetchData, page, totalPages]);

	useEffect(() => {
		async function fetch() {
			if (selectedDataSourceType) {
				setLoading(true);
				try {
					setPage(1);
					setTotalPages(undefined);
					setData([]);
					const response = await fetchData(1);
					setData(response?.data);
					setTotalPages(response?.pager.pageCount);
					setError(undefined);
				} catch (e) {
					setLoading(false);
					setError(e);
				}
				setLoading(false);
			}
		}

		fetch();
	}, [selectedGroup, selectedDataSourceType, fetchData]);

	return { data, error, loading, nexPage, search };
}
