import { CoreModule } from '@core/core.module';
import { CellComponent } from './cell/cell.component';
import { PlayersHeaderComponent } from './players-header/players-header.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComponent } from './grid.component';
import { SharedModule } from '@shared/shared.module';

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridComponent, PlayersHeaderComponent, CellComponent ],
      imports: [SharedModule, CoreModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
