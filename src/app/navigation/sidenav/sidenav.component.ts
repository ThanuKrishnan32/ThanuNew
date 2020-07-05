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
  loggedInUser= false;
  loggedInUserId: number;
  constructor(private datastorageService: DataStorage,
              private router: Router) { }

  ngOnInit() {
    this.datastorageService.isAuth.subscribe(
      isloggedIn =>{
        this.loggedInUser = isloggedIn;
      }
    )
    this.datastorageService.loggedInUser.subscribe(
      user=>{
          this.loggedInUserId = user.id;
      }
    )
  }

 public onClick() {
    this.sideNavclose.emit();
  }

 public onProfileClick() {
    this.sideNavclose.emit();
    if(this.loggedInUserId === undefined){
      this.router.navigate(['/' + Paths.Login]);
    }else{
      this.router.navigate(['/' + Paths.Profile,this.loggedInUserId]);
    }
  }

 public onLogoutClick() {
    this.sideNavclose.emit();
    this.datastorageService.logout();
  }
}
