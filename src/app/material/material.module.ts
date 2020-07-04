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
import { MatExpansionModule } from '@angular/material/expansion';
import { TextFieldModule } from '@angular/cdk/text-field';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    HighchartsChartModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    TextFieldModule
  ],
  exports : [
             FlexLayoutModule,
             FormsModule,
             HighchartsChartModule,
             MatBottomSheetModule,
             MatButtonModule,
             MatCardModule,
             MatDialogModule,
             MatExpansionModule,
             MatFormFieldModule,
             MatIconModule,
             MatInputModule,
             MatListModule,
             MatMenuModule,
             MatProgressBarModule,
             MatRadioModule,
             MatSelectModule,
             MatSidenavModule,
             MatSliderModule,
             MatTabsModule,
             MatToolbarModule,
             MatTooltipModule,
             ReactiveFormsModule,
             TextFieldModule]
})
export class MaterialModule { }
