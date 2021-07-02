import {uid} from "../../shared/utils/utils";
import DataModel from "./base";

export default class ScorecardIndicatorHolder extends DataModel{
  get defaults() {
    return {
      id: uid(),
      dataSources: []
    }
  }

}
