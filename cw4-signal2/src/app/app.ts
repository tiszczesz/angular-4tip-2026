import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Rectangle } from './rectangle/rectangle';
import { MyList } from './my-list/my-list';
import { LoginForm } from './login-form/login-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Rectangle, MyList, LoginForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('cw4-signal2');
}
