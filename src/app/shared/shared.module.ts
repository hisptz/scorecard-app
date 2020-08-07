import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxDhis2OrgUnitFilterModule } from '@iapps/ngx-dhis2-org-unit-filter';
import { NgxDhis2PeriodFilterModule } from '@iapps/ngx-dhis2-period-filter';
import { ColorPickerModule } from 'ngx-color-picker';
import { TourMatMenuModule } from 'ngx-tour-md-menu';

import { InfoMenuComponent } from './components/info-menu/info-menu.component';
import { LegendColorPickerComponent } from './components/legend-color-picker/legend-color-picker.component';
import { LegendDefintionListComponent } from './components/legend-defintion-list/legend-defintion-list.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { OptionsComponent } from './components/options/options.component';
import { SelectorsComponent } from './components/selectors/selectors.component';
import { SettingsMenuComponent } from './components/settings-menu/settings-menu.component';
import { DeleteScorecardDialogComponent } from './dialogs/delete-scorecard-dialog/delete-scorecard-dialog.component';
import { OrganisationUnitDialogComponent } from './dialogs/organisation-unit-dialog/organisation-unit-dialog.component';
import { PeriodDialogComponent } from './dialogs/period-dialog/period-dialog.component';
import { SharingDialogComponent } from './dialogs/sharing-dialog/sharing-dialog.component';
import { TruncatePipe } from './pipes/truncate.pipe';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatTabsModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonToggleModule,
    MatRippleModule,
    MatDialogModule,
    MatChipsModule,
    MatListModule,
    ColorPickerModule,
    MatTableModule,
    MatInputModule,
    MatStepperModule,
    NgxDhis2OrgUnitFilterModule,
    NgxDhis2PeriodFilterModule,
    TourMatMenuModule,
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatTabsModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatRippleModule,
    MatChipsModule,
    MatListModule,
    MatDialogModule,
    ColorPickerModule,
    MatStepperModule,
    OptionsComponent,
    InfoMenuComponent,
    LegendDefintionListComponent,
    LegendColorPickerComponent,
    SelectorsComponent,
    MatTableModule,
    MatIconModule,
    NgxDhis2OrgUnitFilterModule,
    NgxDhis2PeriodFilterModule,
    TruncatePipe,
    ListViewComponent,
    SettingsMenuComponent,
    TourMatMenuModule,
  ],
  declarations: [
    OptionsComponent,
    InfoMenuComponent,
    SharingDialogComponent,
    PeriodDialogComponent,
    OrganisationUnitDialogComponent,
    LegendDefintionListComponent,
    LegendColorPickerComponent,
    SelectorsComponent,
    DeleteScorecardDialogComponent,
    TruncatePipe,
    ListViewComponent,
    SettingsMenuComponent
  ],
  entryComponents: [
    SharingDialogComponent,
    PeriodDialogComponent,
    OrganisationUnitDialogComponent,
    DeleteScorecardDialogComponent,
  ],
})
export class SharedModule {}
