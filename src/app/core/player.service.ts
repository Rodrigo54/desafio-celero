import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import MD5 from 'crypto-js/md5';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

interface Player {
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

  private player1: Player;
  private player2: Player;

  private playerStartSubject = new BehaviorSubject(undefined);

  constructor(public http: HttpClient) {
    this.endPoint = environment.API_END_POINT;
    this.publicKey = environment.MARVEL_PUBLIC_KEY;
    this.privateKey = environment.MARVEL_PRIVATE_KEY;
  }

  get playerStart$() {
    return this.playerStartSubject.asObservable();
  }

  getPlayer(player: 1 | 2) {
    return player === 1 ? this.player1 : this.player2;
  }

  setPlayer(value: Omit<Player, 'type' | 'wins'>, player: 1 | 2) {
    if (player === 1) {
      this.player1 = {
        ...value,
        wins: 0,
        type: null
      };
    }
    if (player === 2) {
      this.player2 = {
        ...value,
        wins: 0,
        type: null
      };
    }
  }

  start() {
    this.defineTypes();
    this.playerStartSubject.next(true);
  }

  defineTypes() {
    const num = Math.floor(Math.random() * (1000 - 1)) + 1;
    if (num % 2 === 0) {
      this.player1.type = 'X';
      this.player2.type = 'O';
    } else {
      this.player1.type = 'O';
      this.player2.type = 'X';
    }
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
