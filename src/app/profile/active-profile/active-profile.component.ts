import { BottomSheetLegendComponent } from 'src/app/shared/bottomsheet-legend.component';
import { Component, OnInit } from '@angular/core';
import { DataStorage } from 'src/app/shared/data-storage.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { User } from 'src/app/shared/user.model';

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
  };
  skillTypes : string[] = ["Generic Skills",
                           "Domain Skills",
                           "KBC Skills"];
   
  constructor(private datastorageService: DataStorage,
              private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
       this.datastorageService.loggedInUser.subscribe(
         users=>{
           this.userData = users;
         }
       );
  }

 public openBottomLegendSheet(): void {
    this.bottomSheet.open(BottomSheetLegendComponent);
  }
}
