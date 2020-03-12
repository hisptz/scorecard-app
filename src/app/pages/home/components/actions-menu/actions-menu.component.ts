import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteScorecardDialogComponent } from 'src/app/shared/dialogs/delete-scorecard-dialog/delete-scorecard-dialog.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-actions-menu',
  templateUrl: './actions-menu.component.html',
  styleUrls: ['./actions-menu.component.css']
})
export class ActionsMenuComponent implements OnInit {
  @Input() scorecard: any;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  onOpenDeleteDialog(scorecardName) {
    const dialogRef = this.dialog.open(DeleteScorecardDialogComponent, {
      width: '500px',
      data: { name: scorecardName }
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(result => {});
  }
}
