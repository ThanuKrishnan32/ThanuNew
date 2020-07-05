import { ActivatedRoute, Params } from '@angular/router';
import { AvailableSkill } from 'src/app/shared/models/availableSkill.model';
import { BottomSheetLegendComponent } from 'src/app/shared/bottomsheet/bottomsheet-legend.component';
import { Component, OnInit } from '@angular/core';
import { DataStorage } from 'src/app/shared/data-storage.service';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder} from '@angular/forms';
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

  userData : User = {
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

  profileForm: FormGroup;
  availableTeams: teams[];
  userGenericSkills: Skill[];
  userDomainSkills: Skill[];
  userKbcSkills: Skill[];
  inputSkillArray: Skill[];

  inputId: number;
  maxSkillValue: number = 8;
  typeToEdit: string;
  availableGenericSkills: AvailableSkill[];
  availableDomainSkills: AvailableSkill[];
  availableKbcSkills: AvailableSkill[];
  domLoaded: boolean = false;

  constructor(private dataStorageService: DataStorage,
              private fb: FormBuilder,
              private dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.initForm();
    this.activatedRoute.params.subscribe(
      (params : Params) => {
        this.inputId = +params['id'];
      } 
    );
    this.activatedRoute.queryParams.subscribe(
      (params : Params) => {
        this.typeToEdit = params['skill'];
      } 
    );
    this.dataStorageService.getUser(this.inputId);
    this.dataStorageService.loggedInUser.subscribe(
      users => {
          this.userData = users;
          this.userGenericSkills = this.userData.genericSkills;
          this.userDomainSkills = this.userData.domainSkills;
          this.userKbcSkills = this.userData.kbcSkills;
          this.setForm();
          this.domLoaded = true;
            }
    );
    this.dataStorageService.getTeams().subscribe(teams => {
      this.availableTeams = teams
    });  
    this.dataStorageService.getGenericSkills().subscribe(skills => {
      this.availableGenericSkills = skills;
    });
    this.dataStorageService.getDomainSkills().subscribe(skills => {
      this.availableDomainSkills = skills;
    });
    this.dataStorageService.getKbcSkills().subscribe(skills => {
      this.availableKbcSkills = skills;
    });
  }  

  public onAddGenericSkill() {
    (<FormArray>this.profileForm.get(ProfileCard.qpVGS)).push(this.initSkillArray());
  }
  public onAddDomainSkill() {
    (<FormArray>this.profileForm.get(ProfileCard.qpVDS)).push(this.initSkillArray());
  }
  public onAddKbcSkill() {
    (<FormArray>this.profileForm.get(ProfileCard.qpVKS)).push(this.initSkillArray());
  }

  get genericSkillControls() { 
    return (<FormArray>this.profileForm.get(ProfileCard.qpVGS)).controls;
  }
  get domainSkillControls() { 
    return (<FormArray>this.profileForm.get(ProfileCard.qpVDS)).controls;
  }
  get kbcSkillControls() { 
    return (<FormArray>this.profileForm.get(ProfileCard.qpVKS)).controls;
  }

  get f() {
    return this.profileForm.controls;
  }

  get sGenericFArray() {
    return <FormArray>this.profileForm.get(ProfileCard.qpVGS)
  }

  public removeGenericFormSkill(Arrayindex: number) {
    (<FormArray>this.profileForm.get(ProfileCard.qpVGS)).removeAt(Arrayindex);
  }


  get sDomainFArray() {
    return <FormArray>this.profileForm.get(ProfileCard.qpVDS)
  }

  public removeDomainFormSkill(Arrayindex: number) {
    (<FormArray>this.profileForm.get(ProfileCard.qpVDS)).removeAt(Arrayindex);
  }
  get sKbcFArray() {
    return <FormArray>this.profileForm.get(ProfileCard.qpVKS)
  }

  public removeKbcFormSkill(Arrayindex: number) {
    (<FormArray>this.profileForm.get(ProfileCard.qpVKS)).removeAt(Arrayindex);
  }

  public initForm() {

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

  public setForm(){

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
         skillArray.push(this.fb.group({
          skillName: skill.skillName,
          skillLevel: skill.skillLevel           
         }))
       }
     );
    }
     return skillArray; 
  }

  public openBottomLegendSheet(): void {
    this.bottomSheet.open(BottomSheetLegendComponent);
  }
  
  public duplicateSkillCheck(control : FormControl): {[s: string]: boolean} {
      if (this.domLoaded) {
        this.inputSkillArray = this.profileForm.get(this.typeToEdit).value;
      } else {
        this.inputSkillArray = [];
      }
      if(this.inputSkillArray.length > 1) {
        let test = this.inputSkillArray.find(data => data.skillName === control.value);
        if (test) {
          return {'duplicateValue' : true}
        } else {
          return null;
        } 
      } else {
        return null;
      }
  }

  public onSubmit() {
    const dialogref = this.dialog.open(DialogComponent);
    dialogref.afterClosed().subscribe(
      userchoice => {
        if(userchoice === true) {
          this.userData = this.profileForm.value;
          this.dataStorageService.editUser(this.userData,this.userData.id); 
        }
      })  
  }
}
