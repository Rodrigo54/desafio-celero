import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import MD5 from 'crypto-js/md5';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  endPoint: string;
  privateKey: string;
  publicKey: string;

  constructor(public http: HttpClient) {
    this.endPoint = environment.API_END_POINT;
    this.publicKey = environment.MARVEL_PUBLIC_KEY;
    this.privateKey = environment.MARVEL_PRIVATE_KEY;
  }

  get playerSelected$() {
    return false;
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
