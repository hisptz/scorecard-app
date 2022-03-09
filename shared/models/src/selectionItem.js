export default class SelectionItem {
  constructor(selectionItem) {
    this.selectionItem = selectionItem;
  }

  get id() {
    return this.selectionItem ? this.selectionItem.id : undefined;
  }

  get name() {
    return this.selectionItem ? this.selectionItem.name : undefined;
  }

  get type() {
    return this.selectionItem ? this.selectionItem.type : undefined;
  }
}
