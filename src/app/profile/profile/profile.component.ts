import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataStorage } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private inputId: number;
  public constructor(private readonly _datastorageService: DataStorage,
                     private readonly _activatedRoute: ActivatedRoute) { }

  public ngOnInit(): void {
    this._activatedRoute.params.subscribe(
      (params : Params) => {
        this.inputId = +params['id'];
      } 
    );
    this._datastorageService.getUser(this.inputId);
  }

}
