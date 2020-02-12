import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SharingDialogComponent } from 'src/app/shared/dialogs/sharing-dialog/sharing-dialog.component';
import { PeriodDialogComponent } from 'src/app/shared/dialogs/period-dialog/period-dialog.component';
import { OrganisationUnitDialogComponent } from 'src/app/shared/dialogs/organisation-unit-dialog/organisation-unit-dialog.component';

@Component({
  selector: 'app-sample-scorecard',
  templateUrl: './sample-scorecard.component.html',
  styleUrls: ['./sample-scorecard.component.css']
})
export class SampleScorecardComponent implements OnInit {
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
  openSharingDialog(): void {
    const dialogRef = this.dialog.open(SharingDialogComponent, {
      width: '250px'
    });
  }
  openPeriodDialog(): void {
    const dialogRef = this.dialog.open(PeriodDialogComponent, {
      width: '250px'
    });
  }
  openOrgUnitDialog() {
    const dialogRef = this.dialog.open(OrganisationUnitDialogComponent, {
      width: '250px'
    });
  }
}
