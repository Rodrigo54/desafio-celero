import { TestBed } from '@angular/core/testing';

import { AutocompleteContentDirective } from './autocomplete-content.directive';
import { TemplateRef } from '@angular/core';

describe('AutocompleteContentDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AutocompleteContentDirective,
        TemplateRef
      ]
    });
  });

  it('should create an instance', () => {
    const directive = TestBed.get(AutocompleteContentDirective);
    expect(directive).toBeTruthy();
  });
});
