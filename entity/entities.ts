import { scaleLinear, interpolateRound, interpolateNumber } from 'd3'
import { interval } from './types'


export class Size {
  width = 0
  height = 0
}


export class Scales {
  // x = scaleLinear().interpolate(interpolateRound)
  // y = scaleLinear().interpolate(interpolateRound)
  public readonly x = scaleLinear()
  public readonly y = scaleLinear()

  xDomain: interval = [Infinity, -Infinity]
  yDomain: interval = [Infinity, -Infinity]

  public setXDomain(domain: interval) {
    this.xDomain = domain
    this.x.domain(domain)
  }

  public setYDomain(domain: interval) {
    this.yDomain = domain
    this.y.domain(domain)
  }
}


export class Extents {
  constructor(
    x: interval = [Infinity, -Infinity],
    y: interval = [Infinity, -Infinity],
  ) {
    this.x = x
    this.y = y
  }

  public x: interval
  public y: interval

  public max(extents: Extents): Extents {
    return new Extents(
      this.maxInterval(this.x, extents.x),
      this.maxInterval(this.y, extents.y),
    )
  }

  public maxInterval(int1: interval, int2: interval): interval {
    return [Math.min(int1[0], int2[0]), Math.max(int1[1], int2[1])]
  }
}


export class Margins {
  left = 0
  right = 0
  top = 0
  bottom = 0
}


export class ViewDataItem {
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  x: number
  y: number
}


export class Domain {
  constructor(scales=new Scales(), size=new Size()) {
    this.scales = scales
    this.size = size
  }

  scales = new Scales()
  extents = new Extents()
  size = new Size()

  public update(p: DomainPatch): Domain {
    const domain = new Domain(this.scales, this.size)
    if (p.xRange) {
      domain.scales.x.range(p.xRange)
    }
    if (p.yRange) {
      domain.scales.y.range(p.yRange)
    }
    if (p.xDomain) {
      domain.scales.setXDomain(p.xDomain)
    }
    if (p.yDomain) {
      domain.scales.setYDomain(p.yDomain)
    }
    if (p.width !== undefined) {
      domain.size.width = p.width
    }
    if (p.height !== undefined) {
      domain.size.height = p.height
    }
    return domain
  }
}

export class DomainPatch {
  xRange?: interval
  yRange?: interval
  xDomain?: interval
  yDomain?: interval
  width?: number
  height?: number
}
