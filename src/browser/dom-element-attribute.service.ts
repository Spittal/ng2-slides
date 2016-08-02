import { Injectable, ElementRef } from '@angular/core';

@Injectable()
export class DomElementAttributeService {

  public getWidth(element: (ElementRef | HTMLElement)): number {
    return this.getElement(element).clientWidth;
  }

  public getOffsets(element: (ElementRef | HTMLElement)): {
    top: number,
    left: number,
    topFromViewport: number
  } {
    element = this.getElement(element);
    return {
      top: element.getBoundingClientRect().top + window.scrollY,
      left: element.offsetLeft,
      topFromViewport: element.getBoundingClientRect().top
    }
  }

  public getChildWidth(element: (ElementRef | HTMLElement), query: string): number {
    return this.getElement(element).querySelector(query).clientWidth;
  }

  public getElement(element: (ElementRef | HTMLElement)): HTMLElement {
    return (element instanceof ElementRef) ? element.nativeElement : element;
  }

}
