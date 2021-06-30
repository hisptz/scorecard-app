export default class OrgUnitSelection {
  constructor(orgUnitSelection) {
    this.orgUnitSelection = orgUnitSelection;
  }

  get items() {
    return (this.orgUnitSelection ? this.orgUnitSelection.items : []).map(
      (item) => new SelectionItem(item)
    );
  }
}
