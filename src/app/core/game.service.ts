import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

  constructor() {
    console.log(this.board);
  }

  get currentPlayer$() {
    return this.playerSubject.asObservable();
  }

  insert(row: number, col: number, ) {
    const player = this.playerSubject.getValue();
    this.board[row][col] = player;
    this.changePlayer();
    console.log(this.board);
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

}
