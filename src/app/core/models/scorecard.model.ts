interface Scorecard {
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

interface OrgUnitSelection {
  /**
   * TODO: There may be couple of implementation that needs additional options
   * eg. 1. BRN use case
   *     2. Population use cases, usually population are provided on district level
   */
  items: Array<{ id: string; name: string; type: string }>;
}

interface PeriodSelection {
  /**
   * TODO: there may be more
   */
  items: Array<{ id: string; name: string; type: string }>;
}

// Predefined values for averageDisplayType
enum RecordsDisplayType {   // Merge AveragedisplayType and shown_records
  ALL = 'ALL',
  BELOW_AVERAGE = 'BELOW_AVERAGE',
  ABOVE_AVERAGE = 'ABOVE_AVERAGE',
  TOP_THREE = 'TOP_THREE',
  TOP_FIVE = 'TOP_FIVE',
  TOP_TEN  = 'TOP_TEN'
}

interface ScorecardOptions {
  isEditable: boolean;
  displayOptions: ScorecardDisplayOptions;
  isRankPositionLast?: boolean;
  footerOptions?: ScorecardFooterOptions;
  recordsDisplayType?: RecordsDisplayType;
}
interface ScorecardDisplayOptions {
  showAverageInRow?: boolean;
  showAverageInColumn: boolean;
  showLeagueTable?: boolean;
  showLeagueTableAll?: boolean; // TODO: Need to understand this from user manual and come up with best name
  showDataInColumn?: boolean;
  showScore?: boolean;
  showRank?: boolean;
  showHierarchy?: boolean;
}
interface ScorecardFooterOptions {
  showGeneratedDate?: string;
  showTitle?: boolean;
}

interface Legend {
  id: string;
  endValue?: number;
  color: string;
  name: string;
  startValue?: number;
}

interface DataSelection {
  indicatorGroups: ScorecardIndicatorGroup[];
}

interface ScorecardIndicatorGroup {
  id: string;
  title: string;
  sortOrder: number;
  style: {
    backgroundColor: string; // default color: white
    color?: string; // default black
  };
  indicatorHolders: IndicatorHolder[];
}

interface IndicatorHolder {
  id: string;
  sortOrder: number;
  indicators: ScorecardIndicator[];
}
interface IndicatorHolderGroup {
  id: number;
  name: string;
  holderStyle: string;
  backgroundColor: string;
  indicatorHolderIds: number[];
}

interface ScorecardIndicator {
  id: string;
  name: string;
  title?: string;
  value: number;
  weight: number;
  legendSet: ScorecardIndicatorLegendSet[];
  calculation: string;
  isHighGood?: boolean;
  showTopArrow: boolean;
  arrowOptions: ScorecardIndicatorArrowOption[];
  labelOptions: ScorecardIndicatorLabelOptions;
  showLegend: boolean;
  functionToUse: string;
  showBottomArrow: boolean;
  bottleneckIndicators: BottleneckIndicator[];
  useBottleneckGroups: boolean;
  additionalLabelValues: ScorecardAdditionalLabel;
  bottleneckIndicatorGroups: BottleneckIndicatorGroup[];
}

interface ScorecardAccess {
  id: string;
  access: 'rw----';
}
interface ScorecardIndicatorLegendSet {
  max: number;
  min: number;
  color: string;
}
interface ScorecardIndicatorArrowOption {
  display: boolean;
  effectiveGap: number;
}
interface ScorecardIndicatorLabelOptions {
  display: boolean;
  effectiveGap: number;
}
interface BottleneckIndicator {

}
interface BottleneckIndicatorGroup {

}
interface ScorecardAdditionalLabel {

}