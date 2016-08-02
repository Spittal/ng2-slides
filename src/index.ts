import {
  ElementAttributeService,
  OpenCloseAnimationService
} from './services';
import {
  DomElementAttributeService,
  DomOpenCloseAnimationService
} from './browser';

export const OPEN_CLOSE_ANIMATION_DOM_PROVIDERS = [
  {
    provide: ElementAttributeService,
    useClass: DomElementAttributeService
  },
  {
    provide: OpenCloseAnimationService,
    useClass: DomOpenCloseAnimationService
  }
];

export * from './services';
