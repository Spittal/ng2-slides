import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { SlideComponent } from './src/slide';
import { SlideService } from './src/services';

export * from './src/slide';
export * from './src/services';

@NgModule({
  declarations: [
    SlideComponent
  ],
  providers: [
    SlideService
  ],
  exports: [
    SlideComponent
  ]
})
export class SlidesModule {}
