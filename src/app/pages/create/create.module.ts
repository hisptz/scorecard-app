import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create.component';
import { CreateHeaderComponent } from './components/header/header.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SampleScorecardComponent } from './components/sample-scorecard/sample-scorecard.component';
import { TitleAreaComponent } from './components/title-area/title-area.component';
import { BasicDetailsComponent } from './components/basic-details/basic-details.component';

const routes: Routes = [
  {
    path: '',
    component: CreateComponent
  }
];

@NgModule({
  declarations: [CreateComponent, CreateHeaderComponent, SampleScorecardComponent, TitleAreaComponent, BasicDetailsComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class CreateModule { }
