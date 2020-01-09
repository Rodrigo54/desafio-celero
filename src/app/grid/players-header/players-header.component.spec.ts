import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersHeaderComponent } from './players-header.component';

describe('PlayersHeaderComponent', () => {
  let component: PlayersHeaderComponent;
  let fixture: ComponentFixture<PlayersHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayersHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
