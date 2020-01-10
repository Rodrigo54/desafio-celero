import { SharedModule } from '@shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersHeaderComponent } from './players-header.component';
import { CoreModule } from '@core/core.module';

describe('PlayersHeaderComponent', () => {
  let component: PlayersHeaderComponent;
  let fixture: ComponentFixture<PlayersHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayersHeaderComponent ],
      imports: [SharedModule, CoreModule]
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
