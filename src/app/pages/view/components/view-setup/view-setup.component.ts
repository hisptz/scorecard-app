import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-setup',
  templateUrl: './view-setup.component.html',
  styleUrls: ['./view-setup.component.css']
})
export class ViewSetupComponent implements OnInit {
  selectorButtonsToShow = ['period', 'orgunit'];
  constructor() { }

  ngOnInit(): void {
  }

}
