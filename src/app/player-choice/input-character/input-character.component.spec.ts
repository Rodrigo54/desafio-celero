import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCharacterComponent } from './input-character.component';

describe('InputCharacterComponent', () => {
  let component: InputCharacterComponent;
  let fixture: ComponentFixture<InputCharacterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputCharacterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
