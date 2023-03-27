import {
    capitalize,
    compact,
    find,
    flattenDeep,
    head,
    intersectionBy,
    isEmpty,
    last,
    reduce,
    snakeCase,
    sortBy,
    truncate,
    uniqBy,
} from "lodash";
import {ScorecardLegend} from "../models";
import {DefaultAuthority, TableSort} from "../constants";

export function getWindowDimensions() {
    const {innerWidth: width, innerHeight: height} = window;
    return {
        width: width > 1366 ? width : 1366,
        height: (height > 763 ? height : 763) - 48, //considering the appbar
    };
}

export function getDataSourceShortName(name = "") {
    return snakeCase(name)
        .split("_")
        .map((s) => capitalize(s)[0])
        .join("");
}

export function uid() {
    const letters = "abcdefghijklmnopqrstuvwxyz" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const allowedChars = "0123456789" + letters;
    const NUMBER_OF_CODEPOINTS = allowedChars.length;
    const CODESIZE = 11;
    let uid;
    uid = letters.charAt(Math.random() * letters.length);
    for (let i = 1; i < CODESIZE; ++i) {
        uid += allowedChars.charAt(Math.random() * NUMBER_OF_CODEPOINTS);
    }
    return uid;
}

export function generateRandomValues(max) {
    const maxNo = max || 100;
    return Math.floor(Math.random() * maxNo);
}

export function generateLegendDefaults(
    legendDefinitions = [],
    weight,
    highIsGood = true
) {
    let definitions = legendDefinitions;
    if (!highIsGood) {
        definitions = definitions.reverse();
    }

    if (!isEmpty(definitions)) {
        const actualWeight = weight ?? 100; //sets 100 as the default weight
        const range = actualWeight / definitions?.length;
        const values = [];
        let legendDefinitionIterator = definitions.length - 1;
        for (let i = 0; i < actualWeight; i += range) {
            const {id} = definitions[legendDefinitionIterator];
            values.push(
                new ScorecardLegend({
                    startValue: `${Math.floor(i)}`,
                    endValue: `${Math.floor(i + range)}`,
                    legendDefinitionId: id,
                })
            );
            legendDefinitionIterator--;
        }
        return values;
    }
    return [];
}


export function reverseLegends(legends) {

}

export function specificTargetsSet(dataSources) {

    return reduce(dataSources, (isSet, dataSource) => {
        return isSet || dataSource.specificTargetsSet;
    }, false)
}

export function getHoldersFromGroups(dataGroups = []) {
    return flattenDeep(dataGroups?.map(({dataHolders}) => dataHolders) ?? []);
}

export function getDataSourcesFromGroups(dataGroups) {
    const dataHolders = compact(getHoldersFromGroups(dataGroups));
    return flattenDeep(dataHolders?.map(({dataSources}) => dataSources));
}

export function getDataSourcesDisplayName(dataSources) {
    return dataSources?.length > 1
        ? `${head(dataSources)?.label} / ${last(dataSources)?.label}`
        : `${head(dataSources)?.label}`;
}

export function updatePager(pager, itemListLength) {
    const {page, pageSize} = pager;

    return {
        page,
        pageSize,
        pageCount: Math.ceil(itemListLength / pageSize),
        total: itemListLength,
    };
}

export function truncateDescription(description = "", maxLength = 100) {
    return truncate(description, {length: maxLength});
}

function getOrgUnitLevelId(orgUnitLevels, dataOrgUnitLevel) {
    return find(orgUnitLevels, ["level", dataOrgUnitLevel])?.id;
}

function findLegend(legends, value, {max, legendDefinitions}) {
    value = +value;
    if (value > max) {
        return find(legendDefinitions, {id: "N/A"})
    }
    if (isNaN(value)) {
        return find(legendDefinitions, {id: "No Data"})
    }

    const {legendDefinitionId} =
    find(legends, (legend) => {
        if (legend) {
            const {startValue, endValue} = legend;
            if (+endValue === max) {
                return (
                    +startValue <= Math.round(value) && +endValue >= Math.round(value)
                );
            }
            return (
                +startValue <= Math.round(value) && +endValue > Math.round(value)
            );
        }
        return false;
    }) ?? {};
    return find(legendDefinitions, ["id", legendDefinitionId]);
}

function getPeriodSpecificLegends(specificTarget, period) {
    if (specificTarget.items.includes(period)) {
        return specificTarget.legends;
    }
}

function getOrgUnitSpecificLegends(specificTarget, orgUnit) {
    if (specificTarget.items.includes(orgUnit)) {
        return specificTarget.legends;
    }
}

export function getLegend(
    value,
    legends,
    {
        max = 100,
        orgUnitLevels = [],
        dataOrgUnitLevel,
        legendDefinitions,
        specificTargets,
        period,
        orgUnit
    }
) {
    if (!isEmpty(specificTargets)) {
        const specificTarget = head(specificTargets);
        if (specificTarget) {
            if (specificTarget.type === "period") {
                const specificLegends = getPeriodSpecificLegends(specificTarget, period) ?? legends;
                return findLegend(specificLegends, value, {max, legendDefinitions});
            }
            if (specificTarget.type === "orgUnit") {
                const specificLegends = getOrgUnitSpecificLegends(specificTarget, orgUnit) ?? legends;
                return findLegend(specificLegends, value, {max, legendDefinitions});
            }
        }
    }

    if (Array.isArray(legends)) {
        const allLegends = [...legends];
        return findLegend(allLegends, value, {max, legendDefinitions});
    }
    if (typeof legends === "object") {
        const orgUnitLevelId = getOrgUnitLevelId(orgUnitLevels, dataOrgUnitLevel);
        if (orgUnitLevelId) {
            const orgUnitLegends = legends[orgUnitLevelId];
            return findLegend(orgUnitLegends, value, {max, legendDefinitions});
        }
    }
}

