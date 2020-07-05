import { AdminComponent } from './admin/admin/admin.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { Paths } from './constants/paths';
import { ProfileComponent } from './profile/profile/profile.component';
import { ProfileGuard } from './profile/profile.guard';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/' + Paths.Login, pathMatch: 'full' },
  { path: Paths.Login, component: LoginComponent },
  { path: Paths.Signup, component: SignupComponent},
  { path: Paths.Admin, component: AdminComponent},
  { path: Paths.UserProfile, component: ProfileComponent, canActivate :[ProfileGuard]},
  { path: Paths.ProfileEdit, component: EditProfileComponent, canActivate :[ProfileGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
