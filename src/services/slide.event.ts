export abstract class SlideEvent {
	constructor(
		public fromIndex: number,
		public toIndex: number) {}
}

export class SlideEventStart extends SlideEvent {}
export class SlideEventEnd extends SlideEvent {}