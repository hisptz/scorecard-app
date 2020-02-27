import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organisation-unit-dialog',
  templateUrl: './organisation-unit-dialog.component.html',
  styleUrls: ['./organisation-unit-dialog.component.css']
})
export class OrganisationUnitDialogComponent implements OnInit {
  orgUnitFilterConfig = [];
  selectedOrgUnitItems = [
    {
      'id': 'PMa2VCrupOd',
      'name': 'Kambia',
      'level': 2,
      'type': 'ORGANISATION_UNIT'
    },
    {
      'id': 'at6UHUQatSo',
      'name': 'Western Area',
      'level': 2,
      'type': 'ORGANISATION_UNIT'
    },
    {
      'id': 'TEQlaapDQoK',
      'name': 'Port Loko',
      'level': 2,
      'type': 'ORGANISATION_UNIT'
    }
  ];
  
  constructor() { }

  ngOnInit() {
  }
  onOrgUnitUpdate($event, action: string) {

  }

}
