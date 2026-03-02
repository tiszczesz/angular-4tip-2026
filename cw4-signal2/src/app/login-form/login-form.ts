import { Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { form,FormField } from '@angular/forms/signals';
export interface LoginFormModel {
  username: string;
  password: string;
}
@Component({
  selector: 'app-login-form',
  imports: [FormField, JsonPipe],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  loginModel = signal<LoginFormModel>({
    username: '',
    password: '',
  });
  loginForm = form(this.loginModel);
}
