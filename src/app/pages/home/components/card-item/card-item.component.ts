import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent implements OnInit {
  @Input() scorecard: any;

  @Output() viewScorecard: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  onViewScorecard(e) {
    e.stopPropagation();
    this.viewScorecard.emit(this.scorecard.id);
  }
}
