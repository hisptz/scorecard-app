export default class ScorecardOption {
  constructor(scorecardOptions) {
    this.scorecardOptions = scorecardOptions;
  }

  get averageDisplayType() {
    return this.scorecardOptions
      ? this.scorecardOptions.averageDisplayType
      : undefined;
  }
}
