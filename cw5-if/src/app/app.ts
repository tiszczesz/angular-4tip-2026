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
  //lista kursów
  myCourses = signal<CourseType[]>(courses);
  //aktualnie wybrany kurs na początku jest to pierwszy kurs z listy
  selectedCourse = signal<CourseType>(courses[0]);

  handleClick(item: CourseType) {
    console.log(item);
    this.selectedCourse.set(item);
  }

}
