import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view.component';
import { ViewHeaderComponent } from './components/view-header/view-header.component';
import { ViewTitleAreaComponent } from './components/view-title-area/view-title-area.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


const routes: Routes = [
  {
    path: '',
    component: ViewComponent
  }
];

@NgModule({
  declarations: [ViewComponent, ViewHeaderComponent, ViewTitleAreaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ViewModule { }
