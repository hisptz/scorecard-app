import ScorecardIndicator from "./scorecardIndicator";

export default class ScorecardIndicatorHolder {
  constructor(indicatorHolder) {
    this.indicatorHolder = indicatorHolder;
  }

  get id() {
    return this.indicatorHolder ? this.indicatorHolder.id : undefined;
  }

  get sortOrder() {
    return this.indicatorHolder ? this.indicatorHolder.sortOrder : 0;
  }

  get indicators() {
    return (this.indicatorHolder ? this.indicatorHolder.indicators : []).map(
      (indicator) => new ScorecardIndicator(indicator)
    );
  }
}
