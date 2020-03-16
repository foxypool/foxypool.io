import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PoolsService {

  public readonly _pools = [
    {
      coin: 'AETH',
      name: 'Foxy-Pool AETH',
      url: 'https://aeth.foxypool.cf',
      color: '#ecf0f1',
    },{
      coin: 'BHD',
      name: 'Foxy-Pool BHD',
      url: 'https://bhd.foxypool.cf',
      color: '#05162f',
    },{
      coin: 'BTB',
      name: 'Foxy-Pool BTB',
      url: 'https://btb.foxypool.cf',
      color: '#ffffff',
    },{
      coin: 'BURST',
      name: 'Foxy-Pool BURST',
      url:  'https://burst.foxypool.cf',
      color: '#00579D',
    },{
      coin: 'DISC',
      name: 'Foxy-Pool DISC',
      url: 'https://disc.foxypool.cf',
      color: '#209d3b',
    },{
      coin: 'HDD',
      name: 'Foxy-Pool HDD',
      url: 'https://hdd.foxypool.cf',
      color: '#ffffff',
    },{
      coin: 'LAVA',
      name: 'Foxy-Pool LAVA',
      url: 'https://lava.foxypool.cf',
      color: '#ffffff',
    },{
      coin: 'LHD',
      name: 'Foxy-Pool LHD',
      url: 'https://lhd.foxypool.cf',
      color: '#06172f',
    },{
      coin: 'XHD',
      name: 'Foxy-Pool XHD',
      url: 'https://xhd.foxypool.cf',
      color: '#333',
    },
  ];

  constructor() {}

  get pools() {
    return this._pools;
  }
}
