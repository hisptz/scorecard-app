import { useDataQuery } from "@dhis2/app-runtime";
import { ScorecardListItem } from "../types";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { DATASTORE_NAMESPACE } from "../../../shared";
import { useDebounceCallback } from "usehooks-ts";

const defaultKeys = ["savedObjects", "scorecard-summary", "settings"];

const query = {
	list: {
		resource: "dataStore",
		id: DATASTORE_NAMESPACE,
		params: ({
			page,
			pageSize,
			keyword,
		}: {
			page: number;
			pageSize: number;
			keyword?: string;
		}) => {
			return {
				pageSize,
				page,
				fields: [
					"id",
					"title",
					"description",
					"additionalLabels",
					"orgUnitSelection",
					"periodSelection",
				],
				filter: keyword
					? [
							`title:ilike:${keyword}`,
							`subtitle:ilike:${keyword}`,
							`description:ilike:${keyword}`,
					  ]
					: undefined,
				rootJunction: "or",
			};
		},
	},
	keys: {
		resource: "dataStore",
		id: DATASTORE_NAMESPACE,
	},
};

type ListDataQueryResponse = {
	list: {
		pager: {
			page: number;
			pageSize: number;
		};
		entries: Array<ScorecardListItem>;
	};
	keys: string[];
};

export function useScorecardListData() {
	const [searchParams, setSearchParams] = useSearchParams();
	const { data, error, refetch, loading, called } =
		// @ts-expect-error Query type issues
		useDataQuery<ListDataQueryResponse>(query, {
			variables: {
				page: searchParams.get("page") ?? 1,
				pageSize: searchParams.get("pageSize") ?? 8,
				keyword: searchParams.get("query"),
			},
			lazy: true,
		});

	const scorecards = useMemo(() => {
		return data?.list?.entries ?? [];
	}, [data?.list?.entries]);

	const debounceSearch = useDebounceCallback((keyword: string | null) => {
		refetch({
			keyword,
			page: 1,
			pageSize: 8,
		});
	}, 1000);

	const pager = useMemo(() => {
		const total =
			data?.keys?.filter((key) => !defaultKeys.includes(key)).length ?? 0;
		return {
			page:
				data?.list?.pager?.page ??
				parseInt(searchParams.get("page") ?? "1"),
			pageSize:
				data?.list?.pager?.pageSize ??
				parseInt(searchParams.get("pageSize") ?? "8"),
			pageCount: Math.ceil(total / (data?.list?.pager?.pageSize ?? 8)),
			total,
		};
	}, [data]);

	const onPageChange = (page: number) => {
		setSearchParams((prev) => {
			const updatedParams = new URLSearchParams(prev);
			updatedParams.set("page", page.toString());
			return updatedParams;
		});
	};
	const onPageSizeChange = (pageSize: number) => {
		setSearchParams((prev) => {
			const updatedParams = new URLSearchParams(prev);
			updatedParams.set("pageSize", pageSize.toString());
			updatedParams.set("page", "1");
			return updatedParams;
		});
	};

	useEffect(() => {
		refetch({
			keyword: searchParams.get("query"),
			page: searchParams.get("page") ?? 1,
			pageSize: searchParams.get("pageSize") ?? 8,
		});
	}, [searchParams.get("page"), searchParams.get("pageSize")]);

	useEffect(() => {
		if (called) {
			debounceSearch(searchParams.get("query"));
		}
	}, [searchParams.get("query")]);

	return {
		scorecards,
		pager: {
			...pager,
			onPageChange,
			onPageSizeChange,
		},
		error,
		loading,
		refetch,
	};
}
