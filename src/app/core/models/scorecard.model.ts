export interface Scorecard {
  id: string;
  name: string;
  title: string;
  subtitle?: string;
  description?: string;
  customHeader?: string; // TODO: Find ways to dynamically attach selected orgunit and period
  legendDefinitions: Legend[];
  dataSelection: DataSelection;
  orgUnitSelection: OrgUnitSelection;
  options: ScorecardOptions;
  periodSelection: PeriodSelection;
  highlightedIndicators: any; // TODO: Need to understand this, refer to scorecard user manual
  publicAccess: string;
  userGroupAccesses: ScorecardAccess[];
  userAccesses: ScorecardAccess[];
  user: {
    id: string;
  };
}

export interface OrgUnitSelection {
  /**
   * TODO: There may be couple of implementation that needs additional options
   * eg. 1. BRN use case
   *     2. Population use cases, usually population are provided on district level
   */
  items: Array<{ id: string; name?: string; type?: string }>;
}

export interface PeriodSelection {
  /**
   * TODO: there may be more
   */
  items: Array<{ id: string; name: string; type: string }>;
}

// Predefined values for averageDisplayType
export enum AverageDisplayType {
  ALL = 'ALL',
  BELOW_AVERAGE = 'BELOW_AVERAGE',
  ABOVE_AVERAGE = 'ABOVE_AVERAGE',
}


export interface ScorecardOptions {
  isEditable: boolean;
  displayOptions: ScorecardDisplayOptions;
  isRankPositionLast?: boolean;
  footerOptions?: ScorecardFooterOptions;
  averageDisplayType?: AverageDisplayType;
}
export interface ScorecardDisplayOptions {
  showAverageInRow?: boolean;
  showAverageInColumn?: boolean;
  showLeagueTable?: boolean;
  showLeagueTableAll?: boolean; // TODO: Need to understand this from user manual and come up with best name
  showDataInColumn?: boolean;
  showScore?: boolean;
  showRank?: boolean;
  showHierarchy?: boolean;
}
export interface ScorecardFooterOptions {
  showGeneratedDate?: boolean;
  showTitle?: boolean;
}

export interface Legend {
  id: string;
  endValue?: number;
  color: string;
  name: string;
  startValue?: number;
  default: boolean;
}

export interface DataSelection {
  indicatorGroups: ScorecardIndicatorGroup[];
}

export interface ScorecardIndicatorGroup {
  id: string;
  title: string;
  sortOrder: number;
  style: {
    backgroundColor: string; // default color: white
    color?: string; // default black
  };
  indicatorHolders: IndicatorHolder[];
}

export interface IndicatorHolder {
  id: string;
  indicators: ScorecardIndicator[];
}


export interface ScorecardIndicator {
  id: string;
  name: string;
  title?: string;
  value: number;
  values?: any[];
  loading: boolean;
  weight: number;
  tooltip?: any[];
  legendSet: ScorecardIndicatorLegendSet[];
  calculation: string;
  isHighGood?: boolean;
  showTopArrow: boolean;
  arrowOptions: ScorecardIndicatorArrowOptions;
  labelOptions?: ScorecardIndicatorLabelOptions;
  showLegend: boolean;
  functionToUse: string;
  showBottomArrow: boolean;
  bottleneckIndicators: BottleneckIndicator[];
  useBottleneckGroups: boolean;
  additionalLabelValues?: ScorecardAdditionalLabel;
  bottleneckIndicatorGroups: BottleneckIndicatorGroup[];
}

export interface ScorecardAccess {
  id: string;
  access: string;
}
interface ScorecardIndicatorLegendSet {
  max: number;
  min: number;
  color: string;
}
export interface ScorecardIndicatorArrowOptions {
  show: boolean;
  effectiveGap: number;
}
export interface ScorecardIndicatorLabelOptions {
  show: boolean;
  effectiveGap: number;
}
interface BottleneckIndicator {

}
interface BottleneckIndicatorGroup {

}
interface ScorecardAdditionalLabel {

}