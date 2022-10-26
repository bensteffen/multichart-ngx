import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { Size } from '../entity/entities'


@Injectable({
  providedIn: 'root'
})
export class ChartStoreService {

  private size = new BehaviorSubject<Size>(new Size());
  public readonly size$ = this.size.asObservable();

  constructor() { }

  public updateSize(size: Size) {
    this.size.next(size)
  }
}
