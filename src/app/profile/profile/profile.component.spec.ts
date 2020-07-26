import { ProfileComponent } from "./profile.component"
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { DataStorage } from 'src/app/shared/data-storage.service';
import { dataStorageStub } from 'src/app/auth/signup/signup.component.spec';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/empty'

export class activatedRouteStub {
    params: Observable<any> = Observable.empty();
    queryParams: Observable<any> = Observable.empty();
}

describe('ProfileComponent', () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ProfileComponent],
            imports: [BrowserAnimationsModule,
                      MatTabsModule],
            providers: [{provide: DataStorage, useClass: dataStorageStub},
                        {provide: ActivatedRoute, useClass: activatedRouteStub}]    

        });

        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('Create component', () => {
        expect(component).toBeDefined();
    })
});