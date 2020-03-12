import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-legend-color-picker',
  templateUrl: './legend-color-picker.component.html',
  styleUrls: ['./legend-color-picker.component.css']
})
export class LegendColorPickerComponent implements OnInit {
  @Input() color: string;
  constructor() { }

  ngOnInit() {
  }
  onColorPickerSelect($event) {}

}
