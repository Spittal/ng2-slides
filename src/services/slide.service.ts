import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { SlideEvent, SlideServiceConfig } from './models';
import { SliderEngine, TranslateSliderEngine, ScrollSliderEngine } from './slider-engine';
import { SlideHelper } from './slide-helper';

@Injectable()
export class SlideService {
  public slideChange: ReplaySubject<SlideEvent> = new ReplaySubject<SlideEvent>();

  private engine: SliderEngine;
  private config: SlideServiceConfig = {
    sensitivity: 40,
    minHeight: 400,
    minWidth: 800
  };

  public init(initialIndex = 0, config?: SlideServiceConfig) {
    if (config) { this.config = config; }
    this.engine = new (this.checkWhichEngineToUse())();
    this.bootstrapEngine(initialIndex);
    this.startResizeListener();
  }

  public scrollToIndex(toIndex: number): void {
    this.engine.scrollToIndex(toIndex);
  }

  public setPause(state: boolean): void {
    this.engine.setPause(state);
  }


  private bootstrapEngine(initialIndex: number): void {
    this.engine.init(initialIndex, this.config)
      .subscribe(event => this.slideChange.next(event));
  }

  private startResizeListener(): void {
    Observable.fromEvent(window, 'resize')
      .debounceTime(300)
      .map(() => this.checkWhichEngineToUse())
      .filter(newEngine => !(this.engine instanceof newEngine))
      .subscribe(newEngine => {
        const previousIndex = this.engine.remove();
        delete this.engine;
        this.engine = new (newEngine)();
        this.bootstrapEngine(previousIndex);
      });
  }

  private checkWhichEngineToUse(): any {
    if (
      SlideHelper.isTouchDevice() ||
      window.innerHeight < this.config.minHeight ||
      window.innerWidth < this.config.minWidth
    ) {
      return ScrollSliderEngine;
    } else {
      return TranslateSliderEngine;
    }
  }
}
