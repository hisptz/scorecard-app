export default class DataSource {
  constructor({ label, type }) {
    this.label = label;
    this.type = type;
    this.getDataSources = this.getDataSources.bind(this);
    this.getGroups = this.getGroups.bind(this);
  }

  async getGroups(engine) {
    return;
  }

  async getDataSources(engine, { filter, page }) {
    return;
  }

  async filter(engine, { selectedGroup, page, searchKeyword }) {
    return;
  }
}
