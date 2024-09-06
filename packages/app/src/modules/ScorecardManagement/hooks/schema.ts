import { scorecardConfigSchema } from "@scorecard/shared";
import { z } from "zod";
import i18n from "@dhis2/d2-i18n";
import { titleDoesNotExist } from "../components/General/utils/utils";
import { useParams } from "react-router-dom";
import { useDataEngine } from "@dhis2/app-runtime";


export function useFormSchema() {
	const { id } = useParams();
	const engine = useDataEngine();
	return scorecardConfigSchema.extend({
		title: z.string({ required_error: i18n.t("Title is required") }).min(4, i18n.t("Title must have at least 4 characters")).refine(async (value) => {
			console.log(value);
			const titleExists = await titleDoesNotExist(engine, id, value);
			return !titleExists || i18n.t(
				`A scorecard with the title '{{value}}' already exists. Please select another title`,
				{ value }
			);
		}),
		subtitle: z.string().optional(),
		customHeader: z.string().optional(),
		description: z.string().optional()
	});
}
