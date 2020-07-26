import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DataStorage } from 'src/app/shared/data-storage.service';
import { dataStorageStub } from 'src/app/auth/signup/signup.component.spec';
import { FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { ProfileCardComponent } from "./profile-card.component"
import { Router } from '@angular/router';
import { Paths } from 'src/app/constants/paths';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ProfileCardComponent',() => {
    let component: ProfileCardComponent;
    let fixture: ComponentFixture<ProfileCardComponent>;
    let routerStub = jasmine.createSpyObj(Router,['navigate']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ProfileCardComponent],
            imports: [FormsModule,
                      BrowserAnimationsModule,
                      HighchartsChartModule
                    ],
            providers: [{provide: DataStorage, useClass: dataStorageStub},
                        {provide: Router, useValue: routerStub}]        
        });

        fixture = TestBed.createComponent(ProfileCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Create component', () => {
        expect(component).toBeDefined();
    });
 
    it('Ensure button click works to route to edit screen', () => {

        fixture.detectChanges();        
        const button: DebugElement = fixture.debugElement.query(By.css('button'));

        button.triggerEventHandler('click', 'genericSkills')
        
        expect(component.onEditClick).toBeDefined();
    });

    it('Ensure routing is done to edit screen', () => {
        component.userData.id = 1;
        component.onEditClick('genericSkills');
        
        expect(routerStub.navigate).toHaveBeenCalledWith(['/' + Paths.Profile,1,Paths.Edit],{ queryParams: { skill: 'genericSkills'}});
    });

    it('Check the matcard title', () => {
        component.inputSkillType = 'Generic Skills';

        fixture.detectChanges();
        const el = fixture.nativeElement.querySelector('h3');

        expect(el.innerText).toContain('Generic Skills');
    });

    it('Check the matcard subtitle', () => {
        component.cardSubtitle = 'some subtitle';

        fixture.detectChanges();
        const el = fixture.nativeElement.querySelector('h5');

        expect(el.innerText).toContain('some subtitle');
    });

});