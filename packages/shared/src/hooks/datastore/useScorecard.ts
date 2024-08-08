import {
	useDataEngine,
	useDataMutation,
	useDataQuery,
} from "@dhis2/app-runtime";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import useScorecardsSummary from "./useScorecardsSummary";
import { DATASTORE_ENDPOINT } from "../../constants";
import { ScorecardConfState, ScorecardRequestId } from "../../state";
import { generateCreateMutation, generateScorecardSummary } from "../../utils";

const query = {
	scorecard: {
		resource: DATASTORE_ENDPOINT,
		id: ({ id }: any) => id,
	},
};

const updateMutation: any = {
	type: "update",
	resource: DATASTORE_ENDPOINT,
	id: ({ id }: any) => id,
	data: ({ data }: any) => data,
};

const deleteMutation: any = {
	type: "delete",
	resource: DATASTORE_ENDPOINT,
	id: ({ id }: any) => id,
};

export function useDeleteScorecard(id: any) {
	const [removeMutate, { loading, error: removeError }] = useDataMutation(
		deleteMutation,
		{ variables: { id } },
	);

	const remove = async () => {
		try {
			await removeMutate({ id });
		} catch (e) {
			console.error(e);
		}
	};

	return {
		remove,
		error: removeError,
		loading,
	};
}

export function useUpdateScorecard(id: any) {
	const setScorecardRequestId = useSetRecoilState(ScorecardRequestId(id));
	const [updateMutate, { loading }] = useDataMutation(updateMutation, {
		variables: { id },
	});
	const { updateSingleScorecardSummary } = useScorecardsSummary();

	const update = async (data: any) => {
		const scorecardSummary = generateScorecardSummary(data);
		await updateSingleScorecardSummary(id, scorecardSummary);
		await updateMutate({ id, data });
		setScorecardRequestId((prevState) => prevState + 1);
	};

	return {
		update,
		loading,
	};
}

export function useAddScorecard() {
	const engine = useDataEngine();
	const { addSingleScorecardSummary } = useScorecardsSummary();

	const add = async (data: any) => {
		const scorecardSummary = generateScorecardSummary(data);
		await engine.mutate(generateCreateMutation(data?.id), {
			variables: { data },
		});
		await addSingleScorecardSummary(scorecardSummary);
	};

	return {
		add,
	};
}

export default function useScorecard(scorecardId: any) {
	const setScorecardState = useSetRecoilState(
		ScorecardConfState(scorecardId),
	);
	const { loading, data, error, refetch } = useDataQuery(query, {
		lazy: true,
	});

	const set = async (id: any) => {
		await refetch({ id });
	};

	useEffect(() => {
		function setState() {
			if (data?.scorecard) {
				setScorecardState(() => data?.scorecard);
			}
		}

		setState();
	}, [data]);

	return {
		loading,
		error,
		set,
	};
}
