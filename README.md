# Ng2 Slides

- [github](https://github.com/spittal/ng2-slides)
- [npm](https://www.npmjs.com/package/ng2-slides)

This is a small library to create sliding full-height panel effect for Angular2. It has full touch support, keyboard arrow support, and will fall back onto a 'normal' scroll website when the browser height dips below 600px.

This readme was written with Angular2 RC 5 + in mind.

### Demo
Check out a small demo of the package [here](https://spittal.github.io/ng2-slides/public/index.html)

## 1: Installation

You can install this just like you would any other npm package.
```bash
npm install --save-dev ng2-slides
```

## 2: Useage

First and foremost you need to provide the `SlidesModule` to your desired Module.

```
import { SlidesModule } from 'ng2-slides';

@NgModule({
	imports: [
		SlidesModule
	]
})
```

Now that you have imported the `SlidesModule` you now have access to the `ng2-slide` component in your template, as well as you can inject the `SlideService` into your components.

Make sure that you run the `init` method of the `SlideService` on your `ngOnInit`.
```typescript
import { SlideService } from 'ng2-slides';

/**
 * Example Home Component
 */
import { Component, OnInit } from '@angular/core';
@Component({
	selector: 'home',
	template: `
		<ng2-slide>
			Some content you want in your first slide
		</ng2-slide>
		<ng2-slide>
			Some content you want in your second slide
		</ng2-slide>
		<ng2-slide>
			Some content you want in your third slide
		</ng2-slide>
	` // <-- use the ng2-slide component as many times as you'd like
})
export class Component implements OnInit {
	
	constructor(
		private slide: SlideService // <-- make sure you remember to inject the slide service.
	) {}

	ngOnInit() {
		this.slide.init();
	}

}
```
You may add as few or as many slides as you like, everything will be taken care of!

## 2.1: Navigate imparitavely

Suppose you want to naviate to slide 3 from slide 1. Well we can do that with the slide service. Let's use the component above to see how.
```typescript
// ...Same as above
export class Component implements OnInit {
	
	constructor(
		private slide: SlideService
	) {}

	ngOnInit() {
		this.slide.init();
		this.slide.scrollToIndex(2); // <-- that's it!
	}

}
```

The example above will on startup move to the 3rd slide on the page. Pretty cool!

## 2.2 Listen for changes

There is a `slideChanges` observable exposed on the `SlideService` use this to listen for changes
```typescript
// ...Same as above
export class Component implements OnInit {
	
	constructor(
		private slide: SlideService
	) {}

	ngOnInit() {
		this.slide.init();
		this.slide.scrollToIndex(2);
		this.slide.slideChanges.subscribe(
			slideEvent => console.log(slideEvent)
		);
		// The above subscription will log
		// SlideEventStart{fromIndex: 0, toIndex: 2}
		// SlideEventEnd{fromIndex: 0, toIndex: 2}
	}

}
```
The observable emits the type of `SlideEventStart` and `SlideEventEnd` both of which are `SlideEvent` classes and are found as an import in the package.

## 2.3 Custom config

You can change the sensitivity it takes to trigger a scroll by passing in a `SlideServiceConfig` object into the `setConfiguration` method of `SlideService`

```typescript
// ...Same as above
export class Component implements OnInit {
	
	constructor(
		private slide: SlideService
	) {}

	ngOnInit() {
		this.slide.setConfiguration({
			sensitivity: 50 // by default this is 20
		});
		this.slide.init();
	}
}
```

`SlideServiceConfig` only has one option right now. You can find it's interface [here](https://github.com/Spittal/ng2-slides/blob/master/src/services/slide-service.config.ts)