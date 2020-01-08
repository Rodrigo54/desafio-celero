import { PlayerService } from '@core/player.service';
import { Component, OnInit } from '@angular/core';
import { startWith, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-character',
  templateUrl: './input-character.component.html',
  styleUrls: ['./input-character.component.scss']
})
export class InputCharacterComponent implements OnInit {

  searchCtrl = new FormControl('', { updateOn: 'change' });
  filteredStates$: Observable<any>;

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.filteredStates$ = this.searchCtrl.valueChanges.pipe(
      startWith(''),
      filter(i => i  !== ''),
      filter((i: string) => i.length > 3),
      debounceTime(600),
      distinctUntilChanged(),
      switchMap(state => this.playerService.search(state))
    );
  }

  setOption(value: any) {
    console.log(value);
  }

  displayWith(item: any) {
    return item.name;
  }

}
