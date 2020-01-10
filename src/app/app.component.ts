import { Component, OnInit, VERSION } from '@angular/core';
import { PlayerService } from '@core/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  playerSelected = false;

  version = VERSION;
  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.playerService.playerStart$.subscribe(start => {
      this.playerSelected = start;
    });
  }

}
