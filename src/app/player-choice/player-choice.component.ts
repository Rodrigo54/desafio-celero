import { PlayerService } from '@core/player.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-choice',
  templateUrl: './player-choice.component.html',
  styleUrls: ['./player-choice.component.scss']
})
export class PlayerChoiceComponent implements OnInit {

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
  }

}
