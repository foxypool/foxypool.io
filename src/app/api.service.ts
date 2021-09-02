import axios, {AxiosInstance} from 'axios';

export class ApiService {
  private client: AxiosInstance = axios.create({
    baseURL: `https://api.foxypool.io/api/stats`,
  });

  async getPoolConfig({ poolIdentifier }) {
    const { data } = await this.client.get(`${poolIdentifier}/config`);

    return data;
  }

  async getOverviewPoolStats({ poolIdentifier }) {
    const { data } = await this.client.get(`${poolIdentifier}/overview/pool`);

    return data;
  }

  async getOverviewRoundStats({ poolIdentifier }) {
    const { data } = await this.client.get(`${poolIdentifier}/overview/round`);

    return data;
  }
}
