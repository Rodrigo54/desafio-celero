import { GameService, TicTacToe } from '@core/game.service';
import { Component, OnInit, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  player1 = false;
  player2 = false;
  currentPlayer: TicTacToe;

  @Input() col: number;
  @Input() row: number;

  constructor(private game: GameService) { }

  ngOnInit() {
    this.game.currentPlayer$.subscribe(player => {
      this.currentPlayer = player;
    });
  }

  @HostListener('click', ['$event'])
  onClick($event: MouseEvent) {
    if (this.currentPlayer === 'X') {
      this.player1 = true;
      this.player2 = false;
    }
    if (this.currentPlayer === 'O') {
      this.player1 = false;
      this.player2 = true;
    }

    this.game.insert(this.row, this.col);

    console.log('position', this.col, this.row);
    console.log('button', $event);
  }

}
