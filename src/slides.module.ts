import { NgModule } from '@angular/core';
import { SlideComponent } from './slide';
import { SlideService } from './services';

@NgModule({
  declarations: [
    SlideComponent
  ],
  providers: [
  	SlideService
  ],
  bootstrap: [ SlideComponent ]
})
export class SlidesModule {}