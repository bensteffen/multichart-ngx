import { Component, OnInit, Input } from '@angular/core';
import { Size, Margins } from '../entity/entities'
import { interval } from '../entity/types'
import { ChartStoreService } from '../services/chart-store.service';
import { ScaleStoreService } from '../services/scale-store.service';


@Component({
  selector: '[multichart-domain]',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css'],
  providers: [ScaleStoreService]
})
export class DomainComponent implements OnInit {

  private _xLimits: interval | null = null
  @Input() set xLimits(limits: interval) {
    this._xLimits = limits
    this.scaleStore.updateDomain({ xDomain: limits })
  }

  private _yLimits: interval | null = null
  @Input() set yLimits(limits: interval) {
    this._yLimits = limits
    this.scaleStore.updateDomain({ yDomain: limits })
  }

  public transform = ""
  private _margins: Margins = new Margins()
  @Input() set margins(m: Margins) {
    this._margins = m
    this.transform = `translate(${m.left},${m.top})`
    this.updateSize()
  }

  private _chartSize: Size = new Size()
  set chartSize(size: Size) {
    this._chartSize = size
    this.updateSize()
  }

  constructor(
    private chartStore: ChartStoreService,
    private scaleStore: ScaleStoreService
  ) { }

  ngOnInit(): void {
    this.chartStore.size$.subscribe((size: Size) => this.chartSize = size)
    this.scaleStore.extents$.subscribe(extents =>
      this.scaleStore.updateDomain({
        xDomain: this._xLimits || extents.x,
        yDomain: this._yLimits || extents.y
      })
    )
  }

  private updateSize() {
    const width = this._chartSize.width - this._margins.left - this._margins.right
    const height = this._chartSize.height - this._margins.top - this._margins.bottom
    this.scaleStore.updateDomain({
      xRange: [0, width],
      yRange: [height, 0],
      width, height
    })
  }

}
