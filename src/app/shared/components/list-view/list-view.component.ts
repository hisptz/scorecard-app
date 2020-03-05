import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteScorecardDialogComponent } from '../../dialogs/delete-scorecard-dialog/delete-scorecard-dialog.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'tr[app-list-view]',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
   @Input() row: any;
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
