import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DataStorage } from 'src/app/shared/data-storage.service';
import { Paths } from 'src/app/constants/paths';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToggle = new EventEmitter<void>();
  loggedInUser = false;
  loggedInUserId: number;
  constructor( private datastorageService: DataStorage,
               private router: Router) { }

  ngOnInit() {
    this.datastorageService.isAuth.subscribe(
      isloggedIn => {
        this.loggedInUser = isloggedIn;
      }
    )
    this.datastorageService.loggedInUser.subscribe(
      user => {
          this.loggedInUserId = user.id;
      }
    )
  }

 public onClick() {
    this.sideNavToggle.emit();
  }

 public onProfileClick() {
    if(this.loggedInUserId === undefined) {
      this.router.navigate(['/' + Paths.Login]);
    }else { 
      this.router.navigate(['/' + Paths.Profile,this.loggedInUserId]);
    }
  }

 public onLoginClick() {
    this.router.navigate(['/' + Paths.Login]);
 } 

 public onSignupClick() {
  this.router.navigate(['/' + Paths.Signup]);
 }

 public onLogOut() {
    this.datastorageService.logout();
  }
}
