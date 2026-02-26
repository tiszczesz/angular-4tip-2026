import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-rectangle',
  imports: [],
  templateUrl: './rectangle.html',
  styleUrl: './rectangle.css',
})
export class Rectangle {
handleContext($event: PointerEvent) {
 $event.preventDefault();
}
handleMouse($event: MouseEvent) {
   switch ($event.button) {
     case 0: // left button
       this.width.update(w => w + 20);
       break;
     case 2: // right button
       this.width.update(w => w - 20);
       break;
   }
}
  width = signal(80);
  handleClick($event: PointerEvent) {
    // this.width.update(w => w + 20);
    // console.log('click', this.width());
  }

}
