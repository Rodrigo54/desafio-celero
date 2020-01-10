import { PlayerService } from '@core/player.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-choice',
  templateUrl: './player-choice.component.html',
  styleUrls: ['./player-choice.component.scss']
})
export class PlayerChoiceComponent implements OnInit {

  constructor(private playerService: PlayerService) {}

  players = {
    1: false,
    2: false
  };

  ngOnInit() {
  }

  onSelect(value: any, player: 1 | 2) {
    const data = {
      thumbnail: `${value.thumbnail.path}.${value.thumbnail.extension}`,
      name: value.name
    };
    this.playerService.setPlayer(data, player);
    this.players[player] = true;
  }

  play() {
    this.playerService.start();
  }

  get disableBtn() {
    return !(this.players[1] && this.players[2]);
  }
}
