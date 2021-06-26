import { ActivatedRoute } from '@angular/router';
import { activatedRouteStub } from '../profile/profile.component.spec';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataStorage } from 'src/app/shared/data-storage.service';
import { dataStorageStub } from 'src/app/auth/signup/signup.component.spec';
import { EditProfileComponent } from "./edit-profile.component"
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { ReactiveFormsModule, FormBuilder, AbstractControl, FormArray } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('EditProfileComponent', () => {
    let component: EditProfileComponent;
    let fixture: ComponentFixture<EditProfileComponent>;
    const matBottomSheet = jasmine.createSpyObj('MatBottomSheet',['open']);
    const matDialog = jasmine.createSpyObj('MatDialog',['open']);
    const formBuilder = jasmine.createSpyObj('FormBuilder',[''])

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [EditProfileComponent],
            imports: [MatSelectModule,
                      MatFormFieldModule,
                      ReactiveFormsModule,
                      MatSliderModule,
                      BrowserAnimationsModule],
            providers: [{provide: DataStorage, useClass: dataStorageStub},
                        {provide: ActivatedRoute, useClass: activatedRouteStub},
                        {provide: MatBottomSheet, useValue: matBottomSheet},
                        {provide: MatDialog, useValue: matDialog},
                        {provide: FormBuilder,useValue: formBuilder}
                        ]          

        });

        fixture = TestBed.createComponent(EditProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Create Component',() => {
        expect(component).toBeDefined();
    });

    it('Check opening of Bottom Legend sheet', () => {
        
        const debugElements: DebugElement = fixture.debugElement.query(By.css('.height-35'));

        debugElements.triggerEventHandler('click',null);

        expect(matBottomSheet.open).toHaveBeenCalled();

    });

    it('Check the matcard title', () => {
        component.userData.firstName = 'Thanu';
        component.userData.lastName = 'Krishnan';

        fixture.detectChanges();
        const el = fixture.nativeElement.querySelector('mat-card-title');

        expect(el.innerText).toContain('Thanu');
    });

    it('Check the team name', () => {

        let team: AbstractControl = component.profileForm.get('team');

        expect(team.valid).toBeFalsy();

        team.setValue('OPN');

        expect(team.valid).toBeTruthy();
        expect(component.profileForm.valid).toBeFalsy();
        expect(team.value).toContain('OPN');
    });

    // it('Check the skill name', () => {

    //     let genericSkills: FormArray = <FormArray>component.profileForm.get('genericSkills');

    //     expect(genericSkills.valid).toBeFalsy();

    //     component.profileForm.setControl('genericSkills',genericSkills.push({
    //         skillName: 'Cobol',

    //     }))

    //     // skillName.setValue('Cobol');

    //     // expect(skillName.valid).toBeTruthy();
    //     // expect(component.profileForm.valid).toBeFalsy();
    //     // expect(skillName.value).toContain('Cobol');
    // });
})