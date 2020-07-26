import { TestBed } from "@angular/core/testing"
import { HttpClientModule } from '@angular/common/http'
import { DataStorage } from '../data-storage.service'
import { dataStorageStub } from 'src/app/auth/signup/signup.component.spec'
import { Router } from '@angular/router'
import { routerStub } from 'src/app/navigation/header/header.component.spec'


describe('DataStorage',() => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [{provide: DataStorage, useClass: dataStorageStub},
                        {provide: Router, useClass: routerStub}
                       ]
        });
    });

    it('service should be created', () => {
        const dataStorageService = TestBed.get(DataStorage);

        expect(dataStorageService).toBeDefined();
    });
});