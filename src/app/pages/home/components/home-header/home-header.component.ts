import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TourService } from 'ngx-tour-md-menu';
import tourSteps from '../../../../shared/tourGuide/tour.home';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css'],
})
export class HomeHeaderComponent implements OnInit {
  @Input() paginationConfig: any;
  @Input() scorecardLength: number;
  filter: any;
  @Output() searchFilter = new EventEmitter<string>();
  @Output() changeView = new EventEmitter<string>();
  @Output() pageChange = new EventEmitter<any>();
  constructor(private tourService: TourService) {}

  ngOnInit(): void {
    this.tourService.initialize(tourSteps || []);
  }

  manageTour(event) {
    if (event) {
      this.tourService.start();
    }
  }
  // changeView() {
  //   if (this.counter > 2) {
  //     this.counter = 0;
  //   }
  //   this.nums = this.counter += 1;
  //   switch (this.nums) {
  //     case 1:
  //       this.type = 'list';
  //         break;
  //      case 2:
  //         this.type = 'thumbnails';
  //       break;
  //       case 3:
  //         this.type = 'card';
  //       break;
  //   }
  //   this.viewType.emit(this.type);
  // }
  sendSearchText(event) {
    this.searchFilter.emit(this.filter);
  }

  onChangeView(viewType: string) {
    this.changeView.emit(viewType);
  }

  onPageChange(event) {
    this.pageChange.emit({
      ...this.paginationConfig,
      itemsPerPage: event.pageSize,
      currentPage: event.pageIndex + 1,
    });
  }
}
