import { Component, Input } from '@angular/core';
import { View } from '../view'
import { ScaleStoreService } from '../../services/scale-store.service';


class Rect {
  x = 0
  y = 0
  width = 0
  height = 0
}


@Component({
  selector: '[multichart-bar]',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent extends View {

  public bars: Rect[] = []

  private _barWidthRatio = 0.618
  @Input() set barWidthRatio(value: number) {
    this._barWidthRatio = value
    this.update()
  }

  private _minBarWidth = 20
  @Input() set minBarWidth(value: number) {
    this._minBarWidth = value
    this.update()
  }

  constructor(protected override scaleStore: ScaleStoreService) {
    super(scaleStore)
  }

  protected update() {
    const barNumber = this._data.length
    const barWidthRatio = this._barWidthRatio
    const minBarWidth = this._minBarWidth || 2;
    const barSlotSize = this.domain.size.width/barNumber;
    const barWidth = Math.max(barWidthRatio*barSlotSize, minBarWidth);

    const getOffset = (y: number) => {
      if (y >= 0) {
        return this.domain.scales.y(y);
      } else {
        return this.domain.scales.y(0);
      }
    };
    const getHeight = (y: number) => {
      if (y >= 0) {
        return this.domain.scales.y(0) - this.domain.scales.y(y);
      } else {
        return this.domain.scales.y(y) - this.domain.scales.y(0);
      }
    }
    const getX = (x: number) => this.domain.scales.x(x) - 0.5*barWidth

    this.bars = this._data.map(d => ({
      x: getX(d.x),
      y: getOffset(d.y),
      width: barWidth,
      height: Math.max(0, getHeight(d.y))
    }))
  }
}
