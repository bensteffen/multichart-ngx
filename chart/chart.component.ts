import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ChartStoreService } from '../services/chart-store.service';
import { Size } from '../entity/entities'


@Component({
  selector: 'multichart-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  providers: [ChartStoreService]
})
export class ChartComponent implements AfterViewInit, OnDestroy {

  @ViewChild('container') chartContainer!: ElementRef

  private resizeObserver: ResizeObserver

  constructor(
    private zone: NgZone,
    private store: ChartStoreService
  ) {
    this.resizeObserver = new ResizeObserver(entries => {
      this.zone.run(() => {
        const svgRect = this.chartContainer.nativeElement
          .querySelector("svg")
          .getBoundingClientRect()
        const size: Size = {
          width: svgRect.width,
          height: svgRect.height
        }

        this.store.updateSize(size)
      })
    })
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.chartContainer.nativeElement)
  }

  ngOnDestroy(): void {
    this.resizeObserver.unobserve(this.chartContainer.nativeElement)
  }

}
