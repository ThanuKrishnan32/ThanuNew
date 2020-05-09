import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DataStorage } from 'src/app/shared/data-storage.service';
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

  onClick(){
    this.sideNavclose.emit();
  }

  onProfileClick(){
    this.sideNavclose.emit();
    if(this.loggedInUserId === undefined){
      this.router.navigate(['/login']);
    }else{
      this.router.navigate(['/profile',this.loggedInUserId]);
    }
  }

  onLogoutClick(){
    this.sideNavclose.emit();
    this.datastorageService.logout();
  }
}
