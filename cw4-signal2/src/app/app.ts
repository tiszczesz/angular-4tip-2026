import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Rectangle } from './rectangle/rectangle';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Rectangle],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('cw4-signal2');
}
