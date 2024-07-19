import { useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import _ from "lodash";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import Error from "../../../../Shared/Componets/Error/ErrorAPIResult";
import IndicatorCount from "../../../../Shared/Componets/IndicatorCount";
import Loader from "../../../../Shared/Componets/Loaders/Loader";
import {
	indicatorGroupAggregateDataElements,
	indicatorGroupDataSets,
	indicatorGroupProgramDataElements,
	indicatorGroupPrograms,
} from "../../../../Store/IndicatorGroup";

const query = {
	sources: {
		resource: "indicatorGroups",
		id: ({ id }: any) => id,
		params: {
			fields: ["indicators"],
		},
	},
};

export default function Facts({ id }: any) {
	const { loading, error, data, refetch } = useDataQuery(query, {
		variables: { id },
	});

	useEffect(() => {
		refetch({ id });
	}, [id]);

	let dataSets: any = useRecoilValue(indicatorGroupDataSets);
	let programs: any = useRecoilValue(indicatorGroupPrograms);
	let programDtEl: any = useRecoilValue(indicatorGroupProgramDataElements);
	let dataElements: any = useRecoilValue(indicatorGroupAggregateDataElements);

	if (loading) {
		return <Loader text={""} />;
	}
	if (error) {
		return <Error error={error} />;
	}

	dataSets = _.uniqWith(dataSets, _.isEqual);
	programs = _.uniqWith(programs, _.isEqual);
	dataElements = _.uniqWith(dataElements, _.isEqual);

	programDtEl = programDtEl.map((e: any) => {
		return { id: e.split(".")[1] ?? "" };
	});
	dataElements = dataElements.map((e: any) => {
		return { id: e };
	});

	const allDataElements = [...programDtEl, ...dataElements];

	return (
		<div>
			<h3>{i18n.t("Indicator group Facts")}</h3>

			<ul>
				<li>
					{" "}
					{i18n.t(" It has {{variables}} indicators", {
						variables: data?.sources?.indicators?.length,
					})}{" "}
				</li>
				<li>
					{i18n.t(
						" It’s data elements belongs to {{variables}} datasets and {{variables2}} program sources of data",
						{
							variables: dataSets?.length,
							variables2: programs?.length,
						},
					)}
				</li>
				<li>
					<IndicatorCount dataElementsArray={allDataElements} />
				</li>
			</ul>
		</div>
	);
}
