import { Component, OnInit, ViewChild } from '@angular/core';
import { DataStorage } from 'src/app/shared/data-storage.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public constructor( private readonly _dataStorageService : DataStorage) { }
  @ViewChild('loginForm', { static: true }) loginForm : NgForm;
  public ngOnInit(): void {}

  public onSubmit(form: NgForm) {
      const userId = form.value.userId;
      const password = form.value.password;
      this._dataStorageService.loginUser(userId,password);
  }
}
