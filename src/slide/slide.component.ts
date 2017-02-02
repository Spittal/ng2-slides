import { Component } from '@angular/core';

@Component({
  selector: 'ng2-slide',
  styles: [`
    :host {
      display: block;
      height: auto;
      margin-bottom: 0;
      height: auto;
      width: 100%;

      @media (min-width: 1000px) {
        min-height: 100vh;
      }

      &.slide {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100%;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
      }
    }`],
  template: `<ng-content></ng-content>`
})
export class SlideComponent {

}
