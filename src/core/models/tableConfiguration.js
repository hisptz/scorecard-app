export default class TableConfiguration {
  get defaults() {
    return {
      id: "",
      title: "",
      subtitle: "",
      showColumnTotal: false,
      showColumnSubtotal: false,
      showRowTotal: false,
      showRowSubtotal: false,
      showDimensionLabels: false,
      hideEmptyRows: false,
      showHierarchy: false,
      rows: [],
      columns: [],
      filters: [],
      legendDisplayStrategy: [],
      displayList: false,
      legendSet: "",
      styles: "",
      dataSelections: [],
    };
  }
}
