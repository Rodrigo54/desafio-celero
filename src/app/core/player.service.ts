import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import MD5 from 'crypto-js/md5';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Player {
  thumbnail: string;
  name: string;
  type: 'X' | 'O' | null;
  wins: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  endPoint: string;
  privateKey: string;
  publicKey: string;

  private playersSubject = new BehaviorSubject<{ 1: Player, 2: Player }>(
    {
      1: {
        thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55.jpg',
        name: 'Iron Man',
        wins: 0,
        type: 'X'
      },
      2: {
        thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b.jpg',
        name: 'Spider-Man',
        wins: 0,
        type: 'O'
      }
    }
  );
  private playerStartSubject = new BehaviorSubject(undefined);

  constructor(public http: HttpClient) {
    this.endPoint = environment.API_END_POINT;
    this.publicKey = environment.MARVEL_PUBLIC_KEY;
    this.privateKey = environment.MARVEL_PRIVATE_KEY;
  }

  get playerStart$() {
    return this.playerStartSubject.asObservable();
  }

  getPlayer(player: 'X' | 'O') {
    return this.playersSubject.asObservable().pipe(
      map(players => Object.values(players).find(p => p.type === player))
    );
  }

  get players$() {
    return this.playersSubject.asObservable();
  }

  setPlayer(value: Omit<Player, 'type' | 'wins'>, player: 1 | 2) {
    let player1: Player;
    let player2: Player;
    if (player === 1) {
      player1 = {
        ...value,
        wins: 0,
        type: null
      };
    }
    if (player === 2) {
      player2 = {
        ...value,
        wins: 0,
        type: null
      };
    }
    this.playersSubject.next({ 1: player1, 2: player2 });
  }

  addPoint(player: 'X' | 'O') {
    const { 1: player1, 2: player2 } = this.playersSubject.getValue();
    if (player1.type === player) {
      player1.wins = player1.wins + 1;
    }
    if (player2.type === player) {
      player2.wins = player2.wins + 1;
    }
    this.playersSubject.next({ 1: player1, 2: player2 });
  }

  start() {
    this.defineTypes();
    this.playerStartSubject.next(true);
  }

  defineTypes() {
    const { 1: player1, 2: player2 } = this.playersSubject.getValue();
    const num = Math.floor(Math.random() * (1000 - 1)) + 1;
    if (num % 2 === 0) {
      player1.type = 'X';
      player2.type = 'O';
    } else {
      player1.type = 'O';
      player2.type = 'X';
    }
    this.playersSubject.next({ 1: player1, 2: player2 });
  }

  search(text: string) {
    const params = this.makeParams({ limit: '5', nameStartsWith: text });
    return this.http.get(`${this.endPoint}characters`, { params }).pipe(
      map((res: any) => res.data.results)
    );
  }

  makeParams(params?: any) {
    const ts = new Date().getTime();
    const hash =  MD5(ts + this.privateKey + this.publicKey);
    let httpParams = new HttpParams();
    httpParams = httpParams.set('ts', ts.toString());
    httpParams = httpParams.set('apikey', this.publicKey);
    httpParams = httpParams.set('hash', hash.toString());
    if (params) {
      for (const [key, value] of Object.entries<string>(params)) {
        httpParams = httpParams.set(key, value);
      }
    }
    return httpParams;
  }
}
