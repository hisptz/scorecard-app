import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-scorecard-dialog',
  templateUrl: './delete-scorecard-dialog.component.html',
  styleUrls: ['./delete-scorecard-dialog.component.css']
})
export class DeleteScorecardDialogComponent implements OnInit {
  constructor( public dialogRef: MatDialogRef<DeleteScorecardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

}
