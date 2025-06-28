import { useDataEngine, useDataMutation } from "@dhis2/app-runtime";
import { DATASTORE_ENDPOINT } from "../../constants";
import { generateCreateMutation } from "../../utils";
import { ScorecardConfig } from "@hisptz/dhis2-scorecard";

const updateMutation = {
	type: "update",
	resource: DATASTORE_ENDPOINT,
	id: ({ id }: { id: string }) => id,
	data: ({ data }: { data: ScorecardConfig }) => data,
};

const deleteMutation = {
	type: "delete",
	resource: DATASTORE_ENDPOINT,
	id: ({ id }: { id: string }) => id,
};

export function useDeleteScorecard(id: string) {
	const [removeMutate, { loading, error: removeError }] = useDataMutation(
		// @ts-expect-error Mutation type issues
		deleteMutation,
		{ variables: { id } }
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

export function useUpdateScorecard(id: string) {
	//  @ts-expect-error Mutation type issues
	const [updateMutate, { loading }] = useDataMutation(updateMutation, {
		variables: { id },
	});

	const update = async (data: ScorecardConfig) => {
		await updateMutate({ id, data });
	};

	return {
		update,
		loading,
	};
}

export function useAddScorecard() {
	const engine = useDataEngine();
	const add = async (data: ScorecardConfig) => {
		// @ts-expect-error Mutation type issues
		await engine.mutate(generateCreateMutation(data.id), {
			variables: { data },
		});
	};

	return {
		add,
	};
}
