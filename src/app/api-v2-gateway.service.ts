import { Injectable } from '@angular/core';
import {WebsocketService} from "./websocket.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiV2GatewayService {

  private url = 'https://api.foxypool.io';
  private websocketService: WebsocketService;
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

    this.websocketService = new WebsocketService(`${this.url}/web-ui`);
    this.websocketService.subscribe('connect', this.onConnected.bind(this));
    this.websocketService.subscribe('stats:overview:pool', this.onNewPoolStats.bind(this));
    this.websocketService.subscribe('stats:overview:round', this.onNewRoundStats.bind(this));
  }

  async onConnected() {
    await this.subscribeToPools();
    this.poolIdentifier.forEach(poolIdentifier => {
      this.websocketService.publish('stats:overview:init', poolIdentifier, ({poolConfig, poolOverviewStats, roundOverviewStats}) => {
        this.onNewPoolConfig(poolIdentifier, poolConfig);
        this.onNewPoolStats(poolIdentifier, poolOverviewStats);
        this.onNewRoundStats(poolIdentifier, roundOverviewStats);
      });
    });
  }

  subscribeToPools() {
    return new Promise(resolve => this.websocketService.publish('subscribe:overview', this.poolIdentifier, resolve));
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
