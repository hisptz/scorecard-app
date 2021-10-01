const generateCustomFunctionQuery = (keys = []) => {
  const query = {};
  for (const key of keys) {
    query[key] = {
      resource: `dataStore/functions/${key}`,
    };
  }
  return query;
};

export default async function getCustomFunctions(keys = [], engine) {
  const query = generateCustomFunctionQuery(keys);
  return await engine.query(query);
}
