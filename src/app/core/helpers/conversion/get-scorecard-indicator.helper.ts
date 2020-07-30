import { ScorecardIndicator, ScorecardIndicatorArrowOptions, ScorecardIndicatorLabelOptions } from '../../models/scorecard.model';

export function getScorecardIndicator(oldIndicator): ScorecardIndicator {
  const indicator: ScorecardIndicator = {
    id: '',
    name: '',
    value: 0,
    weight: 0,
    legendSet: [],
    calculation: '',
    loading: false,
    showTopArrow: false,
    arrowOptions: null,
    showLegend: false,
    functionToUse: '',
    showBottomArrow: false,
    bottleneckIndicators: [],
    useBottleneckGroups: false,
    bottleneckIndicatorGroups: [],
  };
  if (oldIndicator) {
      indicator.id = oldIndicator.id ? oldIndicator.id : '';
      indicator.name = oldIndicator.name ? oldIndicator.name : '';
      indicator.value = oldIndicator.id ? oldIndicator.id : '';
      indicator.values = oldIndicator.values ? oldIndicator.values : [];
      indicator.weight = oldIndicator.weight ? oldIndicator.weight : 0;
      indicator.loading = oldIndicator.loading ? true : false;
      indicator.isHighGood = oldIndicator.high_is_good ? true : false;
      indicator.tooltip = oldIndicator.tooltip ? oldIndicator.tooltip : [];
      indicator.legendSet = oldIndicator.legendset ? oldIndicator.legendset : [];
      indicator.calculation = oldIndicator.calculation ? oldIndicator.calculation : '';
      indicator.showTopArrow = oldIndicator.showTopArrow ? true : false;
      indicator.showBottomArrow = oldIndicator.showBottomArrow ? true : false;
      indicator.showLegend = oldIndicator.legend_display ? true : false;
      indicator.functionToUse = oldIndicator.function_to_use ? oldIndicator.function_to_use : '';
      indicator.useBottleneckGroups = oldIndicator.use_bottleneck_groups ? true : false;
      indicator.additionalLabelValues = oldIndicator.additional_label_values ? oldIndicator.additional_label_values : '';
      indicator.arrowOptions = getArrowOptions(oldIndicator?.arrow_settings);
      indicator.labelOptions = getArrowOptions(oldIndicator?.label_settings);

      return {...{}, ...indicator};
  }
  return null;
}
function getArrowOptions(settings): ScorecardIndicatorArrowOptions  {
   const options: ScorecardIndicatorArrowOptions = {show: false, effectiveGap: 0}
  if(settings) {
     options.show = settings.display ? true : false;
     options.effectiveGap = settings.effective_gap ? settings.effective_gap : 0;
  }
  return options;
}
function getALabelOptions(settings): ScorecardIndicatorArrowOptions  {
  const options: ScorecardIndicatorLabelOptions = {show: false, effectiveGap: 0}
 if(settings) {
    options.show = settings.display ? true : false;
    options.effectiveGap = settings.effective_gap ? settings.effective_gap : 0;
 }
 return options;
}
