import { ActiveProfileComponent } from "./active-profile.component"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataStorage } from 'src/app/shared/data-storage.service';
import { dataStorageStub } from 'src/app/auth/signup/signup.component.spec';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatExpansionModule } from '@angular/material/expansion';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';



describe('ActiveProfileComponent',() => {
    let component: ActiveProfileComponent;
    let fixture: ComponentFixture<ActiveProfileComponent>;
    const matBottomSheet = jasmine.createSpyObj('MatBottomSheet',['open']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ActiveProfileComponent],
            imports: [BrowserAnimationsModule,
                      MatBottomSheetModule,
                      MatExpansionModule
                      ],
            providers: [{provide: DataStorage, useClass: dataStorageStub},
                        {provide: MatBottomSheet, useValue: matBottomSheet}]
        })

        fixture = TestBed.createComponent(ActiveProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Create Component',() => {
        expect(component).toBeDefined();
    });

    it('Check opening of Bottom Legend sheet', () => {
        
        const debugElements: DebugElement = fixture.debugElement.query(By.css('.legend-button'));

        debugElements.triggerEventHandler('click',null);

        let mySpy = spyOn(component, 'openBottomLegendSheet');

        expect(mySpy).toBeDefined();

    });

    it('Check the heading in the page', () => {
        component.userData.firstName = 'Thanu';
        component.userData.lastName = 'Krishnan';

        fixture.detectChanges();
        const el = fixture.nativeElement.querySelector('h1');

        expect(el.innerText).toContain('Thanu');
    });

    it('Check the skill type in the page', () => {
        component.skillTypes[0] = 'Generic Skills';
        
        
        fixture.detectChanges();
        const el = fixture.nativeElement.querySelector('mat-panel-title');

        expect(el.innerText).toContain('Generic Skills');
    })
});