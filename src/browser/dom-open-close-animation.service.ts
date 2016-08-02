import { Injectable, ElementRef } from '@angular/core';
import { ElementAttributeService } from '../services';

@Injectable()
export class DomOpenCloseAnimationService {

  constructor(
    private attr: ElementAttributeService
  ) { }

  public open(
    element: (ElementRef | HTMLElement),
    animation: Animation,
    callback?: (e?: Event) => void
  ): Player {
    const player: Player = this.makeAnimation(element, animation);
    player.onfinish = (e) => {
      this.setElementStyles(element, animation.frames[animation.frames.length - 1]);
      if (callback) callback(e);
    };
    return player;
  }

  public close(
    element: (ElementRef | HTMLElement),
    animation: Animation,
    callback?: (e?: Event) => void
  ): Player {
    const player: Player = this.makeAnimation(element, animation);
    player.playbackRate = -1;
    player.play();
    player.onfinish = (e) => {
      this.removeStyles(element);
      if (callback) callback(e);
    };
    return player;
  }

  private setElementStyles(element: (HTMLElement | ElementRef), styles: Object): void {
    element = this.attr.getElement(element);
    for (let style in styles) {
      if (styles.hasOwnProperty(style)) {
        element.style[style] = styles[style];
      }
    }
  }

  private removeStyles(element: (HTMLElement | ElementRef)): void {
    element = this.attr.getElement(element);
    element.removeAttribute('style');
  }

  private makeAnimation(element: (HTMLElement | any), animation: Animation): Player {
    element = this.attr.getElement(element);
    return element.animate(animation.frames, animation.meta);
  }


}
