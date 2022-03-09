import { uid } from "../../shared/utils/utils";
import DataModel from "./base";
import ScorecardIndicator from "./scorecardIndicator";

export default class ScorecardIndicatorHolder extends DataModel {
  get defaults() {
    return {
      id: uid(),
      dataSources: [],
    };
  }

  constructor(attributes) {
    super(attributes);
  }

  static linkDataSource(
    holder = new ScorecardIndicatorHolder(),
    scorecardIndicator = new ScorecardIndicator()
  ) {
    return ScorecardIndicatorHolder.set(holder, "dataSources", [
      ...holder.dataSources,
      scorecardIndicator,
    ]);
  }
}
