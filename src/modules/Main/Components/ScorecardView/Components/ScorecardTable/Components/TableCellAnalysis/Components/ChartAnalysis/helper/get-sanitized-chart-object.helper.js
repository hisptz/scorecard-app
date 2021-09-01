import * as _ from 'lodash';
import { getChartExportingOptions } from './get-chart-exporting-options.helper';
export function getSanitizedChartObject(
  chartObject,
  chartConfiguration
) {
  const dataSelectionGroups = _.flatten(
    _.filter(
      _.map(chartConfiguration.dataSelections || [], (dataSelection) => {
        return dataSelection.groups;
      }),
      group => group
    )
  );

  const dataSelectionGroupMembers = _.flatten(
    _.map(dataSelectionGroups, group => {
      return _.map(group.members, (member) => `${member.id}_${group.id}`);
    })
  );

  // Remove non numeric series data and their categories
  const dataIndexesArrayToRemove = _.map(chartObject.series, seriesObject => {
    return _.filter(
      _.map(seriesObject.data, (dataItem, dataIndex) =>
        dataItem.y === '' ||
        (dataSelectionGroupMembers.length > 0 &&
          dataSelectionGroupMembers.indexOf(dataItem.id) === -1)
          ? dataIndex
          : -1
      ),
      (dataIndex) => dataIndex !== -1
    );
  });

  let newDataIndexes = [];
  _.each(dataIndexesArrayToRemove, (dataIndexes) => {
    newDataIndexes = newDataIndexes.length === 0 ? dataIndexes : newDataIndexes;
    newDataIndexes = _.intersection(newDataIndexes, dataIndexes);
  });

  const newSeries = _.map(chartObject.series, (seriesObject) => {
    return {
      ...seriesObject,
      data: _.filter(
        _.map(seriesObject.data, (dataItem) => {
          const splitedDataItemId = dataItem.id.split('_');

          const associatedGroup = _.find(dataSelectionGroups, [
            'id',
            splitedDataItemId[1]
          ]);

          // TODO: Need to find a way to generically handle color assignment from click event
          const clickedChart = (window['clickedCharts'] || {})[dataItem.id];

          if (clickedChart) {
            return { ...dataItem, color: '#f00' };
          }

          return associatedGroup &&
            _.some(
              associatedGroup.members,
              (member) => member.id === splitedDataItemId[0]
            ) &&
            associatedGroup.color
            ? { ...dataItem, color: associatedGroup.color }
            : dataItem;
        }),
        (dataItem, dataIndex) =>
          newDataIndexes.indexOf(dataIndex) === -1
      )
    };
  });

  let categoryCount = 0;
  const newCategories = _.map(chartObject.xAxis.categories, (category) => {
    if (!category.categories) {
      return category;
    }
    const newCategory = {
      ...category,
      categories: _.filter(
        category.categories,
        (innerCategory, innerCategoryIndex) =>
          newDataIndexes.indexOf(innerCategoryIndex + categoryCount) === -1
      )
    };

    categoryCount += category.categories ? category.categories.length : 0;
    return newCategory;
  });

  return {
    ...chartObject,
    series: newSeries,
    xAxis: { ...chartObject.xAxis, categories: newCategories },
    exporting: getChartExportingOptions(newCategories)
  };
}
