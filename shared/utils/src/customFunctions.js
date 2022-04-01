import {compact, find, findIndex, forIn, isEmpty, mergeWith, reduce, set} from "lodash";

const customFunctionQuery = {
    function: {
        resource: "dataStore/functions",
        id: ({id}) => id,
    },
};

export async function getCustomFunction(engine, id) {
    return await engine.query(customFunctionQuery, {variables: {id}})
}

export async function runCustomFunction({
                                            orgUnits,
                                            periods,
                                            rule,
                                            code,
                                            progress,
                                        }) {
    const parameters = {
        ou: orgUnits.join(";"),
        pe: periods.join(";"),
        rule,
        layout: {
            rows: ["dx"],
            column: ["ou"],
            filter: ["pe"],
        },
        progress,
    };

    return await new Promise((resolve, reject) => {
        try {
            const customFunction = Function("parameters", `${code}`);
            customFunction({
                ...parameters,
                success: resolve,
                error: (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        reject("Unknown error");
                    }
                },
            });
        } catch (e) {
            reject(e);
        }
        setTimeout(() => {
            reject("Function timed out");
        }, 60000);
    });
}


function formatData(data, {customFunction, rule}) {
    const updatedData = {...data};
    const updatedId = `${customFunction.id}.${rule.id}`;
    const dxIndex = findIndex(updatedData?.headers, {name: "dx"});
    set(updatedData, "metaData.dimensions.dx", [updatedId]);
    updatedData[`metaData`]['items'][updatedId] = {name: `${customFunction.name} - ${rule.name}`};
    updatedData["metaData"]["names"] = {};
    forIn(updatedData?.[`metaData`]?.['items'], (value, key) => {
        updatedData[`metaData`]['names'][key] = value?.name
    });
    forIn(updatedData['metaData']?.['dimensions'], (value, key) => {
        updatedData["metaData"][key] = value;
    })
    set(updatedData, "rows", updatedData?.rows?.map(row => {
        const updatedRow = [...row];
        set(updatedRow, dxIndex, updatedId);
        return updatedRow;
    }))
    return updatedData;
}

export async function evaluateCustomFunction({
                                                 customFunction,
                                                 ruleId,
                                                 orgUnits,
                                                 periods,
                                             }) {
    try {
        if (customFunction) {
            const rule = find(customFunction?.rules, {id: ruleId});
            if (rule) {
                const data = await runCustomFunction({
                    orgUnits,
                    periods,
                    rule: {...rule, json: typeof rule.json === "string" ? JSON.parse(rule.json) : rule.json},
                    code: customFunction?.function ?? "",
                    progress: () => {
                    },
                });

                //This is under the assumption a custom function returns analytics object with only one dx value
                if (data) {
                    return formatData(data, {customFunction, rule})
                }
            }
        }
    } catch (error) {
        console.error(error);
        return null;
    }
    return null;
}

async function getCustomFunctionData(
    item,
    engine,
    {periods, orgUnits}
) {
    try {
        if (item) {
            const [functionId, ruleId] = item?.split(".") ?? [];
            const {function: customFunction} = await getCustomFunction(engine, functionId) ?? {};

            return await evaluateCustomFunction({customFunction, ruleId, periods, orgUnits});
        }
    } catch (e) {
        console.error(e);
    }
}

export async function getCustomFunctionAnalytics(engine, {
    functions,
    periods,
    orgUnits,
}) {
    try {
        if (functions && !isEmpty(functions)) {
            const responses = compact(
                await Promise.all(
                    functions.map((customFunction) =>
                        getCustomFunctionData(customFunction, engine, {
                            periods,
                            orgUnits,
                        })
                    )
                )
            );
            return reduce(responses, (acc, response) => {
                return mergeWith(acc, response, (objValue, srcValue) => {
                    if (Array.isArray(objValue)) {
                        return objValue.concat(srcValue);
                    }
                });
            }, {})
        }
    } catch (e) {
        console.error(e);
    }
}
