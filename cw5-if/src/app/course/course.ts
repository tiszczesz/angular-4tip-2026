import { Component, input } from '@angular/core';
import { type Course as courseType, courses } from '../../data/courses';

@Component({
  selector: 'app-course',
  imports: [],
  templateUrl: './course.html',
  styleUrl: './course.css',
})
export class Course {
  enroll() {
    console.log(`Zapisano na kurs ${this.course().title}`);
    if (this.course().count < this.course().limit) {
      this.course().count++;
      console.log(courses);
    }
  }
  //sygnal pobrany z app.ts, który przechowuje aktualnie wybrany kurs
  course = input<courseType>(courses[0]);
}
