import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { containers } from './containers';
import { components } from './components';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TourMatMenuModule } from 'ngx-tour-md-menu';

@NgModule({
  declarations: [...containers, ...components],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    SharedModule,
    HomeRoutingModule,
    TourMatMenuModule
  ]
})
export class HomeModule {}
