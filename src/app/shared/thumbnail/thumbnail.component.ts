import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThumbnailComponent implements OnInit {

  @Input()
  public get src() {
    return this.pSrc;
  }
  public set src(value) {
    this.pSrc = value ? value : 'https://d23.com/app/uploads/2019/07/marvel-op-2-1180w-600hIris-780x440-1563899008.jpg';
  }
  private pSrc = 'https://d23.com/app/uploads/2019/07/marvel-op-2-1180w-600hIris-780x440-1563899008.jpg';

  constructor() { }

  ngOnInit() {
  }

}
