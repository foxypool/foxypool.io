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
    // },{
    //   coin: 'BHD',
    //   name: 'Foxy-Pool BHD ECO',
    //   url: 'https://bhd-eco.foxypool.io',
    //   color: '#05162f',
    //   isEco: true,
    //   ecoTextColor: '#f49d11',
    },{
      coin: 'BURST',
      name: 'Foxy-Pool BURST',
      url:  'https://burst.foxypool.io',
      color: '#00579D',
    },{
      coin: 'DISC',
      name: 'Foxy-Pool DISC',
      url: 'https://disc.foxypool.io',
      color: '#209d3b',
    },{
      coin: 'HDD',
      name: 'Foxy-Pool HDD',
      url: 'https://hdd.foxypool.io',
      color: '#ffffff',
    },{
      coin: 'LHD',
      name: 'Foxy-Pool LHD',
      url: 'https://lhd.foxypool.io',
      color: '#06172f',
    },{
      coin: 'XHD',
      name: 'Foxy-Pool XHD',
      url: 'https://xhd.foxypool.io',
      color: '#333',
    },
  ];

  constructor() {}

  get pools() {
    return this._pools;
  }
}
