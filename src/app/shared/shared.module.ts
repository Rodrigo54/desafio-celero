import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AutocompleteModule } from './autocomplete/autocomplete.module';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OverlayModule,
    AutocompleteModule,
  ],
  exports: [AutocompleteModule]
})
export class SharedModule { }
