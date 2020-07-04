import { Component, OnInit } from '@angular/core';
import { DataStorage } from 'src/app/shared/data-storage.service';
import { DialogComponent } from '../../shared/dialog.component';
import { DialogErrorComponent } from 'src/app/shared/dialog-error.component';
import { Errors } from 'src/app/constants/errors';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
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
      users => {
        this.userArray = users;
      }
    )
  }

 public onSubmit(form: NgForm){
    const dialogref = this.dialog.open(DialogComponent);
    dialogref.afterClosed().subscribe(
      userchoice => {
        if(userchoice === true) {
          this.userData = form.value;
          this.userCheckData = this.userArray.find(loginUser => loginUser.userId === this.userData.userId )
          if(this.userCheckData) {
            const dialogref = this.dialog.open(DialogErrorComponent,{
              data:{error:Errors.uidalreadyexists}
              });
          }else {
            this.dataStorageService.signupUser(this.userData);
          } 
        }
      })
    
  }

}
