import { PlayerService } from '@core/player.service';
import { Component, OnInit } from '@angular/core';
import { GameService } from '@core/game.service';
import { Observable, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  endGame$: Observable<any>;

  constructor(
    private game: GameService,
    private playerService: PlayerService,
  ) { }

  ngOnInit() {
    this.endGame$ = this.game.endGame$.pipe(
      tap(endGame => {
        if (endGame && endGame.player) {
          this.playerService.addPoint(endGame.player);
        }
      }),
      switchMap(endGame => {
        if (endGame && endGame.player) {
          return this.playerService.getPlayer(endGame.player);
        } else {
          return of(endGame);
        }
      })
    );
  }

  reset() {
    this.game.reset();
  }

}
