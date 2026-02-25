import { Component } from '@angular/core';

@Component({
  selector: 'app-first-no-signals',
  imports: [],
  templateUrl: './first-no-signals.html',
  styleUrl: './first-no-signals.css',
})
export class FirstNoSignals {
  handleInput($event: Event) {
    this.message = ($event.target as HTMLInputElement)
    .value;
  }
  message: string = '';

}
