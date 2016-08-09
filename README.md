# Ng2 Slides

- [github](https://github.com/spittal/ng2-slides)
- [npm](https://www.npmjs.com/package/ng2-slides)

This is a small library to create sliding full-height panel effect for Angular2. It has full touch support, keyboard arrow support, and will fall back onto a 'normal' scroll website when the browser height dips below 600px.

### Demo
Check out a small demo of the package [here](https://spittal.github.io/ng2-slides/public/index.html)

## 1: Installation

You can install this just like you would any other npm package.
```bash
npm install --save-dev ng2-slides
```

## 2: Useage

First and foremost you need to provide the `SlideService` to your application. Preferably you would do this in your Angular2 application bootstrap
```typescript
import { SlideService } from 'ng2-slides';

boostrap(App, [
	SlideService
])
```

Second you need to use the `ng2-slide` component in your template. And Inject the `SlideService` using constructor injection.
```typescript
import { SlideComponent } from 'ng2-slides';

/**
 * Example Home Component
 */
import { Component } from '@angular/core';
@Component({
	selector: 'home',
	directives: [
		SlideComponent // <-- Add the SlideComponent
	],
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
export class Component {
	
	constructor(
		private slide: SlideService // <-- make sure you remember to inject the slide service.
	) {}

}
```
You may add as few or as many slides as you like, everything will be taken care of!

The SlideService will do everything you need it to as part of it's constructor. So all you need to do it inject it, like above!

## 2.1: Navigate imparitavely

Suppose you want to naviate to slide 3 from slide 1. Well we can do that with the slide service. Let's use the component above to see how.

```typescript
import { SlideComponent } from 'ng2-slides';

/**
 * Example Home Component
 */
import { Component, OnInit } from '@angular/core';
@Component({
	selector: 'home',
	directives: [
		SlideComponent
	],
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
	`
})
export class Component implements OnInit {
	
	constructor(
		private slide: SlideService
	) {}

	ngOnInit() { // <-- Use OnInit so the components are loaded
		this.slide.scrollToIndex(2) // <-- You naviate based on index, so it starts at 0.
	}
}
```

The example above will on startup move to the 3rd slide on the page. Pretty cool!

## 2.2 Listen for changes

There is a `slideChanges` observable exposed on the `SlideService` use this to listen for changes
```typescript
// Same decorator as above
export class Component implements OnInit {
	
	constructor(
		private slide: SlideService
	) {}

	ngOnInit() {
		this.slide.scrollToIndex(2)
		this.slide.slideChanges.subscribe( 
			slideEvent => console.log(slideEvent)
		)
		// Will log out
		// SlideEventStart {fromIndex: 0, toIndex: 2}
		// SlideEventEnd {fromIndex: 0, toIndex: 2}
	}
}
```
The observable emits the type of `SlideEventStart` and `SlideEventEnd` both of which are `SlideEvent` classes and are found as an import in the package.

## 2.3 Custom config

You can change the sensitivity it takes to trigger a scroll by passing in a `SlideServiceConfig` object into the `setConfiguration` method of `SlideService`

```typescript
// Same decorator as above
export class Component implements OnInit {
	
	constructor(
		private slide: SlideService
	) {}

	ngOnInit() {
		this.slide.setConfiguration({
			sensitivity: 50 // by default this is 20
		})
	}
}
```

`SlideServiceConfig` only has one option right now. You can find it's interface [here](https://github.com/Spittal/ng2-slides/blob/master/src/services/slide-service.config.ts)