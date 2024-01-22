import SelectionItem from "./selectionItem";

export default class PeriodSelection {
  constructor(periodSelection) {
    this.periodSelection = periodSelection;
  }

  get items() {
    return (this.periodSelection ? this.periodSelection.items : []).map(
      (item) => new SelectionItem(item)
    );
  }
}
