import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirstNoSignals } from './first-no-signals/first-no-signals';
import { Second } from './second/second';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FirstNoSignals,Second],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('cw3-signals1');
}
