import { Component } from '@angular/core';

@Component({
	selector: 'ng2-slide',
	styles: [
		`:host {
			display: block;
			height: auto;
		}
		
		@media only screen and (min-height: 600px) {
			:host {
				height: 100vh;
			}
		}`
	],
	template: `<ng-content></ng-content>`
})
export class SlideComponent {

}
