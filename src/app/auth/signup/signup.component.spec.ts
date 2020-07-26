import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DataStorage } from 'src/app/shared/data-storage.service';
import { FormsModule, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable, from, of, Subject } from 'rxjs';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup.component';
import { teams } from 'src/app/shared/models/teams.model';
import { User } from 'src/app/shared/models/user.model';
import { Skill } from 'src/app/shared/models/skill.model';
import { AvailableSkill } from 'src/app/shared/models/availableSkill.model';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

export class dataStorageStub {

  public isAuth = new Subject<boolean>();
  public loggedInUser = new Subject<User>();
  public loggedIn = true;

  public teams: teams[] =  [
      {
        "id": 0,
        "name": "OPN",
        "value": "OPN"
      },
      {
        "id": 1,
        "name": "ODM",
        "value": "ODM"
      },
      {
        "id": 2,
        "name": "OBR",
        "value": "OBR"
      }
    ];

    public domainskills: AvailableSkill[] = [
      {
        "id": 0,
        "name": "Cards & Payments"
      },
      {
        "id": 1,
        "name": "Life Insurance"
      },
      {
        "id": 2,
        "name": "Collection & Distribution"
      }
    ];

    public kbcskills: AvailableSkill[] = [
      {
        "id": 0,
        "name": "AMB"
      },
      {
        "id": 1,
        "name": "EGL"
      },
      {
        "id": 2,
        "name": "IDZ"
      },
      {
        "id": 3,
        "name": "RDZ"
      },
      {
        "id": 4,
        "name": "TOPAZ"
      }
    ];

    public genericskills: AvailableSkill[] =  [
      {
        "id": 0,
        "name": "Cobol"
      },
      {
        "id": 1,
        "name": "DB2"
      },
      {
        "id": 2,
        "name": "Angular"
      },
      {
        "id": 3,
        "name": "JCL"
      },
      {
        "id": 4,
        "name": "Javascript"
      },
      {
        "id": 5,
        "name": "Typescript"
      }
    ];

    public userId: number = 1;

    public userData: User = {
      id: 1,
      userId: "JE10019",
      password: "tester",
      firstName: "Thanu",
      lastName: "Krishnan",
      team: "ODM",
      genericSkills: [],
      domainSkills: [],
      kbcSkills: []
     };  

  getTeams(): Observable<teams[]> {
     return(from([this.teams]));     
  }  

  getGenericSkills(): Observable<AvailableSkill[]> {
    return(from([this.genericskills]));
  }

  getDomainSkills(): Observable<AvailableSkill[]> {
    return(from([this.domainskills]));
  }

  getKbcSkills(): Observable<AvailableSkill[]> {
    return(from([this.kbcskills]));
  }
  
  getUsers(): Observable<User> {
      return(of(this.userData));
  }

  signupUser(user: User): void {

  }

  logout(): void {

  } 

  getUser(id: number): Observable<User> {
    if(id === this.userId) {
      return(of(this.userData));
    };   
  }

  loggedInTrue(): void {
    this.isAuth.next(this.loggedIn);
  }

  provideLoggedInUser(): void {
   this.loggedInUser.next(this.userData);
  }
  
}


describe('SignupComponent',() => {
    let component: SignupComponent;
    let fixture: ComponentFixture<SignupComponent>;
    const matDialog = jasmine.createSpyObj('MatDialog',['open']);
    
  
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SignupComponent],
            imports: [ 
                       BrowserAnimationsModule,
                       FormsModule,
                       MatFormFieldModule,
                       MatInputModule,
                       MatSelectModule,  
                       RouterModule
                    ],
            providers: [{provide: DataStorage, useClass: dataStorageStub},
                        {provide: MatDialog, useValue: matDialog}]     

               })

            fixture = TestBed.createComponent(SignupComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();   
    });

    it('Component is created',() => {
        expect(component).toBeDefined();
    });

    it('Check if the team is retrieved fine',() => {
        
        expect(component.availableTeams).toContain({
            "id": 0,
            "name": "OPN",
            "value": "OPN"
          });
    });

    it('Check the userId control and the form',async(() => {
      fixture.whenStable().then(() => {
      
      let userId: AbstractControl = component.signupForm.form.get('userId');

      expect(userId.valid).toBeFalsy();
      expect(component.signupForm.valid).toBeFalsy();

      userId.setValue('JE100');

      expect(userId.valid).toBeFalsy();
      expect(userId.hasError('minlength')).toBeTruthy();

      userId.setValue('JE100191');

      expect(userId.valid).toBeFalsy();
      expect(userId.hasError('maxlength')).toBeTruthy();
      
      
      userId.setValue('JE10019');

      expect(userId.valid).toBeTruthy();
      expect(userId.errors).not.toBeTruthy();
      expect(userId.value).toContain('JE10019');

      }
      )
  }) );

  it('Check the password control and the form',async(() => {
      fixture.whenStable().then(() => {
      
      let password: AbstractControl = component.signupForm.form.get('password');

      expect(password.valid).toBeFalsy();
      expect(component.signupForm.valid).toBeFalsy();
      
      password.setValue('test');
      expect(password.valid).toBeFalsy();
      expect(password.hasError('minlength')).toBeTruthy();    

      password.setValue('tester');

      expect(password.valid).toBeTruthy();
      expect(password.errors).not.toBeTruthy();
      expect(password.value).toContain('tester');

      }
      )
  }) );

  it('Check the firstname control and the form',async(() => {
    fixture.whenStable().then(() => {
    
    let firstName: AbstractControl = component.signupForm.form.get('firstName');

    expect(firstName.valid).toBeFalsy();
    expect(component.signupForm.valid).toBeFalsy();
    
    firstName.setValue('Tha');
    expect(firstName.valid).toBeFalsy();
    expect(firstName.hasError('minlength')).toBeTruthy();    

    firstName.setValue('Thanu');

    expect(firstName.valid).toBeTruthy();
    expect(firstName.errors).not.toBeTruthy();
    expect(firstName.value).toContain('Thanu');

    }
    )
}) );

it('Check the lastname control and the form',async(() => {
  fixture.whenStable().then(() => {
  
  let lastName: AbstractControl = component.signupForm.form.get('lastName');

  expect(lastName.valid).toBeFalsy();
  expect(component.signupForm.valid).toBeFalsy();

  lastName.setValue('Krishnan');

  expect(lastName.valid).toBeTruthy();
  expect(lastName.errors).not.toBeTruthy();
  expect(lastName.value).toContain('Krishnan');

  }
  )
}) );


it('Check the team control and the form',async(() => {
  fixture.whenStable().then(() => {
  
  let team: AbstractControl = component.signupForm.form.get('team');
      
  team.setValue('OPN');

  expect(team.valid).toBeTruthy();
  expect(team.errors).not.toBeTruthy();
  expect(team.value).toContain('OPN');

  }
  )
}) );

  it('Check if the Datastorage service is called',async(() => {
      fixture.whenStable().then(() => {
      
      component.signupForm.setValue({
          userId : 'JE10019',
          password: 'tester',
          firstName: 'Thanu',
          lastName: 'Krishnan',
          team: 'OPN'
      })

      fixture.detectChanges();

      expect(component.signupForm.valid).toBeTrue();

      // const dataStorage: dataStorageStub = TestBed.get(DataStorage);

      // const mySpy = spyOn(dataStorage,'signupUser');

      // const formDe: DebugElement = fixture.debugElement.query(By.css('form'));
      
      // formDe.triggerEventHandler('ngSubmit', component.signupForm);

      // expect(mySpy).toHaveBeenCalled();

      }
      )
  }) );
});