export class TranslateSliderAnimator {

  public static animateTranslate(
    elements: any[], fromIndex: number, toIndex: number, callback: () => void
  ): void {
    elements[toIndex].style.display = 'block';

    const difference: number = toIndex - fromIndex;
    const fromIndexFinal: string = (difference > 0) ?
      'translate3D(0, -100%, 0)' : 'translate3D(0, 100%, 0)';
    const toIndexStart: string = (difference < 0) ?
      'translate3D(0, -100%, 0)' : 'translate3D(0, 100%, 0)';
    const animationMeta = {
      duration: 300,
      easing: 'ease'
    };

    elements[fromIndex].style.transform = fromIndexFinal;
    const fromIndexPlayer = elements[fromIndex].animate([
      { transform: 'translate3D(0, 0, 0)' },
      { transform: fromIndexFinal }
    ], animationMeta);
    elements[toIndex].style.transform =  'translate3D(0, 0, 0)';
    const toIndexPlayer = elements[toIndex].animate([
      { transform: toIndexStart },
      { transform: 'translate3D(0, 0, 0)' }
    ], animationMeta);

    fromIndexPlayer.onfinish = callback;
  }

}


