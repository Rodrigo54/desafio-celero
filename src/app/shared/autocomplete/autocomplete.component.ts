import { Component, ContentChild, ContentChildren, Input, Output, QueryList, TemplateRef, ViewChild, EventEmitter } from '@angular/core';
import { merge } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AutocompleteContentDirective } from './autocomplete-content.directive';
import { OptionComponent } from './option/option.component';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  exportAs: 'appAutocomplete',
})
export class AutocompleteComponent {
  @ViewChild('root', { static: true }) rootTemplate: TemplateRef<any>;

  @ContentChild(AutocompleteContentDirective, { static: true })
  content: AutocompleteContentDirective;

  @ContentChildren(OptionComponent) options: QueryList<OptionComponent>;

  @Input() displayWith: ((value: any) => string) | null = null;

  @Output() optionSelected = new EventEmitter();

  optionsClick() {
    return this.options.changes.pipe(
      switchMap(options => {
        const clicks$ = options.map(option => option.click$);
        return merge(...clicks$);
      })
    );
  }

  emitSelected(value: any) {
    this.optionSelected.emit(value);
  }
}
