import { Component, OnInit } from '@angular/core';

interface LegendDefinition {
  color: string;
  definition: string;
  canBeDeleted: boolean;
}
@Component({
  selector: 'app-legend-defintion-list',
  templateUrl: './legend-defintion-list.component.html',
  styleUrls: ['./legend-defintion-list.component.css']
})
export class LegendDefintionListComponent implements OnInit {

  legendDefinitions: LegendDefinition[] = [
      {
        color: '#008000',
        definition: 'Target achieved / on track',
        canBeDeleted: true
      },
      {
        color: '#ffff00',
        definition: 'Progress, but more effort required',
        canBeDeleted: true
      },
      {
        color: '#ff0000',
        definition: 'Not on track',
        canBeDeleted: true
      },
      {
        color: '#D3D3D3',
        definition: 'N/A',
        canBeDeleted: false
      },
      {
        color: '#FFFFFF',
        definition: 'No data',
        canBeDeleted: false
      }
  ]

  constructor() { }

  ngOnInit() {
  }

}
