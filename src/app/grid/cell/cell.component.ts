import { Component, HostListener, Input, OnInit } from '@angular/core';
import { GameService, TicTacToe } from '@core/game.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  player1 = false;
  player2 = false;
  currentPlayer: TicTacToe;
  cell: TicTacToe = null;

  @Input() col: number;
  @Input() row: number;
  endGame = false;

  constructor(private game: GameService) { }

  ngOnInit() {
    this.game.currentPlayer$.subscribe(player => {
      this.currentPlayer = player;
    });

    this.game.endGame$.subscribe(endGame => {
      this.endGame = endGame;
    });

    this.game.getCell(this.row, this.col).subscribe(move => {
      this.cell = move.player || null;
      if (this.cell === 'X') {
        this.player1 = true;
        this.player2 = false;
      }
      if (this.cell === 'O') {
        this.player1 = false;
        this.player2 = true;
      }
      if (this.cell === null) {
        this.player1 = false;
        this.player2 = false;
      }
    });
  }

  @HostListener('click', ['$event'])
  onClick($event: MouseEvent) {
    if (!this.endGame && this.cell === null) {
      this.cell = this.currentPlayer;
      this.game.insert(this.row, this.col);
    }
  }
}
