import ScorecardIndicatorHolder from "./scorecardIndicatorHolder";

export default class ScorecardIndicatorGroup {
  constructor(indicatorGroup) {
    this.indicatorGroup = indicatorGroup;
  }

  get id() {
    return this.indicatorGroup ? this.indicatorGroup.id : undefined;
  }

  get title() {
    return this.indicatorGroup ? this.indicatorGroup.title : undefined;
  }

  get sortOrder() {
    return this.indicatorGroup ? this.indicatorGroup.sortOrder : 0;
  }

  get indicatorHolders() {
    return (
      this.indicatorGroup ? this.indicatorGroup.indicatorHolders : []
    ).map((indicatorHolder) => new ScorecardIndicatorHolder(indicatorHolder));
  }

  get style() {
    return this.indicatorGroup && this.indicatorGroup.style
      ? this.indicatorGroup.style
      : {
          backgroundColor: "#fffffff",
          color: "#000",
        };
  }
}
