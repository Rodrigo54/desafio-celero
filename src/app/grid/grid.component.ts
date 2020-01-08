import { Component, OnInit } from '@angular/core';
import { GameService } from '@core/game.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  endGame$: Observable<any>;

  constructor(private game: GameService) { }

  ngOnInit() {
    this.endGame$ = this.game.endGame$;
  }

  reset() {
    this.game.reset();
  }

}
