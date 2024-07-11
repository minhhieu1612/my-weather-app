import { OPEN_WEATHER_API_KEY } from '../utils/env';

type BaseResponseType<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type FiveDaysForecastResponseType = {
  cod: string;
  message: number;
  cnt: number;
  list: [
    {
      dt: number;
      main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
      };
      weather: [
        {
          id: number;
          main: string;
          description: string;
          icon: string;
        }
      ];
      clouds: {
        all: number;
      };
      wind: {
        speed: number;
        deg: number;
        gust: number;
      };
      visibility: number;
      pop: number;
      rain: {
        '3h': number;
      };
      sys: {
        pod: string;
      };
      dt_txt: string;
    }
  ];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

export const getFiveDaysForecast = async ({
  lattitude,
  longtitude,
}: {
  lattitude: number;
  longtitude: number;
}): Promise<BaseResponseType<FiveDaysForecastResponseType>> => {
  try {
    const rawData = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lattitude}&lon=${longtitude}&appid=${OPEN_WEATHER_API_KEY}`
    );
    const data = (await rawData.json());

    return {
      success: true,
      data,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: (error as Error).message,
    };
  }
};

export type CurrentWeatherResponseType = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export const getCurrentWeather = async ({
  lattitude,
  longtitude,
}: {
  lattitude: number;
  longtitude: number;
}): Promise<BaseResponseType<CurrentWeatherResponseType>> => {
  try {
    const rawData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&&lat=${lattitude}&lon=${longtitude}&appid=${OPEN_WEATHER_API_KEY}`
    );
    const data = (await rawData.json());

    return {
      success: true,
      data,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: (error as Error).message,
    };
  }
};

type GeoLocationResponseType = {
  name: string;
  local_names: {
    [key: string]: string;
  };
  lat: string;
  lon: string;
  country: string;
};

export const getLocation = async ({
  query,
  limit = 1,
}: {
  query: string;
  limit?: number;
}): Promise<BaseResponseType<GeoLocationResponseType[]>> => {
  try {
    const rawData = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${limit}&appid=${OPEN_WEATHER_API_KEY}`
    );
    const data = (await rawData.json());

    return {
      success: true,
      data,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: (error as Error).message,
    };
  }
};
