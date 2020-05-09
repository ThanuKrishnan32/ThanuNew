import { Component, OnInit, ɵConsole } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog.component';
import { DataStorage } from 'src/app/shared/data-storage.service';
import { teams } from 'src/app/shared/teams.model';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  availableTeams: teams[];
  teamPos: String;
  userData: User;
  isOk: boolean;
  userArray : User[];
  userCheckData: User;

  constructor(public dialog: MatDialog,
              private dataStorageService: DataStorage) { }

  ngOnInit(): void {
    this.dataStorageService.getTeams().subscribe(teams=>{
      this.availableTeams = teams
    })
    this.dataStorageService.getUsers().subscribe(
      users =>{
        this.userArray = users;
      }
    )
  }

  onSubmit(form: NgForm){
    const dialogref = this.dialog.open(DialogComponent);
    dialogref.afterClosed().subscribe(
      userchoice=>{
        if(userchoice === true){
          this.userData = form.value;
          this.userCheckData = this.userArray.find(loginUser => loginUser.userId === this.userData.userId )
          if(this.userCheckData){
            alert('UserID already exists could you please check?')
          }else{
            this.dataStorageService.signupUser(this.userData);
          } 
        }
      })
    
  }

}
