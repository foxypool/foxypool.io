import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PoolsService {

  public readonly _pools = [
    {
      coin: 'BHD',
      name: 'Foxy-Pool BHD',
      url: 'https://bhd.foxypool.io',
      color: '#05162f',
      poolIdentifier: 'bhd',
      ticker: 'BHD',
    },{
      coin: 'CHIA',
      name: 'Foxy-Pool CHIA',
      url: 'https://chia.foxypool.io',
      color: '#0D324D',
      poolIdentifier: 'chia',
      apiUrl: 'https://api2.foxypool.io',
      isPoStPool: true,
      ticker: 'XCH',
    },{
      coin: 'CHIA',
      name: 'Foxy-Pool CHIA (OG)',
      url: 'https://chia-og.foxypool.io',
      color: '#0D324D',
      poolIdentifier: 'chia-og',
      apiUrl: 'https://api2.foxypool.io',
      isPoStPool: true,
      imageName: 'chia-og',
      ticker: 'XCH',
    },{
      coin: 'FLAX',
      name: 'Foxy-Pool FLAX (OG)',
      url: 'https://flax-og.foxypool.io',
      color: '#e6ffe6',
      poolIdentifier: 'flax-og',
      apiUrl: 'https://api2.foxypool.io',
      isPoStPool: true,
      imageName: 'flax-og',
      ticker: 'XFX',
    },{
      coin: 'SIGNA',
      name: 'Foxy-Pool SIGNA',
      url:  'https://signa.foxypool.io',
      color: '#ffffff',
      poolIdentifier: 'signa',
      ticker: 'SIGNA',
    },
  ];

  constructor() {}

  get pools() {
    return this._pools;
  }

  get pocPools() {
    return this._pools.filter(pool => !pool.isPoStPool);
  }

  get postPools() {
    return this._pools.filter(pool => pool.isPoStPool);
  }
}
