import {
  compact,
  find,
  intersectionBy,
  isEmpty,
  reduce,
  sortBy,
  uniqBy,
} from "lodash";
import { DefaultAuthority } from "../constants/scorecardAccessType";
import { TableSort } from "../constants/tableSort";

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

export function sortDataSourcesBasedOnData({ dataSort, dataSources }) {
  const temp = [];
  for (const dx of dataSort) {
    temp.push(
      find(dataSources, ({ dataSources }) => !!find(dataSources, ["id", dx]))
    );
  }
  return uniqBy(temp, "id");
}

export function sortDataSourcesBasedOnNames({ sort, dataSources }) {
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
    return { ...translateAccess("rw-----"), delete: true };
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
      const accesses = userGroups.map(({ access }) => access);
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
