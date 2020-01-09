import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { GridComponent } from './grid/grid.component';
import { CellComponent } from './grid/cell/cell.component';
import { PlayerChoiceComponent } from './player-choice/player-choice.component';
import { InputCharacterComponent } from './player-choice/input-character/input-character.component';
import { SharedModule } from './shared/shared.module';
import { PlayersHeaderComponent } from './grid/players-header/players-header.component';

@NgModule({
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
