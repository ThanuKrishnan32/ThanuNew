import { BottomSheetLegendComponent } from 'src/app/shared/bottomsheet/bottomsheet-legend.component';
import { Component, OnInit } from '@angular/core';
import { DataStorage } from 'src/app/shared/data-storage.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { User } from 'src/app/shared/models/user.model';
import { Variables } from 'src/app/constants/variables';

@Component({
  selector: 'app-active-profile',
  templateUrl: './active-profile.component.html',
  styleUrls: ['./active-profile.component.css']
})
export class ActiveProfileComponent implements OnInit {  

  public userData : User = {
    id: 0,
    userId: Variables.emptyString,
    password: Variables.emptyString,
    firstName: Variables.emptyString,
    lastName: Variables.emptyString,
    team: Variables.emptyString,
    genericSkills: [] = [],
    domainSkills: [] = [],
    kbcSkills: [] = []
  };
  public skillTypes : string[] = [Variables.generalSkill,
                                  Variables.domainSkill,
                                  Variables.kbcSkill];
   
  public constructor(private readonly _datastorageService: DataStorage,
                     private readonly _bottomSheet: MatBottomSheet) { }

  public ngOnInit(): void {
       this._datastorageService.loggedInUser.subscribe(
         users => {
           this.userData = users;
         }
       );
  }

 public openBottomLegendSheet(): void {
    this._bottomSheet.open(BottomSheetLegendComponent);
  }
}
