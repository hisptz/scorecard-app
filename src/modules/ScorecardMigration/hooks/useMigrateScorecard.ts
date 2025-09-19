import { useCallback } from "react";
import { OldScorecardSchema } from "../schemas/old";
import { FetchError, useDataEngine } from "@dhis2/app-runtime";
import { DATASTORE_NAMESPACE, migrateScorecard } from "@/shared";
import { useSaveScorecard } from "../../ScorecardManagement/hooks/save";


const newScorecardConfigQuery: any = {
	config: {
		resource: `dataStore/${DATASTORE_NAMESPACE}`,
		id: ({ id }: { id: string }) => id
	}
};

export function useMigrateScorecard() {
	const engine = useDataEngine();
	const { saveSilently } = useSaveScorecard();

	const createNewConfiguration = useCallback(async (oldScorecard: OldScorecardSchema) => {
		return migrateScorecard({ oldScorecard, engine });
	}, [engine]);


	const migrate = useCallback(async (oldScorecard: OldScorecardSchema): Promise<"SUCCESS" | "EXISTS" | "FAILED"> => {
		const config = await createNewConfiguration(oldScorecard);
		//check if the scorecard exists
		try {
			await engine.query(newScorecardConfigQuery, {
				variables: {
					id: config?.id
				}
			});
			return "EXISTS";
		} catch (error) {
			console.log(error);
			try {
				if (error instanceof FetchError) {
					//My bad, It's not there. Let's put it
					if (config) {
						await saveSilently(config);
					}
					return "SUCCESS";
				} else {
					return "FAILED";
				}
			} catch (error) {
				return "FAILED";
			}

		}
	}, [engine]);

	return {
		migrate
	};
}
