import { CircularLoader } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { useDataQuery } from "@dhis2/app-runtime";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";
import { DATASTORE_OLD_SCORECARD_ENDPOINT } from "../../../shared";


const query = {
	data: {
		resource: `${DATASTORE_OLD_SCORECARD_ENDPOINT}`
	}
};

type Response = {
	data: string[]
}

export function MigrationNavigateButton() {
	const { data, loading } = useDataQuery<Response>(query);

	if (loading) {
		return (
			<CircularLoader extrasmall />
		);
	}

	if (data && !isEmpty(data)) {
		return (
			<Link style={{
				fontStyle: "italic"
			}} to={`/migrate`}>
				{i18n.t("Migrate scorecards from v1")}
			</Link>
		);
	}


	return null;
}
