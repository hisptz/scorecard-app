import { defaultsDeep } from "lodash";

export default class FormFieldModel {
  constructor(attributes = {}) {
    defaultsDeep(this, attributes, this.defaults);
  }
  get defaults() {
    return {};
  }
}
