import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataStorage } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  inputId: number;
  constructor(private datastorageService: DataStorage,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params : Params) => {
        this.inputId = +params['id'];
      } 
    );
    this.datastorageService.getUser(this.inputId);
  }

}
