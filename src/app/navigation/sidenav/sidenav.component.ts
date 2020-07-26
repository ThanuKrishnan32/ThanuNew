import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DataStorage } from 'src/app/shared/data-storage.service';
import { Paths } from 'src/app/constants/paths';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Output() sideNavclose = new EventEmitter<void>();
  public loggedInUser= false;
  public loggedInUserId: number;
  public constructor(private readonly _datastorageService: DataStorage,
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

 public onClick(): void  {
    this.sideNavclose.emit();
  }

 public onProfileClick(): void {
    this.sideNavclose.emit();
    if(this.loggedInUserId === undefined){
      this._router.navigate(['/' + Paths.Login]);
    }else{
      this._router.navigate(['/' + Paths.Profile,this.loggedInUserId]);
    }
  }

 public onLogoutClick(): void {
    this.sideNavclose.emit();
    this._datastorageService.logout();
  }
}
