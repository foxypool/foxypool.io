import {Component, OnInit} from '@angular/core';
import {PoolsService} from "../pools.service";
import * as Capacity from '../../shared/capacity.es5';
import * as moment from "moment";
import * as coinUtil from '../../shared/coin-util.es5';
import {ApiV2GatewayService} from "../api-v2-gateway.service";
import {ChiaGateway} from '../chia-gateway';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private apiV2GatewayService = new ApiV2GatewayService();
  private chiaGatewaysByPoolIdentifier = {};

  constructor(private poolsService: PoolsService) {}

  async ngOnInit() {
    this.apiV2GatewayService.poolIdentifier = this.poolsService.pocPools
      .map((pool: any) => pool.poolIdentifier)
      .filter(identifier => !!identifier);
    this.apiV2GatewayService.init();
    await Promise.all(
      this.poolsService.chiaPools
        .filter(pool => pool.apiUrl && pool.poolIdentifier)
        .map(async pool => {
          this.chiaGatewaysByPoolIdentifier[pool.poolIdentifier] = new ChiaGateway(pool.apiUrl, [pool.poolIdentifier]);

          await this.chiaGatewaysByPoolIdentifier[pool.poolIdentifier].init();
        })
    );
  }

  get pools() {
    return this.poolsService.pools;
  }

  getPoolStats(pool: any) {
    const gateway = pool.isChiaPool ? this.getChiaGateway(pool) : this.apiV2GatewayService;
    if (!gateway) {
      return null;
    }
    const statsSubject = gateway.getPoolStatsSubject(pool.poolIdentifier);
    if (!statsSubject) {
      return null;
    }

    return statsSubject.getValue();
  }

  getRoundStats(pool: any) {
    if (pool.isChiaPool) {
      return null;
    }
    const statsSubject = this.apiV2GatewayService.getRoundStatsSubject(pool.poolIdentifier);
    if (!statsSubject) {
      return null;
    }

    return statsSubject.getValue();
  }

  getAccountStats(pool: any) {
    if (!pool.isChiaPool) {
      return null;
    }
    const gateway = this.getChiaGateway(pool);
    if (!gateway) {
      return null;
    }
    const statsSubject = gateway.getAccountStatsSubject(pool.poolIdentifier);
    if (!statsSubject) {
      return null;
    }

    return statsSubject.getValue();
  }

  getExchangeStats(pool: any) {
    if (!pool.isChiaPool) {
      return null;
    }
    const gateway = this.getChiaGateway(pool);
    if (!gateway) {
      return null;
    }
    const statsSubject = gateway.getExchangeStatsSubject(pool.poolIdentifier);
    if (!statsSubject) {
      return null;
    }

    return statsSubject.getValue();
  }

  getRewardStats(pool: any) {
    if (!pool.isChiaPool) {
      return null;
    }
    const gateway = this.getChiaGateway(pool);
    if (!gateway) {
      return null;
    }
    const statsSubject = gateway.getRewardStatsSubject(pool.poolIdentifier);
    if (!statsSubject) {
      return null;
    }

    return statsSubject.getValue();
  }

  getChiaGateway(pool: any) {
    return this.chiaGatewaysByPoolIdentifier[pool.poolIdentifier];
  }

  getMinersOfPool(pool) {
    const stats = pool.isChiaPool ? this.getAccountStats(pool) : this.getPoolStats(pool);
    if (!stats) {
      return 0;
    }

    if (pool.isChiaPool) {
      return stats.accountsWithShares || 0;
    }

    return stats.accountCount || stats.minerCount || 0;
  }

  getMachinesOfPool(pool) {
    if (pool.isChiaPool) {
      return 'N/A';
    }
    const poolStatsSubject = this.apiV2GatewayService.getPoolStatsSubject(pool.poolIdentifier);
    if (!poolStatsSubject) {
      return 0;
    }

    const miners = poolStatsSubject.getValue().accounts || poolStatsSubject.getValue().miners || [];

    return miners.reduce((acc, miner) => {
      if (miner.machines) {
        return acc + miner.machines.length;
      }

      return acc + miner.miner.length;
    }, 0);
  }

  getCapacityOfPool(pool) {
    const stats = pool.isChiaPool ? this.getAccountStats(pool) : this.getPoolStats(pool);
    if (!stats) {
      return 0;
    }
    if (pool.isChiaPool) {
      return this.getFormattedCapacityFromGiB(stats.ecSum || 0);
    }

    return this.getFormattedCapacityFromGiB(stats.totalCapacity || 0);
  }

  getRateOfPool(pool) {
    const stats = pool.isChiaPool ? this.getExchangeStats(pool) : this.getPoolStats(pool);
    if (!stats) {
      return 0;
    }
    if (pool.isChiaPool) {
      return (stats.rates && stats.rates.usd) || 0;
    }

    return (stats.rate || 0);
  }

  getDailyRewardOfPool(pool) {
    const stats = pool.isChiaPool ? this.getRewardStats(pool) : this.getPoolStats(pool);
    if (!stats) {
      return 0;
    }

    return (stats.dailyRewardPerPiB || 0);
  }

  getWonRoundsPerDayOfPool(pool) {
    const stats = pool.isChiaPool ? this.getRewardStats(pool) : this.getPoolStats(pool);
    if (!stats) {
      return 0;
    }

    if (pool.isChiaPool) {
      return (stats.blocksWonLastDay || []).length;
    }

    const roundsWon = stats.roundsWon || [];

    return roundsWon.filter(round => {
      if (round.roundStart) {
        return moment(round.roundStart).isAfter(moment().subtract(1, 'day'));
      }

      return moment(round.createdAt).isAfter(moment().subtract(1, 'day'));
    }).length;
  }

  getNetDiffOfPool(pool) {
    const stats = pool.isChiaPool ? this.getPoolStats(pool) : this.getRoundStats(pool);
    if (!stats) {
      return 0;
    }

    if (pool.isChiaPool) {
      return this.getFormattedCapacityFromTiB(stats.networkSpaceInTiB);
    }

    const round = stats.round;
    if (!round) {
      return 0;
    }
    let netDiff = coinUtil.blockZeroBaseTarget(pool.coin) / round.baseTarget;
    netDiff = coinUtil.modifyNetDiff(netDiff, pool.coin);

    return this.getFormattedCapacityFromTiB(netDiff);
  }

  getFormattedCapacityFromGiB(capacityInGiB) {
    return (new Capacity(capacityInGiB)).toString();
  }

  getFormattedCapacityFromTiB(capacityInTiB) {
    return Capacity.fromTiB(capacityInTiB).toString();
  }

  getPoolImageName(pool: any) {
    if (pool.imageName) {
      return pool.imageName;
    }

    return pool.coin.toLowerCase();
  }
}
