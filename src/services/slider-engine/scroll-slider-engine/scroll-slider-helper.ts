export class ScrollSliderHelper {

  public static whatSlideIsScrollIn(elements: HTMLElement[]): number {
    const scrollPosition: number = window.scrollY + 500;
    return elements.findIndex(element => {
      return element.offsetTop <= scrollPosition &&
             scrollPosition <= element.offsetTop + element.clientHeight;
    });
  }

}
