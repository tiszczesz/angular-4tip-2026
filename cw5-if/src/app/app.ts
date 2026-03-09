import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { type Course, courses } from '../data/courses';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  myCourses = signal<Course[]>(courses);
}
