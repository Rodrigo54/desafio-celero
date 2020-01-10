import { Overlay } from '@angular/cdk/overlay';
import { NgControl } from '@angular/forms';
import { TestBed } from '@angular/core/testing';

import { AutocompleteDirective } from './autocomplete.directive';
import { ElementRef, ViewContainerRef } from '@angular/core';

class MockElementRef extends ElementRef {
  constructor() { super(undefined); }
}

describe('AutocompleteDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AutocompleteDirective,
        { provide: ElementRef, useClass: MockElementRef },
        NgControl,
        ViewContainerRef,
        Overlay
      ]
    });
  });

  it('should create an instance', () => {
    const directive = TestBed.get(AutocompleteDirective);
    expect(directive).toBeTruthy();
  });
});
