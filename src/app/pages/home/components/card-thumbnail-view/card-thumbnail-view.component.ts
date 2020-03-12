import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/internal/operators/take';
import { DeleteScorecardDialogComponent } from 'src/app/shared/dialogs/delete-scorecard-dialog/delete-scorecard-dialog.component';

@Component({
  selector: 'app-card-thumbnail-view',
  templateUrl: './card-thumbnail-view.component.html',
  styleUrls: ['./card-thumbnail-view.component.css']
})
export class CardThumbnailViewComponent implements OnInit {
  @Input() scorecards: any;
  @Input() searchTerm: string;
  @Input() paginationConfig: any;
  @Input() viewType: string;
  @Input() viewTypes: any;

  @Output() viewScorecard: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  onViewScorecard(id: string) {
    this.viewScorecard.emit(id);
  }
}
