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
}

  imageSource = 'angular1.png';
}
