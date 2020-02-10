import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';

@Component({
  selector: 'app-info-menu',
  templateUrl: './info-menu.component.html',
  styleUrls: ['./info-menu.component.css']
})
export class InfoMenuComponent implements OnInit {
  @ViewChild(MatMenuTrigger, {static: false}) trigger: MatMenuTrigger;
  constructor() { }

  ngOnInit() {
  }
  handleQnMenu(op: string) {
    if(op === 'open') {
      this.trigger.openMenu();
    } else {
      this.trigger.closeMenu();
    }
  }

}
