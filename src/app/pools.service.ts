import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class PoolsService {

  private readonly pools = [
    {
      coin: 'CHIA',
      name: 'Foxy-Pool CHIA',
      url: 'https://chia.foxypool.io',
      color: '#0D324D',
      poolIdentifier: 'chia',
      isPoStPool: true,
      ticker: 'XCH',
    },
  ]

  get postPools() {
    return this.pools.filter(pool => pool.isPoStPool)
  }
}
