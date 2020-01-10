import { CoreModule } from '@core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputCharacterComponent } from './input-character/input-character.component';
import { SharedModule } from '@shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerChoiceComponent } from './player-choice.component';

describe('PlayerChoiceComponent', () => {
  let component: PlayerChoiceComponent;
  let fixture: ComponentFixture<PlayerChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerChoiceComponent, InputCharacterComponent ],
      imports: [SharedModule, ReactiveFormsModule, CoreModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
