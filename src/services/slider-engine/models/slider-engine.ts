import { SlideObsPayload } from './slide-obs-payload';
import { SlideServiceConfig, SlideEvent } from '../../models';
import { Observable, Subscription } from 'rxjs';

export interface SliderEngine {
  scrollObservable: Observable<SlideObsPayload>;
  currentIndex: number;
  pause: boolean;

  init(
    initialIndex: number,
    config?: SlideServiceConfig
  ): Observable<SlideEvent>;

  scrollToIndex(toIndex: number): void;
  setEndState(currentIndex: number): void;

  setPause(state: boolean): void;

  remove(): number;
}
