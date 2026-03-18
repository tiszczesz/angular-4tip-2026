import { Component, input } from '@angular/core';
import { type Course as courseType, courses } from '../../data/courses';

@Component({
  selector: 'app-course',
  imports: [],
  templateUrl: './course.html',
  styleUrl: './course.css',
})
export class Course {
  course = input<courseType>(courses[0]);
}
