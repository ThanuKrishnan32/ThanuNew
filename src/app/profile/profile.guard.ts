import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

import { DataStorage } from 'src/app/shared/data-storage.service';

@Injectable({providedIn: 'root'})
export class ProfileGuard implements CanActivate {
  constructor(private datastorageService: DataStorage, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.datastorageService.checkAuth()){
      return true;
    }else{
      this.router.navigate(['/login']);
    }
      
  }
}