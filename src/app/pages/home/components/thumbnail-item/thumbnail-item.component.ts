import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-thumbnail-item',
  templateUrl: './thumbnail-item.component.html',
  styleUrls: ['./thumbnail-item.component.css']
})
export class ThumbnailItemComponent implements OnInit {
  @Input() scorecard: any;

  @Output() viewScorecard: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  onViewScorecard(e) {
    e.stopPropagation();
    this.viewScorecard.emit(this.scorecard.id);
  }
}
