import { AdminComponent } from './admin/admin/admin.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile/profile.component';
import { ProfileGuard } from './profile/profile.guard';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'profile/:id', component: ProfileComponent, canActivate :[ProfileGuard]},
  { path: 'profile/:id/edit', component: EditProfileComponent, canActivate :[ProfileGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
