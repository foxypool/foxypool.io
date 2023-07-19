import {Component, OnInit} from '@angular/core'
import * as moment from 'moment'
import {PoolsService} from '../pools.service'
import {PostApiGateway} from '../post-api-gateway'
import Capacity from '../capacity'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private readonly postApiGateway = new PostApiGateway()

  constructor(private readonly poolsService: PoolsService) {}

  async ngOnInit() {
    this.postApiGateway.poolIdentifier = this.poolsService.postPools
      .map((pool: any) => pool.poolIdentifier)
      .filter(identifier => !!identifier)
    await Promise.all([
      this.postApiGateway.init(),
    ])
  }

  get showTable() {
    return window.innerWidth >= 945
  }

  get postPools() {
    return this.poolsService.postPools
  }

  isRewardStatsLoadingForPostPool(pool) {
    const rewardStats = this.postApiGateway.getRewardStatsValue(pool.poolIdentifier)

    return !rewardStats || rewardStats.dailyRewardPerPiB === undefined
  }

  isExchangeStatsLoadingForPostPool(pool) {
    const exchangeStats = this.postApiGateway.getExchangeStatsValue(pool.poolIdentifier)

    return !exchangeStats || exchangeStats.rates === undefined
  }

  isAccountStatsLoadingForPostPool(pool) {
    const accountStats = this.postApiGateway.getAccountStatsValue(pool.poolIdentifier)

    return !accountStats || accountStats.ecSum === undefined
  }

  isPoolStatsLoadingForPostPool(pool) {
    const poolStats = this.postApiGateway.getPoolStatsValue(pool.poolIdentifier)

    return !poolStats || poolStats.networkSpaceInTiB === undefined
  }

  getDailyRewardOfPostPool(pool) {
    const rewardStats = this.postApiGateway.getRewardStatsValue(pool.poolIdentifier)
    if (!rewardStats) {
      return 0
    }

    return (rewardStats.dailyRewardPerPiB || 0)
  }

  getRateOfPostPool(pool) {
    const exchangeStats = this.postApiGateway.getExchangeStatsValue(pool.poolIdentifier)
    if (!exchangeStats) {
      return 0
    }

    return (exchangeStats.rates && exchangeStats.rates.usd) || 0
  }

  getWonRoundsPerDayOfPostPool(pool) {
    const rewardStats = this.postApiGateway.getRewardStatsValue(pool.poolIdentifier)
    if (!rewardStats) {
      return 0
    }

    return (rewardStats.recentlyWonBlocks || [])
      .filter(wonBlock => moment(wonBlock.createdAt).isAfter(moment().subtract(1, 'day')))
      .length
  }

  getCapacityOfPostPool(pool) {
    const accountStats = this.postApiGateway.getAccountStatsValue(pool.poolIdentifier)
    if (!accountStats) {
      return 0
    }

    return this.getFormattedCapacityFromGiB(accountStats.ecSum || 0)
  }

  getAccountsOfPostPool(pool) {
    const accountStats = this.postApiGateway.getAccountStatsValue(pool.poolIdentifier)
    if (!accountStats) {
      return 0
    }

    return accountStats.accountsWithShares || 0
  }

  getNetDiffOfPostPool(pool) {
    const poolStats = this.postApiGateway.getPoolStatsValue(pool.poolIdentifier)
    if (!poolStats) {
      return 0
    }

    return this.getFormattedCapacityFromTiB(poolStats.networkSpaceInTiB)
  }

  getFormattedCapacityFromGiB(capacityInGiB) {
    return (new Capacity(capacityInGiB)).toString()
  }

  getFormattedCapacityFromTiB(capacityInTiB) {
    return Capacity.fromTiB(capacityInTiB).toString()
  }

  getPoolImageName(pool: any) {
    if (pool.imageName) {
      return pool.imageName
    }

    return pool.coin.toLowerCase()
  }
}
