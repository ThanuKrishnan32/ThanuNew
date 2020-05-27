import { Component, OnInit } from '@angular/core';
import { DataStorage } from 'src/app/shared/data-storage.service';
import { User } from 'src/app/shared/user.model';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder} from '@angular/forms';
import { teams } from 'src/app/shared/teams.model';
import { Skill } from 'src/app/shared/skill.model';
import { AvailableSkill } from 'src/app/shared/availableSkill.model';
import { DialogComponent } from '../../shared/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { error } from '@angular/compiler/src/util';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetLegendComponent } from 'src/app/shared/bottomsheet-legend.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

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

  profileForm: FormGroup;
  availableTeams: teams[];
  userGenericSkills: Skill[];
  userDomainSkills: Skill[];
  userKbcSkills: Skill[];

  inputId: number;
  maxSkillValue: number = 8;
  typeToEdit: String;
  availableGenericSkills: AvailableSkill[];
  availableDomainSkills: AvailableSkill[];
  availableKbcSkills: AvailableSkill[];

  constructor(private dataStorageService: DataStorage,
              private fb: FormBuilder,
              private router: Router,
              public dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.initForm();
    this.activatedRoute.params.subscribe(
      (params : Params)=>{
        this.inputId = +params['id'];
      } 
    );
    this.activatedRoute.queryParams.subscribe(
      (params : Params)=>{
        this.typeToEdit = params['skill'];
      } 
    );
    this.dataStorageService.getUser(this.inputId);
    this.dataStorageService.loggedInUser.subscribe(
      users=>{
          this.userData = users;
          this.userGenericSkills = this.userData.genericSkills;
          this.userDomainSkills = this.userData.domainSkills;
          this.userKbcSkills = this.userData.kbcSkills;
          this.setForm(); 
            }
    );
    this.dataStorageService.getTeams().subscribe(teams=>{
      this.availableTeams = teams
    });  
    this.dataStorageService.getGenericSkills().subscribe(skills=>{
      this.availableGenericSkills = skills;
    });
    this.dataStorageService.getDomainSkills().subscribe(skills=>{
      this.availableDomainSkills = skills;
    });
    this.dataStorageService.getKbcSkills().subscribe(skills=>{
      this.availableKbcSkills = skills;
    });
  }  

  onAddGenericSkill(){
    (<FormArray>this.profileForm.get('genericSkills')).push(this.initSkillArray());
  }
  onAddDomainSkill(){
    (<FormArray>this.profileForm.get('domainSkills')).push(this.initSkillArray());
  }
  onAddKbcSkill(){
    (<FormArray>this.profileForm.get('kbcSkills')).push(this.initSkillArray());
  }

  get genericSkillControls() { 
    return (<FormArray>this.profileForm.get('genericSkills')).controls;
  }
  get domainSkillControls() { 
    return (<FormArray>this.profileForm.get('domainSkills')).controls;
  }
  get kbcSkillControls() { 
    return (<FormArray>this.profileForm.get('kbcSkills')).controls;
  }

  get f(){
    return this.profileForm.controls;
  }

  get sGenericFArray(){
    return <FormArray>this.profileForm.get('genericSkills')
  }

  removeGenericFormSkill(Arrayindex: number){
    (<FormArray>this.profileForm.get('genericSkills')).removeAt(Arrayindex);
  }


  get sDomainFArray(){
    return <FormArray>this.profileForm.get('domainSkills')
  }

  removeDomainFormSkill(Arrayindex: number){
    (<FormArray>this.profileForm.get('domainSkills')).removeAt(Arrayindex);
  }
  get sKbcFArray(){
    return <FormArray>this.profileForm.get('kbcSkills')
  }

  removeKbcFormSkill(Arrayindex: number){
    (<FormArray>this.profileForm.get('kbcSkills')).removeAt(Arrayindex);
  }

  private initForm(){

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

  private initSkillArray(): FormGroup{
    return new FormGroup({
      skillName: new FormControl('',[Validators.required]),
      skillLevel: new FormControl('',[Validators.required])
      })
  }

  private setForm(){

    this.profileForm.patchValue({
      id: this.userData.id,
      userId: this.userData.userId,
      password: this.userData.password,
      firstName: this.userData.firstName,
      lastName: this.userData.lastName,
      team : this.userData.team
    }) 

    this.profileForm.setControl('genericSkills', this.setUserSkills(this.userData.genericSkills));
    this.profileForm.setControl('domainSkills', this.setUserSkills(this.userData.domainSkills));
    this.profileForm.setControl('kbcSkills', this.setUserSkills(this.userData.kbcSkills));
  }

  private setUserSkills(skills: Skill[]): FormArray{
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

  openBottomLegendSheet(): void{
    this.bottomSheet.open(BottomSheetLegendComponent);
  }

  onSubmit(){
    const dialogref = this.dialog.open(DialogComponent);
    dialogref.afterClosed().subscribe(
      userchoice=>{
        if(userchoice === true){
          this.userData = this.profileForm.value;
          this.dataStorageService.editUser(this.userData,this.userData.id); 
        }
      })  
  }
}
