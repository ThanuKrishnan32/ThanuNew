import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { teams } from './teams.model';
import { User } from './user.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogErrorComponent } from './dialog-error.component';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AvailableSkill } from './availableSkill.model';

@Injectable({providedIn:'root'})

export class DataStorage{
    teamsUrl = "http://localhost:3000/teams";
    usersUrl = "http://localhost:3000/users";
    skillsUrl = "http://localhost:3000/skills";

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


    getTeams(){
        return this.httpClient.get<teams[]>(this.teamsUrl);
    }
    getUsers(){
        return this.httpClient.get<User[]>(this.usersUrl);
    }
    getSkills(){
        return this.httpClient.get<AvailableSkill[]>(this.skillsUrl);
    }

    loginUser(userId: string, password: string){
        this.httpClient.get<User[]>(this.usersUrl).subscribe(
            users =>{
                this.userArray = users;
                this.userData = this.userArray.find(loginUser => loginUser.userId === userId )
                if(this.userData?.password){
                    if(this.userData.password === password){
                        this.loggedInUser.next(this.userData);
                        this.router.navigate(['/profile',this.userData.id]);
                        this.isAuth.next(true);
                    }else{
                        const dialogref = this.dialog.open(DialogErrorComponent,{
                            data:{error:'Could you please check your Username and password ?'}
                        });
                    }
                }else{
                    const dialogref = this.dialog.open(DialogErrorComponent,{
                        data:{error:"Are you sure you are signedup user? The username/password doesn't seem right"}
                    });
                }
             (error)=>{
                 console.log(error)
             }   
            }
        );                                   
    }

    signupUser(user: User) {    
            this.httpClient.post<User>(this.usersUrl,user).subscribe(
                        signup=>{
                           this.userData = signup;  
                           this.loggedInUser.next(this.userData);                 
                           this.router.navigate(['/profile',this.userData.id]); 
                           this.isAuth.next(true); 
                        }
                    );
    }

    checkAuth(){
        if(this.userData === undefined){
            return false
        }else{
            return true
        }
    }

    getUser(id: number){
        this.httpClient.get<User>(this.usersUrl + '/' + id).subscribe(
            user=>{ this.userData = user
                    this.loggedInUser.next(this.userData);
                    this.isAuth.next(true);
                  }  
          );
    }

    editUser(user: User,id: number){
        this.httpClient.put<User>(this.usersUrl + '/' + id,user).subscribe(
            editedUser => {this.userData = editedUser
                     this.loggedInUser.next(this.userData);
                     this.router.navigate(['/profile',this.userData.id]);
                     this.isAuth.next(true);
                    }
        )
    }

    logout(){
        this.userData.id = undefined;
        this.userData.firstName = undefined;
        this.userData.lastName = undefined;
        this.userData.password = undefined;
        this.userData.team = undefined;
        this.userData.skills = undefined;
        this.loggedInUser.next(this.userData);
        this.isAuth.next(false);
        this.router.navigate(['/login']);

    }

    
}