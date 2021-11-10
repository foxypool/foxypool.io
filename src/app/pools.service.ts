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
    },{
      coin: 'CHIA',
      name: 'Foxy-Pool CHIA (OG)',
      url: 'https://chia-og.foxypool.io',
      color: '#0D324D',
      poolIdentifier: 'chia-og',
      isPoStPool: true,
      imageName: 'chia-og',
      ticker: 'XCH',
    },{
      coin: 'FLAX',
      name: 'Foxy-Pool FLAX (OG)',
      url: 'https://flax-og.foxypool.io',
      color: '#e6ffe6',
      poolIdentifier: 'flax-og',
      isPoStPool: true,
      imageName: 'flax-og',
      ticker: 'XFX',
    },{
      coin: 'CHIVES',
      name: 'Foxy-Pool CHIVES (OG)',
      url: 'https://chives-og.foxypool.io',
      color: '#ffffff',
      poolIdentifier: 'chives-og',
      isPoStPool: true,
      imageName: 'chives-og',
      ticker: 'XCC',
    },{
      coin: 'HDDCOIN',
      name: 'Foxy-Pool HDDCOIN (OG)',
      url: 'https://hddcoin-og.foxypool.io',
      color: '#ffffff',
      poolIdentifier: 'hddcoin-og',
      isPoStPool: true,
      imageName: 'hddcoin-og',
      ticker: 'HDD',
    },{
      coin: 'STAI',
      name: 'Foxy-Pool STAI (OG)',
      url: 'https://stai-og.foxypool.io',
      color: '#363636',
      poolIdentifier: 'stai-og',
      isPoStPool: true,
      imageName: 'stai-og',
      ticker: 'STAI',
    },{
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
