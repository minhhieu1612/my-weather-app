import { OPEN_WEATHER_API_KEY } from 'src/utils/env';
import Repository from './Repository';
import {
  CurrentWeatherResponseType,
  FiveDaysForecastResponseType,
  GeoLocationResponseType,
} from './WeatherService.types';

const WEATHER_SERVICE_URL = 'http://api.openweathermap.org';

class WeatherService {
  private _respository: InstanceType<typeof Repository>;

  constructor() {
    this._respository = new Repository({ baseUrl: WEATHER_SERVICE_URL });
  }

  async getFiveDaysForecast({
    lattitude,
    longtitude,
  }: {
    lattitude: number;
    longtitude: number;
  }) {
    return await this._respository.get<FiveDaysForecastResponseType>(
      'data/2.5/forecast',
      {
        units: 'metric',
        lat: lattitude.toString(),
        lon: longtitude.toString(),
        appid: OPEN_WEATHER_API_KEY,
      }
    );
  }

  async getCurrentWeather({
    lattitude,
    longtitude,
  }: {
    lattitude: number;
    longtitude: number;
  }) {
    return await this._respository.get<CurrentWeatherResponseType>(
      'data/2.5/weather',
      {
        units: 'metric',
        lat: lattitude.toString(),
        lon: longtitude.toString(),
        appid: OPEN_WEATHER_API_KEY,
      }
    );
  }

  async getLocation({ query, limit = 1 }: { query: string; limit?: number }) {
    return await this._respository.get<GeoLocationResponseType[]>(
      'geo/1.0/direct',
      {
        q: query,
        limit: limit.toString(),
        appid: OPEN_WEATHER_API_KEY,
      }
    );
  }
}

export default WeatherService