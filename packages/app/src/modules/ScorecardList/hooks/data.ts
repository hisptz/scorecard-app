import { useDataQuery } from "@dhis2/app-runtime";
import { ScorecardListItem } from "../types";
import { useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { chunk } from "lodash";
import { getUserAuthorityOnScorecards, UserState } from "@scorecard/shared";
import { useRecoilValue } from "recoil";

const query: any = {
	list: {
		resource: "dataStore",
		id: "hisptz-scorecard",
		params: () => {
			return {
				skipPaging: false,
				pageSize: 1000, //TODO: This is due to paging=false not working
				fields: ["id", "title", "description", "additionalLabels", "orgUnitSelection", "periodSelection", "sharing", "user", "userAccesses", "userGroupAccesses", "publicAccess"]
			};
		}
	},
	keys: {
		resource: "dataStore",
		id: "hisptz-scorecard"
	}
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
	const user = useRecoilValue(UserState);
	const { data, error, refetch, loading } =
		useDataQuery<ListDataQueryResponse>(query);
	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(8);


	const rawData = useMemo(() => {
		const entries = data?.list.entries?.filter((scorecard) => {
			const access = getUserAuthorityOnScorecards(user, scorecard);
			return access.read;
		}) ?? [];
		const keyword = searchParams.get("query");
		if (keyword) {
			return entries.filter(({ title, id, additionalLabels, description }) => {
				const searchKeywords = `${title} ${additionalLabels?.join(" ")} ${id} ${description}`;
				return searchKeywords.toLowerCase().includes(keyword.toLowerCase());
			});
		}
		return entries;
	}, [data, searchParams.get("query")]);

	const chunkedData = useMemo(() => chunk(rawData ?? [], pageSize), [pageSize, rawData]);

	const scorecards = useMemo(() => {
		return chunkedData[page - 1];
	}, [page, chunkedData]);

	const pager = useMemo(() => {
		const total = rawData.length;
		return {
			page,
			pageSize,
			total,
			pageCount: Math.ceil(total / pageSize)
		};
	}, [rawData, page, pageSize]);


	const onPageChange = (page: number) => {
		setPage(page);
	};
	const onPageSizeChange = (pageSize: number) => {
		setPage(1);
		setPageSize(pageSize);
	};

	return {
		scorecards,
		pager: {
			...pager,
			onPageChange,
			onPageSizeChange
		},
		error,
		loading,
		refetch
	};
}
