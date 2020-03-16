import { Component, OnInit } from '@angular/core';
import {PoolsService} from "../pools.service";
import {StatsService} from "../stats.service";
import * as Capacity from '../../shared/capacity.es5';
import * as moment from "moment";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private poolsService: PoolsService) {}

  async ngOnInit() {
    this.pools.forEach((pool:any) => pool.statsService = new StatsService(pool.url));
  }

  get pools() {
    return this.poolsService.pools;
  }

  getMinersOfPool(pool) {
    if (!pool.statsService) {
      return 0;
    }

    return pool.statsService.poolStatsSubject.getValue().minerCount;
  }

  getMachinesOfPool(pool) {
    if (!pool.statsService) {
      return 0;
    }

    const miners = pool.statsService.poolStatsSubject.getValue().miners || [];

    return miners.reduce((acc, miner) => {
      return acc + miner.machines.length;
    }, 0);
  }

  getCapacityOfPool(pool) {
    if (!pool.statsService) {
      return 0;
    }

    return this.getFormattedCapacityFromGiB(pool.statsService.poolStatsSubject.getValue().totalCapacity || 0);
  }

  getECOfPool(pool) {
    if (!pool.statsService) {
      return 0;
    }

    return this.getFormattedCapacityFromTiB(pool.statsService.poolStatsSubject.getValue().ec || 0);
  }

  getRateOfPool(pool) {
    if (!pool.statsService) {
      return 0;
    }

    return (pool.statsService.poolStatsSubject.getValue().rate || 0);
  }

  getDailyRewardOfPool(pool) {
    if (!pool.statsService) {
      return 0;
    }

    return (pool.statsService.poolStatsSubject.getValue().dailyRewardPerPiB || 0);
  }

  getWonRoundsPerDayOfPool(pool) {
    if (!pool.statsService) {
      return 0;
    }

    const roundsWon = pool.statsService.poolStatsSubject.getValue().roundsWon || [];

    return roundsWon.filter(round => moment(round.roundStart).isAfter(moment().subtract(1, 'day'))).length;
  }

  getNetDiffOfPool(pool) {
    if (!pool.statsService) {
      return 0;
    }

    const round = pool.statsService.roundStatsSubject.getValue().round;
    if (!round) {
      return 0;
    }
    const netDiff = this.getBlockZeroBaseTarget(pool.coin) / round.baseTarget;

    return this.getFormattedCapacityFromTiB(netDiff);
  }

  getBlockZeroBaseTarget(coin) {
    switch (coin) {
      case 'BHD':
        return 24433591728;
      case 'LHD':
      case 'HDD':
      case 'XHD':
      case 'AETH':
        return 14660155037;
      default:
        return 18325193796;
    }
  }

  getFormattedCapacityFromGiB(capacityInGiB) {
    return (new Capacity(capacityInGiB)).toString();
  }

  getFormattedCapacityFromTiB(capacityInTiB) {
    return Capacity.fromTiB(capacityInTiB).toString();
  }
}
