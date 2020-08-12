import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScorecardMigrationSummary } from 'src/app/core/models/scorecard-migration.model';

@Component({
  selector: 'app-scorecard-migration-summary-dialog',
  templateUrl: './scorecard-migration-summary-dialog.component.html',
  styleUrls: ['./scorecard-migration-summary-dialog.component.css']
})
export class ScorecardMigrationSummaryDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ScorecardMigrationSummaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ScorecardMigrationSummary) { }

  ngOnInit(): void {
  }

}
