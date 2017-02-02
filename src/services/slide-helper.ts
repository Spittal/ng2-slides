import { Observable } from 'rxjs';

export class SlideHelper {
  public static getNg2SlideElements(): HTMLElement[] {
    return Array.prototype.slice.call(document.querySelectorAll('ng2-slide'));
  }

  public static preventDefault(e: Event): void {
    e = e || window.event;
    if (e.preventDefault) e.preventDefault();
    e.returnValue = false;
  }

  public static isTouchDevice(): boolean | number {
    return 'ontouchstart' in window
    || navigator.maxTouchPoints;
  }

}
