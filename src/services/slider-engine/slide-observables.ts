import { Observable } from 'rxjs';
import { SlideObsPayload } from './models';

export class SlideObservables {

  public static scrollObs: Observable<SlideObsPayload> =
    Observable.merge(Observable.fromEvent(window, 'wheel'))
      .merge(Observable.fromEvent(window, 'mousewheel'))
      .merge(Observable.fromEvent(window, 'DOMMouseScroll'))
      .map(event => {
        return {
          event: event,
          deltaY: (<any> event).deltaY || 0,
          deltaX: (<any> event).deltaX || 0
        };
      });

  public static touchMoveObs: Observable<SlideObsPayload> =
    Observable.fromEvent(window, 'touchmove')
      .map(event => {
        return {
          event: event,
          deltaY: 0,
          deltaX: 0
        };
      });

  public static touchObs: Observable<SlideObsPayload> =
    Observable.fromEvent(window, 'touchstart')
      .zip(Observable.fromEvent(window, 'touchend'))
      .map(payload => {
        const anyPayload: any = <any> payload;

        // Below, layerY is for iOS and Safari devices,
        // while changesTouches.clientY is for Chrome, Firefox and, IE.
        return {
          event: payload[1],
          deltaY: (anyPayload[0].layerY || anyPayload[0].changedTouches[0].clientY)  -
                  (anyPayload[1].layerY || anyPayload[1].changedTouches[0].clientY),
          deltaX: (anyPayload[0].layerX || anyPayload[0].changedTouches[0].clientX) -
                  (anyPayload[1].layerX || anyPayload[1].changedTouches[0].clientX)
        };
      })
      .filter(change => Math.abs(change.deltaY) > 50);

  public static keys: {} = {37: true, 38: true, 39: true, 40: true};
  public static keyObs: Observable<SlideObsPayload> =
    Observable.fromEvent(document, 'keydown')
      .filter(event => SlideObservables.keys[(<any> event).keyCode])
      .map(event => {
        let change: number;
        if ((<any> event).key === 'ArrowDown') {
          change = 999999;
        } else if ((<any> event).key === 'ArrowUp') {
          change = -999999;
        }
        return {
          event: event,
          deltaY: change,
          deltaX: 0
        };
      });

  public static deviceMotionObs: Observable<SlideObsPayload> =
    Observable.fromEvent(window, 'devicemotion')
      .filter(event => {
        return (<any> event).rotationRate.alpha < -5 ||
               (<any> event).rotationRate.alpha > 5;
      })
      .throttleTime(300)
      .map(event => {
        return {
          event: event,
          deltaY: - ((<any> event).rotationRate.alpha * 5),
          deltaX: 0
        };
      });

  public static slideObs: Observable<SlideObsPayload> =
    <Observable<SlideObsPayload>> Observable
      .merge(SlideObservables.scrollObs)
      .merge(SlideObservables.keyObs)
      .map(SlideObservables.handleBrowserEdgecases);

  public static normalScrollObs: Observable<SlideObsPayload> =
    <Observable<SlideObsPayload>> Observable
      .merge(SlideObservables.scrollObs)
      .merge(SlideObservables.touchMoveObs)
      .map(SlideObservables.handleBrowserEdgecases);

  public static handleBrowserEdgecases(payload: SlideObsPayload): SlideObsPayload {
    const browser: string = navigator.userAgent.toLowerCase();

    // For some reason firefox's deltas are really low, so we bump them up!
    if (browser.includes('firefox')) {
      return {
        event: payload.event,
        deltaX: payload.deltaX * 10,
        deltaY: payload.deltaY * 10
      };
    } else {
      return payload;
    }
  }
}
