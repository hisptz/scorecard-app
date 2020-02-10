import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  selection: string;
  description: string;
  type: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {selection: 'Groups', description: 'Hydrogen', type: 'group'},
  {selection: 'Starting Period', description: 'Hydrogen', type: 'period'},
  {selection: 'Organisation Unit', description: 'Hydrogen', type: 'organisation-unit'},
];


@Component({
  selector: 'app-sample-scorecard',
  templateUrl: './sample-scorecard.component.html',
  styleUrls: ['./sample-scorecard.component.css']
})
export class SampleScorecardComponent implements OnInit {
  displayedColumns: string[] = ['selection', 'description'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit() {
  }

}
