import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';

describe('GameService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      CommonModule,
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: GameService = TestBed.get(GameService);
    expect(service).toBeTruthy();
  });

  it('check [ X ] is wins', () => {
    const service: GameService = TestBed.get(GameService);
    service.insert(0, 0); // x
    service.insert(0, 1); // o
    service.insert(1, 1); // x
    service.insert(1, 0); // o
    service.insert(2, 2); // x
    service.endGame$.subscribe(endGame => {
      expect(endGame).toEqual({ player: 'X', victory: true });
    });
  });

  it('check [ O ] is wins', () => {
    const service: GameService = TestBed.get(GameService);
    service.insert(0, 0); // x
    service.insert(1, 1); // o
    service.insert(0, 1); // x
    service.insert(0, 2); // o
    service.insert(1, 2); // x
    service.insert(2, 0); // o
    service.endGame$.subscribe(endGame => {
      expect(endGame).toEqual({ player: 'O', victory: true });
    });
  });

  it('check empate', () => {
    const service: GameService = TestBed.get(GameService);
    service.insert(0, 0); // x
    service.insert(1, 1); // o
    service.insert(0, 1); // x
    service.insert(0, 2); // o
    service.insert(2, 0); // x
    service.insert(1, 0); // o
    service.insert(1, 2); // x
    service.insert(2, 2); // o
    service.insert(2, 1); // x
    service.endGame$.subscribe(endGame => {
      expect(endGame).toEqual({ draw: true });
    });
  });
});
