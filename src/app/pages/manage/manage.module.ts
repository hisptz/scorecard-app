import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoutingModule } from './manage-routing.module';
import { ManageComponent } from './containers/manage/manage.component';
import { ManageHeaderComponent } from './components/manage-header/manage-header.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ManageComponent, ManageHeaderComponent],
  imports: [CommonModule, ManageRoutingModule, SharedModule],
})
export class ManageModule {}
