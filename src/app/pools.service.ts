import { Injectable } from '@angular/core';

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
    }, {
      coin: 'CHIA',
      name: 'Foxy-Pool CHIA (OG)',
      url: 'https://chia-og.foxypool.io',
      color: '#0D324D',
      poolIdentifier: 'chia-og',
      isPoStPool: true,
      imageName: 'chia-og',
      ticker: 'XCH',
    }, {
      coin: 'CHIVES',
      name: 'Foxy-Pool CHIVES',
      url: 'https://chives.foxypool.io',
      color: '#ffffff',
      poolIdentifier: 'chives',
      isPoStPool: true,
      imageName: 'chives',
      ticker: 'XCC',
    }, {
      coin: 'CHIVES',
      name: 'Foxy-Pool CHIVES (OG)',
      url: 'https://chives-og.foxypool.io',
      color: '#ffffff',
      poolIdentifier: 'chives-og',
      isPoStPool: true,
      imageName: 'chives-og',
      ticker: 'XCC',
    }, {
      coin: 'BHD',
      name: 'Foxy-Pool BHD',
      url: 'https://bhd.foxypool.io',
      color: '#05162f',
      poolIdentifier: 'bhd',
      ticker: 'BHD',
    }, {
      coin: 'SIGNA',
      name: 'Foxy-Pool SIGNA',
      url:  'https://signa.foxypool.io',
      color: '#ffffff',
      poolIdentifier: 'signa',
      ticker: 'SIGNA',
    },
  ];

  get pocPools() {
    return this.pools.filter(pool => !pool.isPoStPool);
  }

  get postPools() {
    return this.pools.filter(pool => pool.isPoStPool);
  }
}
