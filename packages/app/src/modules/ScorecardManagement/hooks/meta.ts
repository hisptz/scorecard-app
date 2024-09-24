import { DATASTORE_NAMESPACE, getUserAuthority, UserState } from "@scorecard/shared";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDataQuery } from "@dhis2/app-runtime";
import { useFormSchema } from "./schema";
import { uid } from "@hisptz/dhis2-utils";
import i18n from "@dhis2/d2-i18n";
import { ScorecardConfig } from "@hisptz/dhis2-analytics";
import { useRecoilValue } from "recoil";
import { getSharingSettingsFromOldConfiguration } from "../../../utils/sharing";

const query: any = {
	scorecard: {
		resource: `dataStore/${DATASTORE_NAMESPACE}`,
		id: ({ id }: { id: string }) => id

	}
};

const getDefaultValue = (user: { id: string }): Partial<ScorecardConfig> => ({
	id: uid(),
	title: "",
	additionalLabels: [],
	customHeader: undefined,
	description: undefined,
	subtitle: undefined,
	periodSelection: {
		periods: [],
		type: undefined
	},
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
	},
	sharing: {
		external: false,
		owner: user.id,
		users: {},
		userGroups: {},
		public: "rw------"
	}
});

export default function useScorecardFormMetadata() {
	const user = useRecoilValue(UserState);
	const { id } = useParams<{ id: string }>();
	const { refetch: getScorecard, data } = useDataQuery<{ scorecard: ScorecardConfig }>(query, {
		variables: {
			id
		},
		lazy: true
	});
	const schema = useFormSchema();
	const form = useForm<ScorecardConfig>({
		shouldFocusError: true,
		defaultValues: async () => {
			if (id) {
				const scorecardDefaultValues = await getScorecard() as { scorecard: ScorecardConfig };

				const defaultValue = scorecardDefaultValues.scorecard;

				if (!defaultValue.sharing) {
					//Let's populate the new sharing object
					defaultValue.sharing = getSharingSettingsFromOldConfiguration(defaultValue as any);
				}

				console.log(defaultValue);

				return defaultValue;
			}
			return getDefaultValue(user) as ScorecardConfig;
		},
		mode: "onSubmit",
		reValidateMode: "onSubmit",
		resolver: zodResolver(schema)
	});

	return {
		form,
		access: data ? getUserAuthority(user, data?.scorecard.sharing ?? getSharingSettingsFromOldConfiguration(data?.scorecard)) : undefined
	};
}
