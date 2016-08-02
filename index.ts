/// <reference path="./src/types/animation.d.ts" />
/// <reference path="./src/types/player.d.ts" />

import {
  ElementAttributeService,
  OpenCloseAnimationService
} from './src/services';

export const STATE_ANIMATION_PROVIDERS = [
  ElementAttributeService,
  OpenCloseAnimationService
];

export * from './src/services';
 