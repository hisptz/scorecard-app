import { useDataQuery } from "@dhis2/app-runtime";
import { useEffect, useMemo, useState } from "react";

const query = {
	users: {
		resource: "users",
		params: ({ keyword }: any) => ({
			filter: [`displayName:ilike:${keyword}`],
			fields: ["id", "displayName"],
			order: "name:asc"
		})
	},
	userGroups: {
		resource: "userGroups",
		params: ({ keyword }: any) => ({
			filter: keyword ? [`displayName:ilike:${keyword}`] : undefined,
			fields: ["id", "name", "displayName"],
			order: "name:asc"
		})
	}
};

interface Response {
	users: {
		users: Array<{
			id: string;
			displayName: string;
		}>
	};
	userGroups: {
		userGroups: Array<{
			id: string;
			displayName: string;
			name: string;
		}>
	};

}

export default function useSearchUserAndUserGroup(initialKeyword: any) {
	const [keyword, setKeyword] = useState(initialKeyword);
	const { data, error, loading, refetch } = useDataQuery<Response>(query, {
		variables: { keyword },
		lazy: true
	});

	useEffect(() => {
		function search() {
			if (keyword) {
				refetch({ keyword });
			}
		}

		search();
	}, [keyword]);

	const userAndUserGroups = useMemo(() => {
		const users =
			data?.users?.users?.map((user: any) => ({
				...user,
				type: "user"
			})) || [];
		const userGroups =
			data?.userGroups?.userGroups?.map((userGroup: any) => ({
				...userGroup,
				type: "userGroup"
			})) || [];
		return [...users, ...userGroups];
	}, [data?.users, data?.userGroups]);

	return { data: userAndUserGroups, error, loading, setKeyword };
}
