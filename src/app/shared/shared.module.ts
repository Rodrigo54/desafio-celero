import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AutocompleteModule } from './autocomplete/autocomplete.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { ButtonComponent } from './button/button.component';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';

@NgModule({
  declarations: [ButtonComponent, ThumbnailComponent],
  imports: [
    CommonModule,
    OverlayModule,
    AutocompleteModule,
  ],
  exports: [AutocompleteModule, ButtonComponent, ThumbnailComponent]
})
export class SharedModule { }
