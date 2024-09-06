import { DATASTORE_NAMESPACE, ScorecardConfig } from "@scorecard/shared";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDataQuery } from "@dhis2/app-runtime";
import { useGetScorecardSharingSettings } from "../../ScorecardList/hooks/authority";
import { useEffect, useState } from "react";
import { useFormSchema } from "./schema";
import { uid } from "@hisptz/dhis2-utils";
import i18n from "@dhis2/d2-i18n";

const query: any = {
	scorecard: {
		resource: `dataStore/${DATASTORE_NAMESPACE}`,
		id: ({ id }: { id: string }) => id

	}
};

const defaultValue: Partial<ScorecardConfig> = {
	id: uid(),
	legendDefinitions: [
		{
			color: "#D3D3D3",
			name: i18n.t("N/A"),
			isDefault: true,
			id: "N/A"
		},
		{
			color: "#FFFFFF",
			name: i18n.t("No Data"),
			isDefault: true,
			id: "No Data"
		},
		{
			id: uid(),
			color: "#008000",
			name: i18n.t("Target Reached/ On Track")
		},
		{
			id: uid(),
			color: "#FFFF00",
			name: i18n.t("Progress, but more effort required")
		},
		{
			id: uid(),
			color: "#FF0000",
			name: i18n.t("Not on track")
		}
	],
	options: {
		averageDisplayType: "ALL",
		legend: true,
		title: true,
		itemNumber: true,
		emptyRows: true,
		showHierarchy: false,
		averageColumn: false,
		averageRow: false,
		highlightedIndicators: false,
		arrows: false,
		showDataInRows: false
	},
	orgUnitSelection: {
		levels: [],
		groups: [],
		orgUnits: [],
		userSubX2Unit: false,
		userSubUnit: false,
		userOrgUnit: false
	},
	highlightedIndicators: [],
	dataSelection: {
		dataGroups: []
	}
};


export default function useScorecardFormMetadata() {
	const { id } = useParams<{ id: string }>();
	const [access, setAccess] = useState<{ read: boolean; write: boolean } | null>(null);
	const { refetch } = useDataQuery<{ scorecard: ScorecardConfig }>(query, {
		variables: {
			id
		},
		lazy: true
	});
	const schema = useFormSchema();
	const getAccess = useGetScorecardSharingSettings();
	const form = useForm<ScorecardConfig>({
		shouldFocusError: true,
		defaultValues: async () => {
			if (id) {
				const scorecardDefaultValues = await refetch() as { scorecard: ScorecardConfig };
				return scorecardDefaultValues.scorecard;
			}
			return defaultValue as ScorecardConfig;
		},
		mode: "onSubmit",
		reValidateMode: "onSubmit",
		resolver: zodResolver(schema)
	});

	async function getScorecardAccess() {
		setAccess(await getAccess(id!));
	}

	useEffect(() => {
		if (id) {
			getScorecardAccess();
		} else {
			setAccess({ read: true, write: true });
		}
	}, [id]);

	return {
		form,
		access
	};
}
