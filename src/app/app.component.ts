import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { SlideService } from 'ng2-slides';
import { views } from './app-nav-views';

@Component({
  selector: 'my-app',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  views = views;

  constructor(private slides: SlideService) {
  }

  ngOnInit() {
    this.slides.init();
  }

  activateEvent(event) {
    if (ENV === 'development') {
      console.log('Activate Event:', event);
    }
  }

  deactivateEvent(event) {
    if (ENV === 'development') {
      console.log('Deactivate Event', event);
    }
  }
}
