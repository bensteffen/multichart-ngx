import { Component } from '@angular/core';
import { View } from '../view'
import { ScaleStoreService } from '../../services/scale-store.service';
import { line } from 'd3'


@Component({
  selector: '[multichart-area]',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent extends View {
  public path = ""

  private pathFatory = line()
    .x(d => this.domain.scales.x(d[0]))
    .y(d => this.domain.scales.y(d[1]))

  constructor(protected override scaleStore: ScaleStoreService) {
    super(scaleStore)
  }

  protected update() {
    const first = this._data[0]
    const last = this._data[this._data.length - 1]
    let d = this.pathFatory(this._data.map(d => [d.x, d.y]))
    if (!d) {
      return
    }
    var base = this.domain.scales.yDomain[0]
    d = d.replace(
      /^M/, `M${this.domain.scales.x(first.x)},${this.domain.scales.y(base)}L`
    )
    d += `L${this.domain.scales.x(last.x)},${this.domain.scales.y(base)}Z`;
    this.path = d
  }
}
