import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

export type TicTacToe = 'X' | 'O';
type Tuple3<T> = [T, T, T];
type Board3x3<P> = Tuple3<Tuple3<P>>;

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private board: Board3x3<TicTacToe | null> = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  private playerSubject = new BehaviorSubject<TicTacToe>('X');
  private moveSubject = new BehaviorSubject(null);
  private endGameSubject = new BehaviorSubject(undefined);
  private playCount = 0;

  constructor() { }

  get currentPlayer$() {
    return this.playerSubject.asObservable();
  }

  get endGame$() {
    return this.endGameSubject.asObservable();
  }

  getCell(row: number, col: number) {
    return this.moveSubject.asObservable().pipe(
      filter(move => move ? move.row === row && move.col === col : false)
    );
  }

  insert(row: number, col: number) {
    const player = this.playerSubject.getValue();
    this.board[row][col] = player;
    this.moveSubject.next({ row, col, player });
    this.playCount++;
    this.checkGame();
    this.changePlayer();
  }

  changePlayer() {
    const player = this.playerSubject.getValue();
    if (player === 'X') {
      this.playerSubject.next('O');
    }
    if (player === 'O') {
      this.playerSubject.next('X');
    }
  }

  checkDiagonal() {
    const player = this.playerSubject.getValue();
    let dig1 = 0;
    let dig2 = 0;
    for (const i of this.board.keys()) {
      if (this.board[i][i] === player) {
        dig1++;
      }
      if (this.board[i][2 - i] === player) {
        dig2++;
      }
    }
    if (dig1 === 3 || dig2 === 3) {
      return true;
    } else {
      return false;
    }
  }

  checkRow() {
    const player = this.playerSubject.getValue();
    let lin: number;
    for (const row of this.board) {
      lin = 0;
      for (const cell of row) {
        if (cell === player) {
          lin++;
        }
      }
      if (lin === 3) {
        return true;
      }
    }
    return false;
  }

  checkCol() {
    const player = this.playerSubject.getValue();
    let col: number;

    for (const i of this.board.keys()) {
      col = 0;
      for (const j of this.board[i].keys()) {
        if (this.board[j][i] === player) {
          col++;
        }
      }
      if (col === 3) {
        return true;
      }
    }
    return false;
  }

  checkGame() {
    const player = this.playerSubject.getValue();
    if (this.checkDiagonal() ||  this.checkRow() || this.checkCol()) {
      this.endGameSubject.next({ player, victory: true });
    }
    if (this.playCount === 9) {
      this.endGameSubject.next({ draw: true });
    }
  }


  reset() {
    this.playCount = 0;
    this.playerSubject.next('X');
    for (const i of this.board.keys()) {
      for (const j of this.board[i].keys()) {
        this.board[i][j] = null;
        this.moveSubject.next({ row: i, col: j, player: null });
      }
    }
    this.endGameSubject.next(undefined);
  }

}
