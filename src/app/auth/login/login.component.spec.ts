import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DataStorage } from 'src/app/shared/data-storage.service';
import { DebugElement } from '@angular/core';
import { FormsModule, NgForm, AbstractControl } from '@angular/forms';
import { LoginComponent } from './login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from 'src/app/shared/models/user.model';


describe('LoginComponent',() => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    const dataStorage = jasmine.createSpyObj('DataStorage',['loginUser']);

    const userData: User = {
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

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [ FormsModule,
                       MatFormFieldModule,
                       MatInputModule,  
                       BrowserAnimationsModule],
            providers: [{provide: DataStorage, useValue: dataStorage}]  
        })
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Component is created',() => {
        expect(component).toBeDefined();
    });

    it('Check the userId control and the form',async(() => {
        fixture.whenStable().then(() => {
        
        let userId: AbstractControl = component.loginForm.form.get('userId');

        expect(userId.valid).toBeFalsy();
        expect(component.loginForm.valid).toBeFalsy();
        
        userId.setValue(userData.userId);

        expect(userId.valid).toBeTruthy();
        expect(userId.errors).not.toBeTruthy();
        expect(userId.value).toContain('JE10019');

        }
        )
    }) );

    it('Check the password control and the form',async(() => {
        fixture.whenStable().then(() => {
        
        let password: AbstractControl = component.loginForm.form.get('password');

        expect(password.valid).toBeFalsy();
        expect(component.loginForm.valid).toBeFalsy();
        
        password.setValue(userData.password.substring(0, 5));
        expect(password.valid).toBeFalsy();
        expect(password.hasError('minlength')).toBeTruthy();    

        password.setValue(userData.password);

        expect(password.valid).toBeTruthy();
        expect(password.errors).not.toBeTruthy();
        expect(password.value).toContain('tester');

        }
        )
    }) );

    it('Check if the Datastorage service is called',async(() => {
        fixture.whenStable().then(() => {
        
        component.loginForm.setValue({
            userId : userData.userId,
            password: userData.password
        })

        const formDe: DebugElement = fixture.debugElement.query(By.css('form'));
        
        formDe.triggerEventHandler('ngSubmit', null);

        expect(dataStorage.loginUser).toHaveBeenCalled();

        }
        )
    }) );
});