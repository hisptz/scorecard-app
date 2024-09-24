import { scorecardConfigSchema } from "@scorecard/shared";
import { z } from "zod";
import i18n from "@dhis2/d2-i18n";
import { checkTitleAvailability } from "../components/General/utils/utils";
import { useParams } from "react-router-dom";
import { useDataEngine } from "@dhis2/app-runtime";
import { dataGroupSchema, dataHolderSchema, organisationUnitSelectionSchema } from "@hisptz/dhis2-analytics";


function anyOrgUnitSelected({
								groups,
								levels,
								orgUnits,
								userOrgUnit,
								userSubUnit,
								userSubX2Unit
							}: any) {
	return (
		userSubX2Unit ||
		userSubUnit ||
		userOrgUnit ||
		groups.length > 0 ||
		levels.length > 0 ||
		orgUnits.length > 0
	);
}


export function useFormSchema() {
	const { id } = useParams();
	const engine = useDataEngine();
	return scorecardConfigSchema.extend({
		title: z.string({ required_error: i18n.t("Title is required") }).min(4, i18n.t("Title must have at least 4 characters")).refine(async (value) => {
			return await checkTitleAvailability({ engine, id, title: value });
		}, {
			message: i18n.t(`A scorecard with this title already exists. Please select another title`)
		}),
		dataSelection: z.object({
			dataGroups: z.array(dataGroupSchema.extend({
				dataHolders: z.array(dataHolderSchema).min(1, i18n.t("A data group must have at least one data item"))
			})).min(1, i18n.t("A scorecard needs at least one data group"))
		}),
		orgUnitSelection: organisationUnitSelectionSchema.refine((value) => {
			return anyOrgUnitSelected(value);
		}, {
			message: i18n.t("You must select at least one organisation unit")
		}),
		additionalLabels: z.array(z.string()).optional(),
		subtitle: z.string().optional(),
		customHeader: z.string().optional(),
		description: z.string().optional()
	});
}
