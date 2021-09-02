import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ApiV2GatewayService {
  private apiService: ApiService = new ApiService();
  private statsByPoolIdentifier = {};

  public poolIdentifier = [];

  constructor() {}

  init() {
    this.poolIdentifier.forEach(poolIdentifier => {
      this.statsByPoolIdentifier[poolIdentifier] = {
        poolConfig: new BehaviorSubject<any>({}),
        poolStats: new BehaviorSubject<any>({}),
        roundStats: new BehaviorSubject<any>({}),
      };
    });

    this.poolIdentifier.forEach(poolIdentifier => {
      this.initForPoolIdentifier(poolIdentifier);
      setInterval(this.updatePoolConfig.bind(this, poolIdentifier), 60 * 60 * 1000);
      setInterval(this.updatePoolStats.bind(this, poolIdentifier), 31 * 1000);
      setInterval(this.updateRoundStats.bind(this, poolIdentifier), 31 * 1000);
    });
  }

  async initForPoolIdentifier(poolIdentifier) {
    await Promise.all([
      this.updatePoolConfig(poolIdentifier),
      this.updatePoolStats(poolIdentifier),
      this.updateRoundStats(poolIdentifier),
    ]);
  }

  async updatePoolConfig(poolIdentifier) {
    this.onNewPoolConfig(poolIdentifier, await this.apiService.getPoolConfig({ poolIdentifier }));
  }

  async updatePoolStats(poolIdentifier) {
    this.onNewPoolStats(poolIdentifier, await this.apiService.getOverviewPoolStats({ poolIdentifier }));
  }

  async updateRoundStats(poolIdentifier) {
    this.onNewRoundStats(poolIdentifier, await this.apiService.getOverviewRoundStats({ poolIdentifier }));
  }

  getPoolStatsSubject(poolIdentifier) {
    return this.statsByPoolIdentifier[poolIdentifier].poolStats;
  }

  getRoundStatsSubject(poolIdentifier) {
    return this.statsByPoolIdentifier[poolIdentifier].roundStats;
  }

  onNewPoolConfig(poolIdentifier, poolConfig) {
    this.statsByPoolIdentifier[poolIdentifier].poolConfig.next(poolConfig);
  }

  onNewPoolStats(poolIdentifier, poolStats) {
    this.statsByPoolIdentifier[poolIdentifier].poolStats.next(poolStats);
  }

  onNewRoundStats(poolIdentifier, roundStats) {
    this.statsByPoolIdentifier[poolIdentifier].roundStats.next(roundStats);
  }
}
