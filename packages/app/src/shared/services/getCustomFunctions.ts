const generateCustomFunctionQuery = (keys = []) => {
	const query: any = {};
	for (const key of keys) {
		query[key] = {
			resource: `dataStore/functions/${key}`,
		};
	}
	return query;
};

export default async function getCustomFunctions(keys = [], engine: any) {
	const query = generateCustomFunctionQuery(keys);
	return await engine.query(query);
}
