import { Component } from '@angular/core';

@Component({
  selector: 'app-myimage',
  imports: [],
  templateUrl: './myimage.html',
  styleUrl: './myimage.css',
})
export class Myimage {
  handleClick($event: PointerEvent) {
    console.log('Image clicked!', $event);
    this.imageSource === 'angular1.png' ?
      this.imageSource = 'angular2.png'
      : this.imageSource = 'angular1.png';
    console.log('Image source changed to:', this.imageSource);
  }

  imageSource = 'angular1.png';
}
