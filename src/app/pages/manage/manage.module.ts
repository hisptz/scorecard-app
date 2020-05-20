import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SharedModule } from 'src/app/shared/shared.module';

import { ManageHeaderComponent } from './components/manage-header/manage-header.component';
import { ManageComponent } from './containers/manage/manage.component';
import { ManageRoutingModule } from './manage-routing.module';

@NgModule({
  declarations: [ManageComponent, ManageHeaderComponent],
  imports: [CommonModule, ManageRoutingModule, SharedModule, CKEditorModule],
})
export class ManageModule {}
