import { Component, OnInit, Input } from '@angular/core';
import { SharingDialogComponent } from '../../dialogs/sharing-dialog/sharing-dialog.component';
import { PeriodDialogComponent } from '../../dialogs/period-dialog/period-dialog.component';
import { OrganisationUnitDialogComponent } from '../../dialogs/organisation-unit-dialog/organisation-unit-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-selectors',
  templateUrl: './selectors.component.html',
  styleUrls: ['./selectors.component.css']
})
export class SelectorsComponent implements OnInit {
  @Input() buttonsToShow: [string];
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
  openSharingDialog(): void {
    const dialogRef = this.dialog.open(SharingDialogComponent, {
      width: '1000px'
    });
  }
  openPeriodDialog(): void {
    const dialogRef = this.dialog.open(PeriodDialogComponent, {
      width: '1000px'
    });
  }
  openOrgUnitDialog() {
    const dialogRef = this.dialog.open(OrganisationUnitDialogComponent, {
      width: '1000px'
    });
  }
  canBeShown(name: string): boolean {
    return this.buttonsToShow.includes(name);
  }


}
