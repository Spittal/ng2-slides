import { SliderEngine, SlideObsPayload } from '../models';
import { SlideEvent, SlideEventStart, SlideEventEnd } from '../../models';
import { SlideHelper } from '../../slide-helper';
import { SlideObservables } from '../slide-observables';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { ScrollSliderHelper } from './scroll-slider-helper';

export class ScrollSliderEngine implements SliderEngine {
  public scrollObservable: Observable<SlideObsPayload> =
    <Observable<SlideObsPayload>> Observable
      .merge(SlideObservables.scrollObs)
      .merge(SlideObservables.touchMoveObs)
      .throttleTime(200);

  public currentIndex: number;
  public pause: boolean = false;

  private elements: HTMLElement[];
  private slideChange: ReplaySubject<SlideEvent> = new ReplaySubject<SlideEvent>();
  private scrollSubscription: Subscription;

  public init(initialIndex: number): Observable<SlideEvent> {
    this.refreshElements();
    this.currentIndex = initialIndex;

    this.setEndState(initialIndex);

    this.scrollSubscription = this.scrollObservable.subscribe(() => this.handleScroll());

    return this.slideChange;
  }

  public scrollToIndex(toIndex: number): void {
    this.slideChange.next(new SlideEventStart(this.currentIndex, toIndex));
    this.setEndState(toIndex);
  }

  public setEndState(toIndex: number): void {
    this.refreshElements();
    setTimeout(
      () => { window.scrollTo(window.scrollX, this.elements[toIndex].offsetTop); return false; },
      100);
    this.slideChange.next(new SlideEventEnd(this.currentIndex, toIndex));
    this.currentIndex = toIndex;
  }

  public setPause(state: boolean): void {
    this.pause = state;
  }

  public remove(): number {
    this.scrollSubscription.unsubscribe();
    return this.currentIndex;
  }

  private handleScroll(): void {
    const scrollIsIn = ScrollSliderHelper.whatSlideIsScrollIn(this.elements);
    if (this.currentIndex !== scrollIsIn) {
      this.slideChange.next(new SlideEventStart(this.currentIndex, scrollIsIn));
      this.slideChange.next(new SlideEventEnd(this.currentIndex, scrollIsIn));
      this.currentIndex = scrollIsIn;
    }
  }

  private refreshElements(): void {
    this.elements = SlideHelper.getNg2SlideElements();
  }
}
