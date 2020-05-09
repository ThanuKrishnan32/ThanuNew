import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorage } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor( private dataStorageService : DataStorage) { }

  ngOnInit(): void {}

  onSubmit(form: NgForm){
      const userId = form.value.userId;
      const password = form.value.password;
      this.dataStorageService.loginUser(userId,password);
  }
}
