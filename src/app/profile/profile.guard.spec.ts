import { TestBed } from "@angular/core/testing"
import { HttpClientModule } from '@angular/common/http'
import { DataStorage } from '../shared/data-storage.service'
import { Router } from '@angular/router';
import { ProfileGuard } from './profile.guard';
import { Paths } from '../constants/paths';

const dataStorage = jasmine.createSpyObj(DataStorage,['checkAuth']);
const router = jasmine.createSpyObj(Router,['navigate']);

describe('ProfileGuard',() => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [{provide: DataStorage, useValue: dataStorage},
                        {provide: Router, useValue:router}]
        });
    });

    it('Guard should be created', () => {
        const guard = TestBed.get(ProfileGuard);
        expect(guard).toBeDefined();
    });

    it('CanActivate should return true', () => {
        const guard = TestBed.get(ProfileGuard);
        const isLoggedIn = dataStorage.checkAuth.and.returnValue(true);
        expect(guard.canActivate()).toBe(true);
    });

    it('CanActivate should route to Login', () => {
        const guard = TestBed.get(ProfileGuard);
        const isLoggedIn = dataStorage.checkAuth.and.returnValue(false);
        guard.canActivate()
        expect(router.navigate).toHaveBeenCalledWith(['/' + Paths.Login]);
    })
});