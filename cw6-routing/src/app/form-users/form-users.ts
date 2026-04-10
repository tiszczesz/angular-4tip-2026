import { Component, signal } from '@angular/core';
import { FormField, email, form, required } from '@angular/forms/signals';
import { type User, getUsers, getRoles, getLatestUserId } from "../models/usersData";
//import { JsonPipe } from '@angular/common';
// Define an interface for the user form data
export interface UserForm {
  name: string;
  email: string;
  role: string;
}
@Component({
  selector: 'app-form-users',
  imports: [FormField],
  templateUrl: './form-users.html',
  styleUrl: './form-users.css',
})
export class FormUsers {
  handleDelete(userToDeletedId: number) {
    // Update the users signal by filtering out the user with the specified ID
    this.users.update(users => users.filter(user => user.id !== userToDeletedId));

  }
  handleSubmit($event: SubmitEvent) {
    $event.preventDefault(); // Prevent the default form submission behavior
    const result = this.userModel(); // Get the current value of the userModel signal
    const newUser: User = {
      id: getLatestUserId() + 1, // Generate a new ID based on the latest user ID
      firstname: result.name,
      email: result.email,
      role: result.role as "admin" | "user" | "guest" | "editor",
      date: new Date()
    }
    // Update the users signal by adding the new user to the existing list of users
    this.users.update(users => [...users, newUser]);
    console.log('Form submitted with data:', result);

  }
  users = signal<User[]>(getUsers());
  roles = signal<string[]>(getRoles());
  userModel = signal<UserForm>({
    name: '',
    email: '',
    role: this.roles()[0] || '', // Set default role to the first role in the list
  });
  userForm = form(this.userModel, (schemaPath) => {
    required(schemaPath.name, { message: "nazwa jest wymagana" });
    required(schemaPath.email, { message: "email jest wymagany" });
    email(schemaPath.email, { message: "nieprawidłowy format email" });
  });
}
