import {Component, OnInit, Input} from '@angular/core';
import {ScoreCard} from '../../shared/models/scorecard';

@Component({
  selector: 'svg-item',
  templateUrl: './svg-item.component.html'
})
export class SvgItemComponent implements OnInit {

  @Input() current_orgunit: any;
  @Input() indicator: any;
  @Input() scorecard: ScoreCard;
  @Input() indicator_list: any[] = [];
  @Input() period: string;
  value_key: string;
  constructor() {

  }

  ngOnInit() {
    this.value_key = this.current_orgunit.id + '.' + this.period;
  }

  // assign a background color to area depending on the legend set details
  assignBgColor(object, value): string {
    let color = '#BBBBBB';
    for ( const data of object.legendset ) {
      if (data.max === '-') {

        if (parseInt(value) >= parseInt(data.min) ) {
          color = data.color;
        }
      }else {
        if (parseInt(value) >= parseInt(data.min) && parseInt(value) <= parseInt(data.max)) {
          color = data.color;
        }
      }
    }
    return color;
  }

}