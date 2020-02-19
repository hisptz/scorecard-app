import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  selectorButtonsToShow = ['sharing', 'period', 'orgunit'];
  constructor() { }

  ngOnInit() {
  }
}
