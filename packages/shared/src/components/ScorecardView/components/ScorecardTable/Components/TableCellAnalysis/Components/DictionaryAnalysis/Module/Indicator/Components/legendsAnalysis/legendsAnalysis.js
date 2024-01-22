import { useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import { CircularLoader } from "@dhis2/ui";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import Error from "../../../../Shared/Componets/Error/ErrorAPIResult";
import Loader from "../../../../Shared/Componets/Loaders/Loader";
import Legend from "./legend";
const query = {
  legendAnalysis: {
    resource: "indicators",
    id: ({ id }) => id,
    params: {
      fields: [
        "id",
        "displayName",
        "legendSets[id,displayName,legends[id,displayName,startValue,endValue,color]]",
      ],
    },
  },
};

export default function LegendsAnalysis({ id }) {
  const { loading, error, data, refetch } = useDataQuery(query, {
    variables: { id },
  });

  useEffect(() => {
    refetch({ id });
  }, [id]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Error error={error} />;
  }

  if (data?.legendAnalysis?.legendSets?.length === 0) {
    return (
      <>
        <p>There are no legends associated with these indicator</p>
      </>
    ); //no legends sets
  }

  const legendSet = data?.legendAnalysis?.legendSets;

  return (
    <div>
      <h3>{i18n.t("Legends for analysis")}</h3>
      <p>
        {i18n.t(
          "Uses {{variables}} legends for for analysis, spread accross multiple cut-off points of interest, existing legends are:",
          { variables: legendSet?.length }
        )}{" "}
      </p>
      <ul>
        {legendSet?.map((legendSet) => {
          return <Legend key={legendSet?.id} legendSet={legendSet} />;
        })}
      </ul>
    </div>
  );
}

LegendsAnalysis.PropTypes = {
  id: PropTypes.string.isRequired,
};
