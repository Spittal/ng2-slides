import { SliderEngine, SlideObsPayload } from '../models';
import { SlideObservables } from '../slide-observables';
import { TranslateSliderAnimator } from './translate-slider-animator';
import { TranslateSliderHelper } from './translate-slider-helper';
import { SlideHelper } from '../../slide-helper';
import { SlideServiceConfig, SlideEvent, SlideEventStart, SlideEventEnd } from '../../models';
import { Observable, Subscription, ReplaySubject } from 'rxjs';

export class TranslateSliderEngine implements SliderEngine {
  public scrollObservable: Observable<SlideObsPayload> =
    <Observable<SlideObsPayload>> Observable
      .merge(SlideObservables.scrollObs)
      .merge(SlideObservables.keyObs)
      .map(SlideObservables.handleBrowserEdgecases)
      .filter(payload => !this.pause)
      .filter(payload => this.checkWhereIsScroll(payload))
      .map(payload => { SlideHelper.preventDefault(payload.event); return payload; })
      .filter(payload => this.checkThreshold(payload))
      .throttleTime(1000);

  public currentIndex: number;
  public pause: boolean = false;

  private slideChange: ReplaySubject<SlideEvent> = new ReplaySubject<SlideEvent>();
  private elements: HTMLElement[];
  private config: SlideServiceConfig;
  private scrollSubscription: Subscription;

  public init(
    initialIndex: number,
    config: SlideServiceConfig
  ): Observable<SlideEvent> {
    this.refreshElements();
    this.config = config;
    this.elements.map(element => element.classList.add('slide'));

    this.setEndState(initialIndex);
    this.currentIndex = initialIndex;
    this.slideChange.next(new SlideEventEnd(null, initialIndex));
    this.scrollSubscription =
      this.scrollObservable.subscribe(payload => this.handleScrollEvent(payload));

    return this.slideChange;
  }

  public scrollToIndex(toIndex: number): void {
    this.refreshElements();
    this.slideChange.next(new SlideEventStart(this.currentIndex, toIndex));
    TranslateSliderAnimator.animateTranslate(
      this.elements,
      this.currentIndex,
      toIndex,
      () => {
        this.setEndState(toIndex);
        this.slideChange.next(new SlideEventEnd(this.currentIndex, toIndex));
        this.currentIndex = toIndex;
      }
    );
  }

  public setEndState(currentIndex: number): void {
    this.refreshElements();
    this.elements.map((element, index) => {
      if (index < currentIndex) {
        element.style.display = 'none';
        element.style.transform = 'translate3D(0, -100%, 0)';
      } else if (index > currentIndex) {
        element.style.display = 'none';
        element.style.transform = 'translate3D(0, 100%, 0)';
      } else if (index === currentIndex) {
        element.style.display = 'block';
        element.style.transform = 'translate3D(0, 0, 0)';
      }
    });
  }

  public setPause(state: boolean): void {
    this.pause = state;
  }

  public remove(): number {
    this.refreshElements();
    this.elements.map(element => {
      element.classList.remove('slide');
      element.style.display = 'block';
      element.style.transform = 'translate3D(0, 0, 0)';
    });
    this.scrollSubscription.unsubscribe();
    return this.currentIndex;
  }

  private handleScrollEvent(payload: SlideObsPayload): void {
    const toIndex = (payload.deltaY >= 0) ? this.currentIndex + 1 : this.currentIndex - 1;
    if (this.elements.length > toIndex && toIndex >= 0) this.scrollToIndex(toIndex);
  }

  private refreshElements(): void {
    this.elements = SlideHelper.getNg2SlideElements();
  }

  private checkWhereIsScroll(payload: SlideObsPayload): boolean {
    payload.whereIsScrollInsideSlide =
      TranslateSliderHelper.whereIsScrollInsideSlide(this.elements, this.currentIndex);
    return payload.whereIsScrollInsideSlide.top && payload.deltaY < 0 ||
    payload.whereIsScrollInsideSlide.bottom && payload.deltaY > 0;
  }

  private checkThreshold(payload: SlideObsPayload): boolean {
    return Math.abs(payload.deltaY) > this.config.sensitivity;
  }
}
