import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import { PlayerService } from './player.service';

describe('PlayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      CommonModule,
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: PlayerService = TestBed.get(PlayerService);
    expect(service).toBeTruthy();
  });
});
