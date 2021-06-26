import { ActiveProfileComponent } from './profile/active-profile/active-profile.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BottomSheetLegendComponent } from './shared/bottomsheet/bottomsheet-legend.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DialogComponent } from './shared/dialog/dialog.component';
import { DialogErrorComponent } from './shared/dialogerror/dialog-error.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { HeaderComponent } from './navigation/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { ProfileCardComponent } from './profile/profile-card/profile-card.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { SignupComponent } from './auth/signup/signup.component';

@NgModule({
  declarations: [
    ActiveProfileComponent,
    AdminComponent,
    AppComponent,
    BottomSheetLegendComponent,
    DialogComponent,
    EditProfileComponent,
    HeaderComponent,
    LoginComponent,
    ProfileCardComponent,
    ProfileComponent,
    SidenavComponent,
    SignupComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[DialogComponent,
                   DialogErrorComponent,
                   BottomSheetLegendComponent]
})
export class AppModule { }
