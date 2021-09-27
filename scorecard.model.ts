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
enum AverageDisplayType {
  ALL = "ALL",
  BELOW_AVERAGE = "BELOW_AVERAGE",
  ABOVE_AVERAGE = "ABOVE_AVERAGE",
}

interface ScorecardOptions {
  averageDisplayType: string;
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

interface ScorecardIndicator {}

interface ScorecardAccess {
  id: string;
  access: "rw----";
}
