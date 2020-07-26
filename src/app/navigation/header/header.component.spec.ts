import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from "./header.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { DataStorage } from 'src/app/shared/data-storage.service';
import { dataStorageStub } from 'src/app/auth/signup/signup.component.spec'
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Paths } from 'src/app/constants/paths';

export class routerStub {
    navigate(parms) {}
  } 

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            imports: [BrowserAnimationsModule,
                      MatToolbarModule],
            providers: [{provide: DataStorage, useClass: dataStorageStub},
                        {provide: Router, useClass: routerStub},]          
        });

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('Component created', () => {
        expect(component).toBeDefined();
    });

    it('Check the navigation to click', () => {

        const mySpy = spyOn(component, 'onClick');

        const debugElements: DebugElement[] = fixture.debugElement.queryAll(By.css('button'));
        debugElements[0].triggerEventHandler('click',null);

        expect(mySpy).toHaveBeenCalled();
    });

    it('Check the navigation to Profile', () => {

        const router = TestBed.get(Router)
        const mySpy = spyOn(router, 'navigate');

        const debugElements: DebugElement[] = fixture.debugElement.queryAll(By.css('a'));

        debugElements[0].triggerEventHandler('click',null);


        expect(mySpy).toHaveBeenCalledWith(['/' + Paths.Login]);
    });

    it('Check the navigation to Login', () => {

        const router = TestBed.get(Router)
        const mySpy = spyOn(router, 'navigate');

        const debugElements: DebugElement[] = fixture.debugElement.queryAll(By.css('a'));

        debugElements[1].triggerEventHandler('click',null);

        expect(mySpy).toHaveBeenCalledWith(['/' + Paths.Login]);
    });

    it('Check the navigation to Signup', () => {

        const router = TestBed.get(Router)
        const mySpy = spyOn(router, 'navigate');

        const debugElements: DebugElement[] = fixture.debugElement.queryAll(By.css('a'));

        debugElements[2].triggerEventHandler('click',null);

        expect(mySpy).toHaveBeenCalledWith(['/' + Paths.Signup]);
    });

    xit('Check the navigation to Logout', () => {

        const dataStorage = TestBed.get(DataStorage);
        const mySpy = spyOn(dataStorage, 'logout');

        const debugElements = fixture.debugElement.queryAll(By.css('a'));

        console.log(debugElements);

        debugElements[4].triggerEventHandler('click',null);

        expect(mySpy).toHaveBeenCalled();
    });
    
});