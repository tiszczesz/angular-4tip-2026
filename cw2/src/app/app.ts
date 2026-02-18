import { Component, signal } from '@angular/core';
import { First } from './first/first';
import { Circle } from './circle/circle';
//import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [First,Circle],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('cw2');
  content = "Sam to zrobiłem, bo chciałem się nauczyć Angulara. Nie wiem, czy to jest dobre, ale mam nadzieję, że tak.";
}
