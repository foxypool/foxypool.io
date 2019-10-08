import {WebsocketService} from './websocket.service';
import {BehaviorSubject} from 'rxjs';

export class StatsService {

  private websocketService: WebsocketService;
  private poolConfig = new BehaviorSubject<any>({});
  private poolStats = new BehaviorSubject<any>({});
  private roundStats = new BehaviorSubject<any>({});

  constructor(
    private url: string,
  ) {
    this.websocketService = new WebsocketService(`${this.url}/web-ui`);
    this.websocketService.subscribe('connect', this.onConnected.bind(this));
    this.websocketService.subscribe('stats/pool', this.onNewPoolStats.bind(this));
    this.websocketService.subscribe('stats/current-round', this.onNewRoundStats.bind(this));
  }

  init() {
    this.websocketService.publish('stats/init', ([poolConfig, poolStats, roundStats]) => {
      this.onNewPoolConfig(poolConfig);
      this.onNewPoolStats(poolStats);
      this.onNewRoundStats(roundStats);
    });
  }

  onConnected() {
    this.init();
  }

  get poolConfigSubject() {
    return this.poolConfig;
  }

  get poolStatsSubject() {
    return this.poolStats;
  }

  get roundStatsSubject() {
    return this.roundStats;
  }

  onNewPoolConfig(poolConfig) {
    this.poolConfig.next(poolConfig);
  }

  onNewPoolStats(poolStats) {
    this.poolStats.next(poolStats);
  }

  onNewRoundStats(roundStats) {
    this.roundStats.next(roundStats);
  }
}
