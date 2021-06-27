export default class ScorecardLegend {
  constructor(legend) {
    this.legend = legend;
  }

  get id() {
    return this.legend.id;
  }

  get startValue() {
    return this.legend ? this.legend.startValue : 0;
  }

  get endValue() {
    return this.legend ? this.legend.endValue : 0;
  }

  get color() {
    return this.legend ? this.legend.color : undefined;
  }

  get name() {
    this.legend ? this.legend.name : undefined;
  }
}
