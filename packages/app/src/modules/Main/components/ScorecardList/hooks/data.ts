import { useDataQuery } from "@dhis2/app-runtime";
import { ScorecardListItem } from "../types";
import { useSearchParams } from "react-router-dom";
import { useMemo, useRef } from "react";
import { debounce } from "lodash";
import { useUpdateEffect } from "usehooks-ts";

const query: any = {
	list: {
		resource: "dataStore",
		id: "hisptz-scorecard",
		params: ({
			keyword,
			page,
			pageSize,
		}: {
			keyword: string;
			page: number;
			pageSize: number;
		}) => {
			return {
				filter: keyword
					? ["title", "description", "additionalLabels"].map(
							(key) => `${key}:ilike:${keyword}`,
						)
					: undefined,
				rootJunction: "or",
				page,
				pageSize,
				fields: ["id", "title", "description", "additionalLabels"],
			};
		},
	},
	keys: {
		resource: "dataStore",
		id: "hisptz-scorecard",
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
	const [searchParams] = useSearchParams();
	const { data, error, refetch, loading } =
		useDataQuery<ListDataQueryResponse>(query, {
			variables: {
				keyword: searchParams.get("query"),
				page: 1,
				pageSize: 8,
			},
		});

	const scorecards = useMemo(() => {
		return data?.list?.entries;
	}, [data]);

	const pager = useMemo(() => {
		const keys =
			data?.keys?.filter(
				(key) =>
					!["savedObjects", "settings", "scorecard-sumary"].includes(
						key,
					),
			) ?? [];

		return {
			...(data?.list?.pager ?? {}),
			total: keys.length,
			totalPages: Math.ceil(
				keys.length / (data?.list.pager.pageSize ?? 1),
			),
		};
	}, [data]);

	const onSearch = useRef(
		debounce((keyword?: string | null) => {
			if (keyword) {
				refetch({
					keyword,
					page: 1,
					pageSize: 10,
				});
			} else {
				refetch({
					keyword: undefined,
					page: 1,
					pageSize: 10,
				});
			}
		}, 800),
	);

	const onPageChange = (page: number) => {
		refetch({
			page,
		});
	};
	const onPageSizeChange = (pageSize: number) => {
		refetch({
			pageSize,
			page: 1,
		});
	};

	useUpdateEffect(() => {
		onSearch.current(searchParams.get("query"));
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
