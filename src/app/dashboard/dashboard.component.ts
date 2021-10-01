import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {PoolsService} from '../pools.service';
import * as Capacity from '../../shared/capacity.es5';
import * as coinUtil from '../../shared/coin-util.es5';
import {PocApiGateway} from '../poc-api-gateway';
import {PostApiGateway} from '../post-api-gateway';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private pocApiGateway = new PocApiGateway();
  private postApiGateway = new PostApiGateway();

  constructor(private poolsService: PoolsService) {}

  async ngOnInit() {
    this.pocApiGateway.poolIdentifier = this.poolsService.pocPools
      .map((pool: any) => pool.poolIdentifier)
      .filter(identifier => !!identifier);
    this.postApiGateway.poolIdentifier = this.poolsService.postPools
      .map((pool: any) => pool.poolIdentifier)
      .filter(identifier => !!identifier);
    await Promise.all([
      this.pocApiGateway.init(),
      this.postApiGateway.init(),
    ]);
  }

  get showTable() {
    return window.innerWidth >= 945;
  }

  get showFullTable() {
    return window.innerWidth >= 1050;
  }

  get pocPools() {
    return this.poolsService.pocPools;
  }

  get postPools() {
    return this.poolsService.postPools;
  }

  isRewardStatsLoadingForPostPool(pool) {
    const rewardStats = this.postApiGateway.getRewardStatsValue(pool.poolIdentifier);

    return !rewardStats || rewardStats.dailyRewardPerPiB === undefined;
  }

  isExchangeStatsLoadingForPostPool(pool) {
    const exchangeStats = this.postApiGateway.getExchangeStatsValue(pool.poolIdentifier);

    return !exchangeStats || exchangeStats.rates === undefined;
  }

  isAccountStatsLoadingForPostPool(pool) {
    const accountStats = this.postApiGateway.getAccountStatsValue(pool.poolIdentifier);

    return !accountStats || accountStats.ecSum === undefined;
  }

  isPoolStatsLoadingForPostPool(pool) {
    const poolStats = this.postApiGateway.getPoolStatsValue(pool.poolIdentifier);

    return !poolStats || poolStats.networkSpaceInTiB === undefined;
  }

  isPoolStatsLoadingForPocPool(pool) {
    const poolStats = this.pocApiGateway.getPoolStatsValue(pool.poolIdentifier);

    return !poolStats || poolStats.dailyRewardPerPiB === undefined;
  }

  isRoundStatsLoadingForPocPool(pool) {
    const roundStats = this.pocApiGateway.getRoundStatsValue(pool.poolIdentifier);

    return !roundStats || roundStats.round === undefined;
  }

  getDailyRewardOfPostPool(pool) {
    const rewardStats = this.postApiGateway.getRewardStatsValue(pool.poolIdentifier);
    if (!rewardStats) {
      return 0;
    }

    return (rewardStats.dailyRewardPerPiB || 0);
  }

  getDailyRewardOfPocPool(pool) {
    const poolStats = this.pocApiGateway.getPoolStatsValue(pool.poolIdentifier);
    if (!poolStats) {
      return 0;
    }

    return (poolStats.dailyRewardPerPiB || 0);
  }

  getRateOfPostPool(pool) {
    const exchangeStats = this.postApiGateway.getExchangeStatsValue(pool.poolIdentifier);
    if (!exchangeStats) {
      return 0;
    }

    return (exchangeStats.rates && exchangeStats.rates.usd) || 0;
  }

  getRateOfPocPool(pool) {
    const poolStats = this.pocApiGateway.getPoolStatsValue(pool.poolIdentifier);
    if (!poolStats) {
      return 0;
    }

    return (poolStats.rate || 0);
  }

  getWonRoundsPerDayOfPostPool(pool) {
    const rewardStats = this.postApiGateway.getRewardStatsValue(pool.poolIdentifier);
    if (!rewardStats) {
      return 0;
    }

    return (rewardStats.recentlyWonBlocks || [])
      .filter(wonBlock => moment(wonBlock.createdAt).isAfter(moment().subtract(1, 'day')))
      .length;
  }

  getWonRoundsPerDayOfPocPool(pool) {
    const poolStats = this.pocApiGateway.getPoolStatsValue(pool.poolIdentifier);
    if (!poolStats) {
      return 0;
    }

    return poolStats.roundsWonPerDay || 0;
  }

  getCapacityOfPostPool(pool) {
    const accountStats = this.postApiGateway.getAccountStatsValue(pool.poolIdentifier);
    if (!accountStats) {
      return 0;
    }

    return this.getFormattedCapacityFromGiB(accountStats.ecSum || 0);
  }

  getCapacityOfPocPool(pool) {
    const poolStats = this.pocApiGateway.getPoolStatsValue(pool.poolIdentifier);
    if (!poolStats) {
      return 0;
    }

    return this.getFormattedCapacityFromGiB(poolStats.totalCapacity || 0);
  }

  getAccountsOfPostPool(pool) {
    const accountStats = this.postApiGateway.getAccountStatsValue(pool.poolIdentifier);
    if (!accountStats) {
      return 0;
    }

    return accountStats.accountsWithShares || 0;
  }

  getAccountsOfPocPool(pool) {
    const poolStats = this.pocApiGateway.getPoolStatsValue(pool.poolIdentifier);
    if (!poolStats) {
      return 0;
    }

    return poolStats.accountCount || 0;
  }

  getMachinesOfPocPool(pool) {
    const poolStats = this.pocApiGateway.getPoolStatsValue(pool.poolIdentifier);
    if (!poolStats) {
      return 0;
    }

    return poolStats.minerCount || 0;
  }

  getNetDiffOfPostPool(pool) {
    const poolStats = this.postApiGateway.getPoolStatsValue(pool.poolIdentifier);
    if (!poolStats) {
      return 0;
    }

    return this.getFormattedCapacityFromTiB(poolStats.networkSpaceInTiB);
  }

  getNetDiffOfPocPool(pool) {
    const roundStats = this.pocApiGateway.getRoundStatsValue(pool.poolIdentifier);
    if (!roundStats) {
      return 0;
    }

    const round = roundStats.round;
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
