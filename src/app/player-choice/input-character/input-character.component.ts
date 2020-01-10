import { PlayerService } from '@core/player.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  imgsrc: string;
  @Input() label = 'Escolha seu Personagem da Marvel';
  @Input() title = 'Player 1';

  @Output() selected = new EventEmitter();

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
    this.imgsrc = `${value.thumbnail.path}.${value.thumbnail.extension}`;
    this.selected.emit(value);
  }

  displayWith(item: any) {
    return item.name;
  }

}
