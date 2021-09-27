import { useDataQuery } from "@dhis2/app-runtime";
import { useEffect, useMemo, useState } from "react";

const query = {
  users: {
    resource: "users",
    params: ({ keyword }) => ({
      filter: [`displayName:ilike:${keyword}`],
      fields: ["id", "displayName"],
      order: "name:asc",
    }),
  },
  userGroups: {
    resource: "userGroups",
    params: ({ keyword }) => ({
      filter: keyword ? [`displayName:ilike:${keyword}`] : undefined,
      fields: ["id", "name", "displayName"],
      order: "name:asc",
    }),
  },
};

export default function useSearchUserAndUserGroup(initialKeyword) {
  const [keyword, setKeyword] = useState(initialKeyword);
  const { data, errors, loading, refetch } = useDataQuery(query, {
    variables: { keyword },
    lazy: true,
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
      data?.users?.users?.map((user) => ({ ...user, type: "user" })) || [];
    const userGroups =
      data?.userGroups?.userGroups?.map((userGroup) => ({
        ...userGroup,
        type: "userGroup",
      })) || [];
    return [...users, ...userGroups];
  }, [data?.users, data?.userGroups]);

  return { data: userAndUserGroups, errors, loading, setKeyword };
}
