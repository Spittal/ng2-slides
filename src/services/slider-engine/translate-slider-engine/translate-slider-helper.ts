export class TranslateSliderHelper {

  public static whereIsScrollInsideSlide(
    elements: HTMLElement[],
    currentIndex: number
  ): { top: boolean, bottom: boolean } {
    return {
      top: TranslateSliderHelper.isAtTopOfElement(elements[currentIndex]),
      bottom: TranslateSliderHelper.isAtBottomOfElement(elements[currentIndex]),
    };
  }

  private static isAtTopOfElement(element: HTMLElement): boolean {
    return element.scrollTop <= 0;
  }

  private static isAtBottomOfElement(element: HTMLElement): boolean {
    /* Safari Exception, because it does it's padding weird */
    const browser: string = navigator.userAgent.toLowerCase();
    const paddingAddition: number = (browser.includes('safari')) ? 30 : 1;

    return element.scrollTop + (window.innerHeight + paddingAddition) >=
      element.firstElementChild.clientHeight;
  }
}
