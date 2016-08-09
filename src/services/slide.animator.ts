export class SlideAnimator {

  public animateScroll(start: number, end: number, callback: () => void): void {
    const difference = end - start;

    const step = () => {
      window.scrollTo(
        window.scrollX,
        window.scrollY + this.scrollAmount(window.scrollY, difference, end)
      );

      if (this.checkIfDone(window.scrollY, difference, end)) {
        window.scrollTo(window.scrollX, end);
        callback();
      } else {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  }

  private ease(end: number, current: number, power: number): number {
    return (1 - current / end) * (power ** 3) + power;
  }

  private scrollAmount(scrollPos: number, difference: number, end: number): number {
    const easing = this.ease(Math.abs(difference), Math.abs(scrollPos - end), 6.66);

    return (difference > 0) ? easing : -easing;
  }

  private checkIfDone(scrollPosition: number, difference: number, end: number): boolean {
    if (difference > 0 && scrollPosition >= end) {
      return true;
    } else if (difference < 0 && scrollPosition <= end) {
      return true;
    } else {
      return false;
    }
  }

}


