import { ActivatedRoute, Params } from '@angular/router';
import { AvailableSkill } from 'src/app/shared/models/availableSkill.model';
import { BottomSheetLegendComponent } from 'src/app/shared/bottomsheet/bottomsheet-legend.component';
import { Component, OnInit } from '@angular/core';
import { DataStorage } from 'src/app/shared/data-storage.service';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ProfileCard } from 'src/app/constants/profileCardConstant';
import { Skill } from 'src/app/shared/models/skill.model';
import { teams } from 'src/app/shared/models/teams.model';
import { User } from 'src/app/shared/models/user.model';
import { Variables } from 'src/app/constants/variables';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

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
  }

  public profileForm: FormGroup;
  public availableTeams: teams[];
  public userGenericSkills: Skill[];
  public userDomainSkills: Skill[];
  public userKbcSkills: Skill[];
  public inputSkillArray: Skill[];

  public inputId: number;
  public maxSkillValue: number = 8;
  public typeToEdit: string;
  public availableGenericSkills: AvailableSkill[];
  public availableDomainSkills: AvailableSkill[];
  public availableKbcSkills: AvailableSkill[];
  public domLoaded: boolean = false;

  public constructor(private readonly _dataStorageService: DataStorage,
                     private readonly _fb: FormBuilder,
                     private readonly _dialog: MatDialog,
                     private readonly _activatedRoute: ActivatedRoute,
                     private readonly _bottomSheet: MatBottomSheet) { }

  public ngOnInit(): void {
    this.initForm();
    this._activatedRoute.params.subscribe(
      (params : Params) => {
        this.inputId = +params['id'];
      } 
    );
    this._activatedRoute.queryParams.subscribe(
      (params : Params) => {
        this.typeToEdit = params['skill'];
      } 
    );
    this._dataStorageService.getUser(this.inputId);
    this._dataStorageService.loggedInUser.subscribe(
      users => {
          this.userData = users;
          this.userGenericSkills = this.userData.genericSkills;
          this.userDomainSkills = this.userData.domainSkills;
          this.userKbcSkills = this.userData.kbcSkills;
          this.setForm();
          this.domLoaded = true;
            }
    );
    this._dataStorageService.getTeams().subscribe(teams => {
      this.availableTeams = teams
    });  
    this._dataStorageService.getGenericSkills().subscribe(skills => {
      this.availableGenericSkills = skills;
    });
    this._dataStorageService.getDomainSkills().subscribe(skills => {
      this.availableDomainSkills = skills;
    });
    this._dataStorageService.getKbcSkills().subscribe(skills => {
      this.availableKbcSkills = skills;
    });
  }  

  public onAddSkill(skillToBeAdded: string): void {
    (<FormArray>this.profileForm.get(skillToBeAdded)).push(this.initSkillArray());
  }
  

  public getSkillControls(skillType: string): AbstractControl[] { 
    return (<FormArray>this.profileForm.get(skillType)).controls;
  }
  
  get formControl() {
    return this.profileForm.controls;
  }

  public getFormArrayLength(skillType: string): FormArray {
    return <FormArray>this.profileForm.get(skillType);
  }

  public removeSkill(Arrayindex: number, skillType: string): void {
    (<FormArray>this.profileForm.get(skillType)).removeAt(Arrayindex);
  }

  public initForm(): void {

    this.profileForm = new FormGroup(
      {
        id: new FormControl('',[Validators.required]),
        userId: new FormControl('',[Validators.required]),
        password: new FormControl('',[Validators.required]),
        firstName: new FormControl('',[Validators.required]),
        lastName: new FormControl('',[Validators.required]),
        team : new FormControl('',[Validators.required]),     
        genericSkills: new FormArray([this.initSkillArray()]),
        domainSkills: new FormArray([this.initSkillArray()]),
        kbcSkills: new FormArray([this.initSkillArray()])
      }
    );
  }

  public initSkillArray(): FormGroup {
    return new FormGroup({
      skillName: new FormControl('',[Validators.required,this.duplicateSkillCheck.bind(this)]),
      skillLevel: new FormControl('',[Validators.required])
      })
  }

  public setForm(): void {

    this.profileForm.patchValue({
      id: this.userData.id,
      userId: this.userData.userId,
      password: this.userData.password,
      firstName: this.userData.firstName,
      lastName: this.userData.lastName,
      team : this.userData.team
    }) 

    this.profileForm.setControl(ProfileCard.qpVGS, this.setUserSkills(this.userData.genericSkills));
    this.profileForm.setControl(ProfileCard.qpVDS, this.setUserSkills(this.userData.domainSkills));
    this.profileForm.setControl(ProfileCard.qpVKS, this.setUserSkills(this.userData.kbcSkills));
  }

  public setUserSkills(skills: Skill[]): FormArray {
     const skillArray = new FormArray([]);
     if(skills){
     skills.forEach(
       skill =>{
         skillArray.push(this._fb.group({
          skillName: skill.skillName,
          skillLevel: skill.skillLevel           
         }))
       }
     );
    }
     return skillArray; 
  }

  public openBottomLegendSheet(): void {
    this._bottomSheet.open(BottomSheetLegendComponent);
  }
  
  public duplicateSkillCheck(control : FormControl): {[s: string]: boolean} {
      if (this.domLoaded) {
        this.inputSkillArray = this.profileForm.get(this.typeToEdit).value;
      } else {
        this.inputSkillArray = [];
      }
      if(this.inputSkillArray.length > 1) {
        if (control.value > ' ') {
          let test = this.inputSkillArray.find(data => data.skillName === control.value);
          if (test) {
            return {'duplicateValue' : true}
          } else {
            return null;
          } 
        } else {
          return null;
        }  
      } else {
        return null;
      }
  }

  public onSubmit(): void {
    const dialogRef = this._dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(
      userchoice => {
        if(userchoice === true) {
          this.userData = this.profileForm.value;
          this._dataStorageService.editUser(this.userData,this.userData.id); 
        }
      })  
  }
}
