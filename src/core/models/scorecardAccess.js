import ScorecardAccessType from "../constants/scorecardAccessType";

export default class ScorecardAccess {
  constructor(scorecardAccess) {
    this.scorecardAccess = scorecardAccess;
  }

  get id() {
    return  this.scorecardAccess ? this.scorecardAccess.id : undefined;
  }

  get access() {
    return this.scorecardAccess
      ? this.scorecardAccess.access
      : ScorecardAccessType.READ_ONLY;
  }
}
