import {BehaviorSubject} from 'rxjs'
import {ApiService} from './api.service'

export class PocApiGateway {
  private readonly apiService: ApiService = new ApiService()
  private statsByPoolIdentifier = {}

  public poolIdentifier = []

  async init() {
    this.poolIdentifier.forEach(poolIdentifier => {
      this.statsByPoolIdentifier[poolIdentifier] = {
        poolStats: new BehaviorSubject<any>({}),
        roundStats: new BehaviorSubject<any>({}),
      }
    })

    await Promise.all(this.poolIdentifier.map(async poolIdentifier => {
      await this.initForPoolIdentifier(poolIdentifier)
      setInterval(this.updatePoolStats.bind(this, poolIdentifier), 31 * 1000)
      setInterval(this.updateRoundStats.bind(this, poolIdentifier), 31 * 1000)
    }))
  }

  async initForPoolIdentifier(poolIdentifier) {
    await Promise.all([
      this.updatePoolStats(poolIdentifier),
      this.updateRoundStats(poolIdentifier),
    ])
  }

  async updatePoolStats(poolIdentifier) {
    this.onNewPoolStats(poolIdentifier, await this.apiService.getOverviewPoolStats({ poolIdentifier }))
  }

  async updateRoundStats(poolIdentifier) {
    this.onNewRoundStats(poolIdentifier, await this.apiService.getOverviewRoundStats({ poolIdentifier }))
  }

  getPoolStatsValue(poolIdentifier) {
    const subject = this.getPoolStatsSubject(poolIdentifier)
    if (!subject) {
      return null
    }

    return subject.getValue()
  }

  getRoundStatsValue(poolIdentifier) {
    const subject = this.getRoundStatsSubject(poolIdentifier)
    if (!subject) {
      return null
    }

    return subject.getValue()
  }

  getPoolStatsSubject(poolIdentifier) {
    return this.statsByPoolIdentifier[poolIdentifier].poolStats
  }

  getRoundStatsSubject(poolIdentifier) {
    return this.statsByPoolIdentifier[poolIdentifier].roundStats
  }

  onNewPoolStats(poolIdentifier, poolStats) {
    this.statsByPoolIdentifier[poolIdentifier].poolStats.next(poolStats)
  }

  onNewRoundStats(poolIdentifier, roundStats) {
    this.statsByPoolIdentifier[poolIdentifier].roundStats.next(roundStats)
  }
}
