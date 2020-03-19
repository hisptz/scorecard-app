import { Component, OnInit } from '@angular/core';
import { TourService } from 'ngx-tour-md-menu';
import tourSteps from '../../../../shared/tourGuide/tour.view';

@Component({
  selector: 'app-view-header',
  templateUrl: './view-header.component.html',
  styleUrls: ['./view-header.component.css']
})
export class ViewHeaderComponent implements OnInit {

  constructor(private tourService: TourService) { }

  ngOnInit() {
    this.tourService.initialize(tourSteps || []);
  }
  manageTour(event) {
    if ( event ) {
       this.tourService.start();
    }
 }
}
