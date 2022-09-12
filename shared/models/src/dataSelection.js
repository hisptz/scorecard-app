import DataModel from "./base";

export default class DataSelection extends DataModel {
  get defaults() {
    return {
      dataGroups: [],
    };
  }
}
