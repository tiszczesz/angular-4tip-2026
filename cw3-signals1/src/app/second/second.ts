import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-second',
  imports: [],
  templateUrl: './second.html',
  styleUrl: './second.css',
})
export class Second {
  handleInput($event: Event) {
    //modyfikujemy wartość sygnału, przypisując mu nową wartość z inputa
    this.message.set(($event.target as HTMLInputElement).value);
  }
  //definujemy sygnał, który będzie przechowywał wartość z inputa
  message = signal('wartość początkowa');
  count = signal<number>(0);

  increment() {
    this.count.update(v => v + 1);
  }

  decrement() {
    this.count.update(v => v - 1);
  }

}
