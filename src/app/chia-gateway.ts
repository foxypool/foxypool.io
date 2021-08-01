import axios, {AxiosInstance} from 'axios';
import {BehaviorSubject} from "rxjs";

export class ChiaGateway {
  private client: AxiosInstance;
  private statsByPoolIdentifier = {};

  constructor(private url: string, private poolIdentifier: string[]) {
    this.client = axios.create({
      baseURL: `${url}/api/v2`,
    });
  }

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
    this.initStats();
    setInterval(this.updatePoolConfig.bind(this), 60 * 60 * 1000);
    setInterval(this.updatePoolStats.bind(this), 31 * 1000);
    setInterval(this.updateAccountsStats.bind(this), 61 * 1000);
    setInterval(this.updateRewardStats.bind(this), 61 * 1000);
    setInterval(this.updateExchangeStats.bind(this), 5 * 61 * 1000);
  }

  async initStats() {
    await Promise.all([
      this.updatePoolConfig(),
      this.updatePoolStats(),
      this.updateAccountsStats(),
      this.updateRewardStats(),
      this.updateExchangeStats(),
    ]);
  }

  async updatePoolConfig() {
    await Promise.all(this.poolIdentifier.map(async (poolIdentifier) => {
      this.onNewPoolConfig(poolIdentifier, await this.getPoolConfig({ poolIdentifier }));
    }));
  }

  async updatePoolStats() {
    await Promise.all(this.poolIdentifier.map(async (poolIdentifier) => {
      this.onNewPoolStats(poolIdentifier, await this.getPoolStats({ poolIdentifier }));
    }));
  }

  async updateAccountsStats() {
    await Promise.all(this.poolIdentifier.map(async (poolIdentifier) => {
      this.onNewAccountStats(poolIdentifier, await this.getAccountsStats({ poolIdentifier }));
    }));
  }

  async updateRewardStats() {
    await Promise.all(this.poolIdentifier.map(async (poolIdentifier) => {
      this.onNewRewardStats(poolIdentifier, await this.getRewardStats({ poolIdentifier }));
    }));
  }

  async updateExchangeStats() {
    await Promise.all(this.poolIdentifier.map(async (poolIdentifier) => {
      this.onNewExchangeStats(poolIdentifier, await this.getExchangeStats({ poolIdentifier }));
    }));
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

  async getPoolConfig({ poolIdentifier }) {
    const { data } = await this.client.get(`${poolIdentifier}/config`);

    return data;
  }

  async getPoolStats({ poolIdentifier }) {
    const { data } = await this.client.get(`${poolIdentifier}/pool`);

    return data;
  }

  async getAccountsStats({ poolIdentifier }) {
    const { data } = await this.client.get(`${poolIdentifier}/accounts`);

    return data;
  }

  async getRewardStats({ poolIdentifier }) {
    const { data } = await this.client.get(`${poolIdentifier}/rewards`);

    return data;
  }

  async getExchangeStats({ poolIdentifier }) {
    const { data } = await this.client.get(`${poolIdentifier}/rates`);

    return data;
  }
}
