import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view.component';
import { ViewHeaderComponent } from './components/view-header/view-header.component';
import { ViewTitleAreaComponent } from './components/view-title-area/view-title-area.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ScorecardComponent } from './components/scorecard/scorecard.component';
import { ScorecardHeaderComponent } from './components/scorecard/scorecard-header/scorecard-header.component';
import { BasicViewComponent } from './components/scorecard/basic-view/basic-view.component';


const routes: Routes = [
  {
    path: '',
    component: ViewComponent
  }
];

@NgModule({
  declarations: [ViewComponent, ViewHeaderComponent, ViewTitleAreaComponent, ScorecardComponent, ScorecardHeaderComponent, BasicViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ViewModule { }
