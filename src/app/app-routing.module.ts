import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { ProfileGuard } from './profile/profile.guard';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path:'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'profile/:id', component: ProfileComponent, canActivate :[ProfileGuard]},
  { path: 'profile/:id/edit', component: EditProfileComponent, canActivate :[ProfileGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
