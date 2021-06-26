import { SidenavComponent } from "./sidenav.component"
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DataStorage } from 'src/app/shared/data-storage.service';
import { dataStorageStub } from 'src/app/auth/signup/signup.component.spec';
import { Router, RouterLinkWithHref } from '@angular/router';
import { routerStub } from 'src/app/navigation/header/header.component.spec';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Paths } from 'src/app/constants/paths';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';


describe('SidenavComponent', () => {
   let component: SidenavComponent;
   let fixture: ComponentFixture<SidenavComponent>;

   beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SidenavComponent],
            imports: [MatSidenavModule,
                      MatIconModule,
                      MatListModule,
                      MatToolbarModule,
                      MatButtonModule,
                      RouterTestingModule.withRoutes([]),
                      BrowserAnimationsModule],
            providers: [{ provide: DataStorage, useClass: dataStorageStub }]
        }).compileComponents();

        fixture = TestBed.createComponent(SidenavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
   });

   it('Create Component', () => {
       expect(component).toBeDefined();
   });

   it('Check the navigation to Login', () => {

    const debugElements: DebugElement[] = fixture.debugElement.queryAll(By.css('.mat-list-item'));

    debugElements[0].triggerEventHandler('click',null);
    fixture.detectChanges();

    let debugElementIndex = debugElements.findIndex(deIndex => deIndex.properties['href'] === "/login")

    expect(debugElementIndex).toBeGreaterThan(-1);

    });

    it('Check the navigation to Signup', () => {

        const debugElements: DebugElement[] = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    
        let debugElementIndex = debugElements.findIndex(deIndex => deIndex.attributes['href'] === "/" + Paths.Signup)
    
        expect(debugElementIndex).toBeGreaterThan(-1);
    
    });

    it('Check navigation to Profile click', () => {
        const mySpy = spyOn(component, 'onProfileClick');

        const debugElements: DebugElement[] = fixture.debugElement.queryAll(By.css('.mat-list-item'));

        debugElements[2].triggerEventHandler('click',null);
        
        expect(mySpy).toBeDefined();
    });

    it('Check navigation to Logout', () => {
        
        const debugElements: DebugElement = fixture.debugElement.query(By.css('mat-list-item'));

        debugElements.triggerEventHandler('click',null);

        let router = TestBed.get(Router);

        let mySpy = spyOn(component, 'onLogoutClick');

        expect(mySpy).toBeDefined();

    });
});