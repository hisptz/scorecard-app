import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  displaySettings = [
    { name: 'Legend' },
    { name: 'Title' },
    { name: 'Item Number' },
    { name: 'Empty rows' },
    { name: 'Show Hierachy' },
    { name: 'League Table' },
    { name: 'Cups in indicators' }
  ];
  bestWorstSettings = [
    { name: 'All' },
    { name: 'Top Three' },
    { name: 'Top Five' },
    { name: 'Top Ten' },
    { name: 'Below Average' },
    { name: 'Above Average' }
  ];
  constructor() {}

  ngOnInit() {}
}
