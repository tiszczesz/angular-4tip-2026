import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Rectangle } from './rectangle/rectangle';
import { MyList } from './my-list/my-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Rectangle,MyList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('cw4-signal2');
}
