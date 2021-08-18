import {compact, find, sortBy, uniqBy} from "lodash";
import {TableSort} from "../constants/tableSort";


export function sortOrgUnitsBasedOnData({orgUnitSort, filteredOrgUnits, childrenOrgUnits}) {
    const parentTemp = [];
    const childrenTemp = [];
    for (const ou of orgUnitSort) {
        parentTemp.push(find(filteredOrgUnits, ['id', ou]))
        childrenTemp.push(find(childrenOrgUnits, ['id', ou]))
    }
    return {
        parentOrgUnits: compact(parentTemp),
        childOrgUnits: compact(childrenTemp)
    }
}


export function sortOrgUnitsBasedOnNames({sort, filteredOrgUnits, childrenOrgUnits}) {

    let childOrgUnits = childrenOrgUnits;
    let parentOrgUnits = filteredOrgUnits;

    if (sort === TableSort.ASC) {
        childOrgUnits = sortBy(childrenOrgUnits, 'displayName')
    }
    if (sort === TableSort.DESC) {
        childOrgUnits = sortBy(childrenOrgUnits, 'displayName').reverse();
    }
    if (sort === TableSort.ASC) {
        parentOrgUnits = sortBy(filteredOrgUnits, 'displayName')
    }
    if (sort === TableSort.DESC) {
        parentOrgUnits = sortBy(filteredOrgUnits, 'displayName').reverse()
    }

    return {
        childOrgUnits,
        parentOrgUnits
    }
}


export function sortDataSourcesBasedOnData({dataSort, dataSources}) {
    const temp = []
    for (const dx of dataSort) {
        temp.push(find(dataSources, ({dataSources}) => !!find(dataSources, ['id', dx])))
    }
    return uniqBy(temp, 'id');
}

export function sortDataSourcesBasedOnNames({sort, dataSources}) {
    let filteredDataSources = dataSources;
    if (sort === TableSort.ASC) {
        filteredDataSources = sortBy(dataSources, 'displayName');
    }
    if (sort === TableSort.DESC) {
        filteredDataSources = sortBy(dataSources, 'displayName').reverse();
    }

    return filteredDataSources;
}
