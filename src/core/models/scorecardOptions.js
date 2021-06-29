export default class ScorecardOption {
  constructor(scorecardOptions) {
    this._scorecardOptions = scorecardOptions;
  }



  get averageDisplayType() {
    return this._scorecardOptions
      ? this._scorecardOptions.averageDisplayType
      : undefined;
  }


}
