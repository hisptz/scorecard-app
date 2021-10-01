import {
  capitalize,
  find,
  flattenDeep,
  head,
  isEmpty,
  last,
  snakeCase,
  truncate,
} from "lodash";
import ScorecardLegend from "../../core/models/scorecardLegend";

export function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
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
  if (!isEmpty(legendDefinitions)) {
    const actualWeight = weight ?? 100; //sets 100 as the default weight
    const range = actualWeight / legendDefinitions?.length;
    const values = [];
    let legendDefinitionIterator = legendDefinitions.length - 1;
    for (let i = 0; i < actualWeight; i += range) {
      const { id } = legendDefinitions[legendDefinitionIterator];
      values.push(
        new ScorecardLegend({
          startValue: `${Math.floor(i)}`,
          endValue: `${Math.floor(i + range)}`,
          legendDefinitionId: id,
        })
      );
      legendDefinitionIterator--;
    }
    return highIsGood ? values.reverse() : values;
  }
  return [];
}

export function getHoldersFromGroups(dataGroups = []) {
  return flattenDeep(dataGroups?.map(({ dataHolders }) => dataHolders) ?? []);
}

export function getDataSourcesFromGroups(dataGroups) {
  const dataHolders = getHoldersFromGroups(dataGroups);
  return flattenDeep(dataHolders?.map(({ dataSources }) => dataSources));
}

export function getDataSourcesDisplayName(dataSources) {
  return dataSources?.length > 1
    ? `${head(dataSources)?.label} / ${last(dataSources)?.label}`
    : `${head(dataSources)?.label}`;
}

export function updatePager(pager, itemListLength) {
  const { page, pageSize } = pager;

  return {
    page,
    pageSize,
    pageCount: Math.ceil(itemListLength / pageSize),
    total: itemListLength,
  };
}

export function truncateDescription(description = "", maxLength = 100) {
  return truncate(description, { length: maxLength });
}

function getOrgUnitLevelId(orgUnitLevels, dataOrgUnitLevel) {
  return find(orgUnitLevels, ["level", dataOrgUnitLevel])?.id;
}

function findLegend(legends, value, { max, legendDefinitions }) {
  const { legendDefinitionId } =
    find(legends, (legend) => {
      if (legend) {
        const { startValue, endValue } = legend;
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

export function getLegend(
  value,
  legends,
  {
    max = 100,
    defaultLegends = [],
    orgUnitLevels = [],
    dataOrgUnitLevel,
    legendDefinitions,
  }
) {
  if (Array.isArray(legends)) {
    const allLegends = [...legends, ...defaultLegends];
    value = +value;
    return findLegend(allLegends, value, { max, legendDefinitions });
  }
  if (typeof legends === "object") {
    const orgUnitLevelId = getOrgUnitLevelId(orgUnitLevels, dataOrgUnitLevel);
    if (orgUnitLevelId) {
      const orgUnitLegends = legends[orgUnitLevelId];
      return findLegend(orgUnitLegends, value, { max, legendDefinitions });
    }
  }
}
