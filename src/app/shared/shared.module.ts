import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { ColorPickerModule } from 'ngx-color-picker';
import { OptionsComponent } from './components/options/options.component';
import { MatRippleModule, MatDialogModule, MatListModule, MatIconModule} from '@angular/material';
import { InfoMenuComponent } from './components/info-menu/info-menu.component';
import { SharingDialogComponent } from './dialogs/sharing-dialog/sharing-dialog.component';
import { PeriodDialogComponent } from './dialogs/period-dialog/period-dialog.component';
import { OrganisationUnitDialogComponent } from './dialogs/organisation-unit-dialog/organisation-unit-dialog.component';
import { LegendDefintionListComponent } from './components/legend-defintion-list/legend-defintion-list.component';
import { LegendColorPickerComponent } from './components/legend-color-picker/legend-color-picker.component';
import { SelectorsComponent } from './components/selectors/selectors.component';



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
    MatButtonToggleModule,
    MatRippleModule,
    MatDialogModule,
    MatChipsModule,
    MatListModule,
    ColorPickerModule,
    MatTableModule,
    MatInputModule
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
    OptionsComponent,
    InfoMenuComponent,
    LegendDefintionListComponent,
    LegendColorPickerComponent,
    SelectorsComponent,
    MatTableModule,
    MatIconModule
  ],
  declarations: [OptionsComponent,
                 InfoMenuComponent,
                 SharingDialogComponent,
                 PeriodDialogComponent,
                 OrganisationUnitDialogComponent,
                 LegendDefintionListComponent,
                 LegendColorPickerComponent,
                 SelectorsComponent],
  entryComponents: [SharingDialogComponent, PeriodDialogComponent, OrganisationUnitDialogComponent]
})
export class SharedModule { }
