import { uid } from "../../shared/utils/utils";
import DataModel from "./base";

export default class ScorecardIndicatorGroup extends DataModel {
  get defaults() {
    return {
      id: uid(),
      title: "",
      dataHolders: [],
      style: {
        backgroundColor: "#FFFFFF",
        color: "#000000",
      },
    };
  }
  constructor(attributes) {
    super(attributes);
  }
}
