import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { type Course as CourseType, courses } from '../data/courses';
import { Course } from './course/course';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Course],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  selectedCourse = signal<CourseType>(courses[0]);

  handleClick(item: CourseType) {
    console.log(item);
    this.selectedCourse.set(item);
  }

  myCourses = signal<CourseType[]>(courses);
}
