import { Component, OnInit, ViewChild } from '@angular/core';
import { DataStorage } from 'src/app/shared/data-storage.service';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { DialogErrorComponent } from 'src/app/shared/dialogerror/dialog-error.component';
import { Errors } from 'src/app/constants/errors';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { teams } from 'src/app/shared/models/teams.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public availableTeams: teams[];
  public teamPos: String;
  public userData: User;
  public isOk: boolean;
  public userArray : User[];
  public userCheckData: User;

  @ViewChild('signupForm', { static: true }) signupForm : NgForm;

  public constructor(public readonly _dialog: MatDialog,
                     private readonly _dataStorageService: DataStorage) { }

  public ngOnInit(): void {
    this._dataStorageService.getTeams().subscribe(teams => {
      this.availableTeams = teams
    })
    this._dataStorageService.getUsers().subscribe(
      users => {
        this.userArray = users;
      }
    )
  }

 public onSubmit(form: NgForm) {
    const dialogRef = this._dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(
      userchoice => {
        if(userchoice === true) {
          this.userData = form.value;
          this.userCheckData = this.userArray.find(loginUser => loginUser.userId === this.userData.userId )
          if(this.userCheckData) {
            const dialogRef = this._dialog.open(DialogErrorComponent, {
              data: { error : Errors.uidalreadyexists }
              });
          } else {
            this._dataStorageService.signupUser(this.userData);
          } 
        }
      })
    
  }

}
