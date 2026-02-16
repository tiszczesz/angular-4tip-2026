import { Component, signal } from '@angular/core';
//import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('aplikacja 1');
  info = "To jest zmienna klasy App111";
  currentDate = new Date();
  number1 = 5;
  number2 = 10;
  showInfo(): string {
    return this.info + " - metoda showInfo()";
  }
}
