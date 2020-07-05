import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

import { DataStorage } from 'src/app/shared/data-storage.service';
import { Injectable } from '@angular/core';
import { Paths } from '../constants/paths';

@Injectable({providedIn: 'root'})
export class ProfileGuard implements CanActivate {
  constructor(private datastorageService: DataStorage, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.datastorageService.checkAuth()){
      return true;
    }else{
      this.router.navigate(['/' + Paths.Login]);
    }
      
  }
}