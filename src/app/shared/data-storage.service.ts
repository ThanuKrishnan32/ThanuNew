import { AvailableSkill } from './availableSkill.model';
import { DialogErrorComponent } from './dialog-error.component';
import { Errors } from '../constants/errors';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { teams } from './teams.model';
import { User } from './user.model';

@Injectable({ providedIn:'root' })

export class DataStorage {
    teamsUrl = "http://localhost:3000/teams";
    usersUrl = "http://localhost:3000/users";
    genericSkillsUrl = "http://localhost:3000/genericskills";
    domainSkillsUrl = "http://localhost:3000/domainskills";
    kbcSkillsUrl = "http://localhost:3000/kbcskills";

    firstTime = false;
    users : Observable<any[]>;
    userArray : User[] = [];
    userData: User;
    booleanOutput: boolean;
    loggedInUser = new Subject<User>();
    isAuth = new Subject<boolean>();

    constructor(private httpClient: HttpClient,
                private router: Router,
                public dialog: MatDialog){}


    public getTeams() {
        return this.httpClient.get<teams[]>(this.teamsUrl);
    }
    public getUsers() {
        return this.httpClient.get<User[]>(this.usersUrl);
    }
    public getGenericSkills() {
        return this.httpClient.get<AvailableSkill[]>(this.genericSkillsUrl);
    }
    public getDomainSkills() {
        return this.httpClient.get<AvailableSkill[]>(this.domainSkillsUrl);
    }
    public getKbcSkills() {
        return this.httpClient.get<AvailableSkill[]>(this.kbcSkillsUrl);
    }

    public loginUser(userId: string, password: string) {
        this.httpClient.get<User[]>(this.usersUrl).subscribe(
            users => {
                this.userArray = users;
                this.userData = this.userArray.find(loginUser => loginUser.userId === userId )
                if(this.userData?.password){
                    if(this.userData.password === password){
                        this.loggedInUser.next(this.userData);
                        if(this.userData.userId === "ADMINE"){
                            this.router.navigate(['/admin']);
                            this.isAuth.next(true);
                        }else {     
                            this.router.navigate(['/profile',this.userData.id]);
                            this.isAuth.next(true);
                        }
                    }else {
                        const dialogref = this.dialog.open(DialogErrorComponent,{
                            data:{error:Errors.checkunamepwd}
                        });
                    }
                }else {
                    const dialogref = this.dialog.open(DialogErrorComponent,{
                        data:{error:Errors.checkunamepwd}
                    });
                }
             (error) => {
                 console.log(error)
             }   
            }
        );                                   
    }

    public signupUser(user: User) {    
            this.httpClient.post<User>(this.usersUrl,user).subscribe(
                        signup => {
                           this.userData = signup;  
                           this.loggedInUser.next(this.userData);                 
                           this.router.navigate(['/profile',this.userData.id]); 
                           this.isAuth.next(true); 
                        }
                    );
    }

    public checkAuth(){
        if(this.userData === undefined){
            return false
        }else{
            return true
        }
    }

    public getUser(id: number){
        this.httpClient.get<User>(this.usersUrl + '/' + id).subscribe(
            user => { this.userData = user
                    this.loggedInUser.next(this.userData);
                    this.isAuth.next(true);
                  }  
          );
    }

    public editUser(user: User,id: number){
        this.httpClient.put<User>(this.usersUrl + '/' + id,user).subscribe(
            editedUser => {this.userData = editedUser
                     this.loggedInUser.next(this.userData);
                     this.router.navigate(['/profile',this.userData.id]);
                     this.isAuth.next(true);
                    }
        )
    }

    public logout(){
        this.userData.id = undefined;
        this.userData.firstName = undefined;
        this.userData.lastName = undefined;
        this.userData.password = undefined;
        this.userData.team = undefined;
        this.userData.genericSkills = undefined;
        this.loggedInUser.next(this.userData);
        this.isAuth.next(false);
        this.router.navigate(['/login']);

    }

    
}