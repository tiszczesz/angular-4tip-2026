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
  message = signal('to jest wartość początkowa');

}
