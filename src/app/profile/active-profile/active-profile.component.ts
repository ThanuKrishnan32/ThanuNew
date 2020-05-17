import { Component, OnInit } from '@angular/core';
import { DataStorage } from 'src/app/shared/data-storage.service';
import { User } from 'src/app/shared/user.model';
import { Skill } from 'src/app/shared/skill.model';

@Component({
  selector: 'app-active-profile',
  templateUrl: './active-profile.component.html',
  styleUrls: ['./active-profile.component.css']
})
export class ActiveProfileComponent implements OnInit {
  userData : User = {
    id: 0,
    userId: " ",
    password: " ",
    firstName: " ",
    lastName: " ",
    team: " ",
    genericSkills: [],
    domainSkills: [],
    kbcSkills: []
  }
  userName : String;
  userGenericSkills: Skill[];
  userDomainSkills: Skill[];
  userKbcSkills: Skill[];
  constructor(private datastorageService: DataStorage) { }

  ngOnInit() {
       this.datastorageService.loggedInUser.subscribe(
         users=>{
           this.userData = users;
           this.userGenericSkills = this.userData.genericSkills;
           this.userDomainSkills = this.userData.domainSkills;
           this.userKbcSkills = this.userData.kbcSkills;
         }
       )
  }

}
