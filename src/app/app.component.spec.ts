import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { async, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { CellComponent } from './grid/cell/cell.component';
import { GridComponent } from './grid/grid.component';
import { PlayersHeaderComponent } from './grid/players-header/players-header.component';
import { InputCharacterComponent } from './player-choice/input-character/input-character.component';
import { PlayerChoiceComponent } from './player-choice/player-choice.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        GridComponent,
        CellComponent,
        PlayerChoiceComponent,
        InputCharacterComponent,
        PlayersHeaderComponent
      ],
      imports: [
        BrowserModule,
        CoreModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.header h1').textContent).toContain('Marvel Tic Tac Toe');
  });
});
