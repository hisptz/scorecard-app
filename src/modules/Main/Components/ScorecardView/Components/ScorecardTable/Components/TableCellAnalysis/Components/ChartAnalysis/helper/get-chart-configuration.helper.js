/* eslint-disable no-prototype-builtins */
/* eslint-disable max-params */
import * as _ from 'lodash';

export function getChartConfiguration(
    visualizationSettings,
    renderId,
    visualizationLayout,
    interventionName,
    customChartType,
    dataSelections
){
        const chartType = customChartType !== ''
        ? customChartType.toLowerCase()
        : visualizationSettings.chartType ? visualizationSettings.type.toLowerCase()
        : 'column';
    
 return {
     renderId: renderId,
     type:chartType,
     title:getChartTitle(visualizationSettings,interventionName),
     subtitle: visualizationSettings.hasOwnProperty('subtitle') ?
     visualizationSettings.subtitle 
     : '',
     hideTitle: visualizationSettings.hasOwnProperty('hideTitle')
     ? visualizationSettings.hideTitle : true,
     hideSubtitle:visualizationSettings.hasOwnProperty('hideSubtitle')
     ? visualizationSettings.hideSubtitle 
     : false,
     showData: visualizationSettings.hasOwnProperty('showData')
     ? visualizationSettings.showData
     : true,
     hideEmptyRows: visualizationSettings.hasOwnProperty('hideEmptyRows')
     ? visualizationSettings.hideEmptyRows
     : true,
     hideLegend: visualizationSettings.hasOwnProperty('hideLegend')
     ? visualizationSettings.hideLegend
     : true,
     cumulativeValues: visualizationSettings.hasOwnProperty('cumulativeValues')
     ? visualizationSettings.cumulativeValues
     : false,
     targetLineValue: visualizationSettings.targetLineValue
     ? visualizationSettings.targetLineValue
     : undefined,
   targetLineLabel: visualizationSettings.targetLineLabel
     ? visualizationSettings.targetLineLabel
     : '',
   baseLineValue: visualizationSettings.baseLineValue
     ? visualizationSettings.baseLineValue
     : undefined,
   baseLineLabel: visualizationSettings.baseLineLabel
     ? visualizationSettings.baseLineLabel
     : '',
    legendAlign: 'bottom',
    categoryRotation: 0,
    reverseLegend: false,
    showLabels: true,
    axes: visualizationSettings.axes ? visualizationSettings.axes : [],
    rangeAxisMaxValue: 100,
    rangeAxisMinValue: visualizationSettings.rangeAxisMinValue
      ? visualizationSettings.rangeAxisMinValue
      : undefined,
    sortOrder: visualizationSettings.hasOwnProperty('sortOrder')
      ? visualizationSettings.sortOrder
      : 0,
    percentStackedValues: visualizationSettings.hasOwnProperty(
      'percentStackedValues'
    )
      ? visualizationSettings.percentStackedValues
      : true,
    multiAxisTypes: visualizationSettings.hasOwnProperty('selectedChartTypes')
      ? visualizationSettings.selectedChartTypes
      : [],
    xAxisType: visualizationLayout.rows
      ? _.map(visualizationLayout.rows, (row) => row.dimension)
      : ['dx'],
    yAxisType:
      visualizationLayout.columns && visualizationLayout.columns[0]
        ? visualizationLayout.columns[0].dimension
        : 'ou',
    zAxisType: visualizationLayout.filters
      ? _.map(visualizationLayout.filters, (filter) => filter.dimension)
      : ['pe'],
    dataSelections,
    }

}


function getChartTitle(favoriteObject, interventionName) {
    return `${
      favoriteObject.title || favoriteObject.displayName || favoriteObject.name
    }${interventionName ? ` : ${interventionName}` : ''}`;
  }