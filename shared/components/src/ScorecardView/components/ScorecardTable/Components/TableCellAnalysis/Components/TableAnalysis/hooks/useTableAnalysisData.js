import { Fn } from "@iapps/function-analytics";
import { useEffect, useState } from "react";

export default function useTableAnalysisData({
  orgUnits,
  periods,
  dataSources,
}) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await new Fn.Analytics()
          .setOrgUnit(orgUnits[0]?.id) //TODO: fix this
          .setPeriod(periods?.map(({ id }) => id)?.join(";"))
          .setData(dataSources?.map(({ id }) => id).join(";"))
          .get();
        setData(response);
      } catch (e) {
        setError(e);
        console.error(e);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return {
    loading,
    data,
    error,
  };
}
