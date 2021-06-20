import {WebsocketService} from "./websocket.service";
import {BehaviorSubject} from "rxjs";

export class ChiaGateway {
  private websocketService: WebsocketService;
  private statsByPoolIdentifier = {};

  constructor(private url: string, private poolIdentifier: string[]) {}

  init() {
    this.poolIdentifier.forEach(poolIdentifier => {
      this.statsByPoolIdentifier[poolIdentifier] = {
        poolConfig: new BehaviorSubject<any>({}),
        poolStats: new BehaviorSubject<any>({}),
        accountStats: new BehaviorSubject<any>({}),
        rewardStats: new BehaviorSubject<any>({}),
        exchangeStats: new BehaviorSubject<any>({}),
      };
    });

    this.websocketService = new WebsocketService(`${this.url}/stats`);
    this.websocketService.subscribe('connect', this.onConnected.bind(this));
    this.websocketService.subscribe('pool-stats-updated', this.onNewPoolStats.bind(this));
    this.websocketService.subscribe('account-stats-updated', this.onNewAccountStats.bind(this));
    this.websocketService.subscribe('exchange-stats-updated', this.onNewExchangeStats.bind(this));
    this.websocketService.subscribe('reward-stats-updated', this.onNewRewardStats.bind(this));

  }

  async onConnected() {
    await this.subscribeToPools();
    this.poolIdentifier.forEach(poolIdentifier => {
      this.websocketService.publish('init', poolIdentifier, ({
        poolConfig,
        poolStats,
        exchangeStats,
        accountStats,
        rewardStats,
      }) => {
        this.onNewPoolConfig(poolIdentifier, poolConfig);
        this.onNewPoolStats(poolIdentifier, poolStats);
        this.onNewAccountStats(poolIdentifier, accountStats);
        this.onNewRewardStats(poolIdentifier, rewardStats);
        this.onNewExchangeStats(poolIdentifier, exchangeStats);
      });
    });
  }

  subscribeToPools() {
    return new Promise(resolve => this.websocketService.publish('subscribe', this.poolIdentifier, resolve));
  }

  getPoolStatsSubject(poolIdentifier) {
    return this.statsByPoolIdentifier[poolIdentifier].poolStats;
  }

  getAccountStatsSubject(poolIdentifier) {
    return this.statsByPoolIdentifier[poolIdentifier].accountStats;
  }

  getRewardStatsSubject(poolIdentifier) {
    return this.statsByPoolIdentifier[poolIdentifier].rewardStats;
  }

  getExchangeStatsSubject(poolIdentifier) {
    return this.statsByPoolIdentifier[poolIdentifier].exchangeStats;
  }

  onNewPoolConfig(poolIdentifier, poolConfig) {
    this.statsByPoolIdentifier[poolIdentifier].poolConfig.next(poolConfig);
  }

  onNewPoolStats(poolIdentifier, poolStats) {
    this.statsByPoolIdentifier[poolIdentifier].poolStats.next(poolStats);
  }

  onNewAccountStats(poolIdentifier, accountStats) {
    this.statsByPoolIdentifier[poolIdentifier].accountStats.next(accountStats);
  }

  onNewExchangeStats(poolIdentifier, exchangeStats) {
    this.statsByPoolIdentifier[poolIdentifier].exchangeStats.next(exchangeStats);
  }

  onNewRewardStats(poolIdentifier, rewardStats) {
    this.statsByPoolIdentifier[poolIdentifier].rewardStats.next(rewardStats);
  }
}