export function sortOrgUnitsBasedOnData({
                                            orgUnitSort,
                                            filteredOrgUnits,
                                            childrenOrgUnits,
                                        }) {
    const parentTemp = [];
    const childrenTemp = [];
    for (const ou of orgUnitSort) {
        parentTemp.push(find(filteredOrgUnits, ["id", ou]));
        childrenTemp.push(find(childrenOrgUnits, ["id", ou]));
    }
    return {
        parentOrgUnits: uniqBy(compact([...parentTemp, ...filteredOrgUnits]), "id"),
        childOrgUnits: uniqBy(
            compact([...childrenTemp, ...childrenOrgUnits]),
            "id"
        ),
    };
}

export function sortOrgUnitsBasedOnNames({
                                             sort,
                                             filteredOrgUnits,
                                             childrenOrgUnits,
                                         }) {
    let childOrgUnits = childrenOrgUnits;
    let parentOrgUnits = filteredOrgUnits;

    if (sort === TableSort.ASC) {
        childOrgUnits = sortBy(childrenOrgUnits, "displayName");
    }
    if (sort === TableSort.DESC) {
        childOrgUnits = sortBy(childrenOrgUnits, "displayName").reverse();
    }
    if (sort === TableSort.ASC) {
        parentOrgUnits = sortBy(filteredOrgUnits, "displayName");
    }
    if (sort === TableSort.DESC) {
        parentOrgUnits = sortBy(filteredOrgUnits, "displayName").reverse();
    }

    return {
        childOrgUnits,
        parentOrgUnits,
    };
}

export function sortDataSourcesBasedOnData({dataSort, dataSources}) {
    const temp = [];
    for (const dx of dataSort) {
        temp.push(
            find(dataSources, ({dataSources}) => !!find(dataSources, ["id", dx]))
        );
    }
    return uniqBy(temp, "id");
}

export function sortDataSourcesBasedOnNames({sort, dataSources}) {
    let filteredDataSources = dataSources;
    if (sort === TableSort.ASC) {
        filteredDataSources = sortBy(dataSources, "displayName");
    }
    if (sort === TableSort.DESC) {
        filteredDataSources = sortBy(dataSources, "displayName").reverse();
    }

    return filteredDataSources;
}

function translateAccess(access = "") {
    const translatedAccess = {
        read: false,
        write: false,
    };
    if (access.includes("r")) {
        translatedAccess.read = true;
    }
    if (access.includes("w")) {
        translatedAccess.write = true;
    }
    return translatedAccess;
}

export function getUserAuthority(user, scorecardSummary) {
    const {
        user: userId,
        userAccesses,
        userGroupAccesses,
        publicAccess,
    } = scorecardSummary ?? {};
    if (user?.id === userId) {
        return {...translateAccess("rw-----"), delete: true};
    }

    if (!isEmpty(userAccesses)) {
        const userAccess = find(userAccesses, ["id", user?.id]);
        if (userAccess) {
            return translateAccess(userAccess?.access);
        }
    }

    if (!isEmpty(userGroupAccesses)) {
        const userGroups = intersectionBy(
            [...userGroupAccesses],
            [...user.userGroups],
            "id"
        );
        if (!isEmpty(userGroups)) {
            const accesses = userGroups.map(({access}) => access);
            const translatedAccesses = accesses.map(translateAccess);

            return {
                read: reduce(
                    translatedAccesses,
                    (acc, value) => acc || value.read,
                    false
                ),
                write: reduce(
                    translatedAccesses,
                    (acc, value) => acc || value.write,
                    false
                ),
            };
        }
    }

    if (publicAccess) {
        return translateAccess(publicAccess?.access);
    }
    return DefaultAuthority;
}


export function constructAppUrl(baseUrl, config, serverVersion) {

    let appUrl = baseUrl
    const isModernServer = serverVersion.major >= 2 && serverVersion.minor >= 35
    // From core version 2.35, short_name is used instead of the human-readable title to generate the url slug
    const urlSafeAppSlug = (isModernServer ? config.name : config.title)
        .replace(/[^A-Za-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')

    // From core version 2.35, core apps are hosted at the server root under the /dhis-web-* namespace
    if (config.coreApp && isModernServer) {
        appUrl += `/dhis-web-${urlSafeAppSlug}/`
    } else {
        appUrl += `/api/apps/${urlSafeAppSlug}/`
    }

    // Prior to core version 2.35, installed applications did not properly serve "pretty" urls (`/` vs `/index.html`)
    if (!isModernServer) {
        appUrl += 'index.html'
    }
    // Clean up any double slashes
    const scheme = appUrl.substr(0, appUrl.indexOf('://') + 3)
    appUrl = scheme + appUrl.substr(scheme.length).replace(/\/+/g, '/')
    return appUrl
}
