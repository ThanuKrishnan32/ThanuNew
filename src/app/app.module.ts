import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { HeaderComponent } from './navigation/header/header.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ActiveProfileComponent } from './profile/active-profile/active-profile.component';
import { DialogComponent } from './shared/dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { DialogErrorComponent } from './shared/dialog-error.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SidenavComponent,
    HeaderComponent,
    ProfileComponent,
    EditProfileComponent,
    ActiveProfileComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[DialogComponent,
                   DialogErrorComponent]
})
export class AppModule { }
