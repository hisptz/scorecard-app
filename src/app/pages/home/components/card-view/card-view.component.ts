import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/internal/operators/take';
import { DeleteScorecardDialogComponent } from 'src/app/shared/dialogs/delete-scorecard-dialog/delete-scorecard-dialog.component';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent implements OnInit {
  @Input() card: any;
  @Input() scorecards: any;
  @Input() searchTerm: string;
  @Input() paginationConfig: any;

  @Output() viewScorecard: EventEmitter<string> = new EventEmitter<string>();
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  onViewScorecard(id: string) {
    this.viewScorecard.emit(id);
  }
  openDeleteDialog(scorecardName) {
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
