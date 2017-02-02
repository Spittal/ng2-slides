export interface SlideObsPayload {
  event: any | Event;
  deltaY: number;
  deltaX: number;
  whereIsScrollInsideSlide?: { top: boolean, bottom: boolean };
}
