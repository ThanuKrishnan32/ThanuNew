import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatSelectModule,
    MatTabsModule,
    MatDialogModule,
    MatCardModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSliderModule,
    MatTooltipModule,
    HighchartsChartModule,
    MatBottomSheetModule
  ],
  exports : [MatMenuModule,
             MatButtonModule,
             MatFormFieldModule,
             MatInputModule,
             FormsModule,
             MatSidenavModule,
             FlexLayoutModule,
             MatIconModule,
             MatToolbarModule,
             MatListModule,
             MatSelectModule,
             MatTabsModule,
             MatDialogModule,
             MatCardModule,
             MatProgressBarModule,
             MatRadioModule,
             ReactiveFormsModule,
             MatSliderModule,
             MatTooltipModule,
             HighchartsChartModule,
             MatBottomSheetModule]
})
export class MaterialModule { }
