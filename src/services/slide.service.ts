 import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { SlideAnimator } from './slide.animator';
import { SlideEventEnd, SlideEventStart, SlideEvent } from './slide.event';
import { SlideServiceConfig } from './slide-service.config';

@Injectable()
export class SlideService {
  public slideChange: ReplaySubject<SlideEvent> = new ReplaySubject<SlideEvent>();

  private elements: HTMLElement[];

  private animator: SlideAnimator;
  private animating: boolean = false;

  private config: SlideServiceConfig = {
    sensitivity: 20
  };

  /** Observables */
  private keys: Object = {37: true, 38: true, 39: true, 40: true};
  private keyObs: Observable<any> = Observable.fromEvent(document, 'keydown')
    .filter(event => this.keys[(<KeyboardEvent> event).keyCode]);

  private touchObs: Observable<any> = Observable.fromEvent(window, 'touchstart')
    .zip(Observable.fromEvent(window, 'touchend'))
    .map(payload => {
      const anyPayload: any = <any> payload;
      return {
        deltaY: anyPayload[0].changedTouches[0].clientY -
                anyPayload[1].changedTouches[0].clientY
      }
    })
    .filter(change => Math.abs(change.deltaY) > 50);

  private scrollObs: Observable<any> = Observable.fromEvent(window, 'wheel')
    .merge(Observable.fromEvent(window, 'mousewheel'))
    .merge(Observable.fromEvent(window, 'DOMMouseScroll'))
    .merge(Observable.fromEvent(window, 'touchmove'))
    .merge(this.touchObs)
    .merge(this.keyObs);

  constructor() {
    this.elements = this.getNg2SlideElements();
    this.animator = new SlideAnimator();

    this.scrollObs.subscribe(event => {
      if(window.innerHeight > 600) {
        this.preventDefault(event);

        if (!this.animating) {
          this.elements = this.getNg2SlideElements();
          const currentIndex: number = this.getCurrentSlideIndex(this.elements);

          if (event.deltaY > this.config.sensitivity || event.key === 'ArrowDown') {
            this.scrollToIndex(currentIndex + 1, currentIndex);
          } else if (event.deltaY < -this.config.sensitivity || event.key === 'ArrowUp') {
            this.scrollToIndex(currentIndex - 1, currentIndex);
          }
        }
      }
    });
  }

  public scrollToIndex(index: number, previousIndex?: number, elements?: HTMLElement[]): void {
    if (elements) this.elements = elements;
    if (!previousIndex) previousIndex = this.getCurrentSlideIndex(this.elements);

    this.slideChange.next(new SlideEventStart(previousIndex, index))

    if (this.elements[index]) {

      const startingPoint = window.scrollY;
      const endingPoint = this.elements[index].getBoundingClientRect().top + window.scrollY;

      this.animating = true;
      this.animator.animateScroll(startingPoint, endingPoint, () => {
        this.slideChange.next(new SlideEventEnd(previousIndex, index))
        this.animating = false;
      });
    }
  }

  public setConfiguration(config: SlideServiceConfig): void {
    this.config = Object.assign(this.config, config);
  }

  private getNg2SlideElements(): HTMLElement[] {
    return Array.prototype.slice.call(document.querySelectorAll('ng2-slide'));
  }

  private getCurrentSlideIndex(elements: HTMLElement[]): number {
    return elements.findIndex(element => {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY;
      return offsetTop <= window.scrollY && window.scrollY < offsetTop + element.clientHeight;
    })
  }

  private preventDefault(e: Event): void {
    e = e || window.event;
    if (e.preventDefault) e.preventDefault();
    e.returnValue = false;
  }
}
