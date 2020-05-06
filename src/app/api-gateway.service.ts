import { Injectable } from '@angular/core';
import {WebsocketService} from "./websocket.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiGatewayService {

  private url = 'https://api.foxypool.cf';
  private websocketService: WebsocketService;
  private statsByHostname = {};

  public hostnames = [];

  constructor() {}

  init() {
    this.hostnames.forEach(hostname => {
      this.statsByHostname[hostname] = {
        poolConfig: new BehaviorSubject<any>({}),
        poolStats: new BehaviorSubject<any>({}),
        roundStats: new BehaviorSubject<any>({}),
      };
    });

    this.websocketService = new WebsocketService(`${this.url}/web-ui`);
    this.websocketService.subscribe('connect', this.onConnected.bind(this));
    this.websocketService.subscribe('stats/pool', this.onNewPoolStats.bind(this));
    this.websocketService.subscribe('stats/round', this.onNewRoundStats.bind(this));
  }

  async onConnected() {
    await this.subscribeToHostnames();
    this.hostnames.forEach(hostname => {
      this.websocketService.publish('stats/init', hostname, ([poolConfig, poolStats, roundStats]) => {
        this.onNewPoolConfig(hostname, poolConfig);
        this.onNewPoolStats(hostname, poolStats);
        this.onNewRoundStats(hostname, roundStats);
      });
    });
  }

  subscribeToHostnames() {
    return new Promise(resolve => this.websocketService.publish('subscribe', this.hostnames, resolve));
  }

  getPoolStatsSubject(hostname) {
    return this.statsByHostname[hostname].poolStats;
  }

  getRoundStatsSubject(hostname) {
    return this.statsByHostname[hostname].roundStats;
  }

  onNewPoolConfig(hostname, poolConfig) {
    this.statsByHostname[hostname].poolConfig.next(poolConfig);
  }

  onNewPoolStats(hostname, poolStats) {
    this.statsByHostname[hostname].poolStats.next(poolStats);
  }

  onNewRoundStats(hostname, roundStats) {
    this.statsByHostname[hostname].roundStats.next(roundStats);
  }
}
