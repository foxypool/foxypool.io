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
    // },{
    //   coin: 'BHD',
    //   name: 'Foxy-Pool BHD ECO',
    //   url: 'https://bhd-eco.foxypool.io',
    //   color: '#05162f',
    //   isEco: true,
    //   ecoTextColor: '#f49d11',
    //   poolIdentifier: 'bhd-eco',
    }, {
      coin: 'CHIA',
      name: 'Foxy-Pool CHIA',
      url: 'https://chia.foxypool.io',
      color: '#0D324D',
      isChiaPool: true,
    }, {
      coin: 'CHIA',
      name: 'Foxy-Pool CHIA (OG)',
      url: 'https://chia-og.foxypool.io',
      color: '#0D324D',
      poolIdentifier: 'chia-og',
      apiUrl: 'https://api.chia-og.foxypool.io',
      isChiaPool: true,
      imageName: 'chia-og',
    },{
      coin: 'BURST',
      name: 'Foxy-Pool BURST',
      url:  'https://burst.foxypool.io',
      color: '#00579D',
      poolIdentifier: 'burst',
    },{
      coin: 'HDD',
      name: 'Foxy-Pool HDD',
      url: 'https://hdd.foxypool.io',
      color: '#ffffff',
      poolIdentifier: 'hdd',
    },{
      coin: 'LHD',
      name: 'Foxy-Pool LHD',
      url: 'https://lhd.foxypool.io',
      color: '#06172f',
      poolIdentifier: 'lhd',
    },{
      coin: 'XHD',
      name: 'Foxy-Pool XHD',
      url: 'https://xhd.foxypool.io',
      color: '#333',
      poolIdentifier: 'xhd',
    },
  ];

  constructor() {}

  get pools() {
    return this._pools;
  }

  get pocPools() {
    return this._pools.filter(pool => !pool.isChiaPool);
  }

  get chiaPools() {
    return this._pools.filter(pool => pool.isChiaPool);
  }
}
