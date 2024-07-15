import { CurrentWeatherResponseType } from 'src/services/WeatherService.types';
import { DataCurrentWeatherType } from 'src/types';
import { getFormattedLocaleDate } from './formatDateTime';

export const getUniqueId = () => new Date().getTime();

export const formatDistance = (distant: number) => {
  if (distant > 100) {
    return (distant / 1000).toFixed(1) + ' km';
  }

  return distant + ' m';
};


export const groupDataForecastByDay = (data: any[]) => {
  return Object.entries(
    data.reduce((res, item) => {
      let day = getFormattedLocaleDate(item.dt_txt)

      const currentDay = getFormattedLocaleDate();

      if (day === currentDay) {
        day = 'Today';
      }

      if (res[day]?.length) {
        res[day].push(item);
      } else {
        res[day] = [item];
      }

      return res;
    }, {})
  );
};

export const formatCurrentWeatherData = (
  data: CurrentWeatherResponseType
): DataCurrentWeatherType => {
  return {
    weather: [
      {
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      },
    ],
    main: {
      temp: data.main.temp,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
    },
    visibility: data.visibility,
    wind: {
      speed: data.wind.speed,
      deg: data.wind.deg,
    },
    dt: data.dt,
    sys: {
      country: data.sys.country,
    },
    name: data.name,
  };
};
