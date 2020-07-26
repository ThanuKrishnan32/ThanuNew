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
  public loggedInUser = false;
  private loggedInUserId: number;
  public constructor( private readonly _datastorageService: DataStorage,
                      private readonly _router: Router) { }

  public ngOnInit(): void {
    this._datastorageService.isAuth.subscribe(
      isloggedIn => {
        this.loggedInUser = isloggedIn;
      }
    )
    this._datastorageService.loggedInUser.subscribe(
      user => {
          this.loggedInUserId = user.id;
      }
    )
  }

 public onClick(): void {
    this.sideNavToggle.emit();
  }

 public onProfileClick(): void {
    if(this.loggedInUserId === undefined) {
      this._router.navigate(['/' + Paths.Login]);
    }else { 
      this._router.navigate(['/' + Paths.Profile,this.loggedInUserId]);
    }
  }

 public onLoginClick(): void {
    this._router.navigate(['/' + Paths.Login]);
 } 

 public onSignupClick(): void {
  this._router.navigate(['/' + Paths.Signup]);
 }

 public onLogOut(): void {
    this._datastorageService.logout();
  }
}
