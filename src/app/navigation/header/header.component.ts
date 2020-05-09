import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DataStorage } from 'src/app/shared/data-storage.service';
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
    this.sideNavToggle.emit();
  }

  onProfileClick(){
    if(this.loggedInUserId === undefined){
      this.router.navigate(['/login']);
    }else{
      this.router.navigate(['/profile',this.loggedInUserId]);
    }
  }

  onLogOut(){
    this.datastorageService.logout();
  }
}
