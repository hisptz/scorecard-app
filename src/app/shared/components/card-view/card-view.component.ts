import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DeleteScorecardDialogComponent } from '../../dialogs/delete-scorecard-dialog/delete-scorecard-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent implements OnInit {
  @Input() card: any;
  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  viewScorecard() {
    this.router.navigate(['/view']);
  }
  openDeleteDialog(scorecardName) {
    const dialogRef = this.dialog.open(DeleteScorecardDialogComponent, {
      width: '500px',
      data: {name: scorecardName}
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {

    });
  }

}
