import { Component, signal } from '@angular/core';
import {type User, getUsers, getRoles} from "../models/usersData";

@Component({
  selector: 'app-form-users',
  imports: [],
  templateUrl: './form-users.html',
  styleUrl: './form-users.css',
})
export class FormUsers {
  users = signal<User[]>(getUsers());
  roles = signal<string[]>(getRoles());
}
