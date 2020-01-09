import { GameService } from '@core/game.service';
import { Player, PlayerService } from '@core/player.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-players-header',
  templateUrl: './players-header.component.html',
  styleUrls: ['./players-header.component.scss']
})
export class PlayersHeaderComponent implements OnInit {

  players: Player[] = [undefined, undefined];

  constructor(
    private playerService: PlayerService,
  ) { }

  ngOnInit() {
    this.playerService.players$.subscribe(players => {
      this.players = Object.values(players);
    });
  }
}
