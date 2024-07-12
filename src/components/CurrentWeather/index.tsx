import React, { useEffect, useState } from 'react';
import { CurrentWeatherResponseType, getCurrentWeather } from '../../services';
import { useSelector } from 'react-redux';
import { selectQueryLocation } from '../../store/queryLocation';
import './index.scss';
import { useLoading } from '../../hooks/useLoading';

const formatVisibility = (distant: number) => {
  if (distant > 100) {
    return (distant / 1000).toFixed(1) + ' km';
  }

  return distant + ' m';
};

type DataCurrentWeatherType = {
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  dt: number;
  sys: {
    country: string;
  };
  name: string;
};

const formatWeatherData = (
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

const CurrentWeather = () => {
  const { lat, lon } = useSelector(selectQueryLocation);
  const [dataCurrentWeather, setDataCurrentWeather] =
    useState<DataCurrentWeatherType | null>(null);
  const { startLoading, endLoading, Loader } = useLoading();

  useEffect(() => {
    (async () => {
      startLoading();

      const response = await getCurrentWeather({
        lattitude: lat,
        longtitude: lon,
      });

      endLoading();

      if (response.success) {
        setDataCurrentWeather(
          formatWeatherData(response.data as CurrentWeatherResponseType)
        );
      }
    })();
  }, [lat, lon]);

  return (
    <div className="current-weather">
      {Loader}
      {dataCurrentWeather !== null ? (
        <>
          <h4 className="date">
            {new Date(
              (dataCurrentWeather as DataCurrentWeatherType).dt * 1000
            ).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </h4>
          <div className="header">
            <div className="header-info">
              <div>
                <h2 className="title">
                  {/* TODO: should find another way to get these properties rather than use casting */}
                  {(dataCurrentWeather as DataCurrentWeatherType).name},{' '}
                  {(dataCurrentWeather as DataCurrentWeatherType).sys.country}
                </h2>
                <p className="description">
                  {
                    (dataCurrentWeather as DataCurrentWeatherType).weather[0]
                      .description
                  }
                </p>
              </div>
            </div>
            <img
              src={`https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${
                (dataCurrentWeather as DataCurrentWeatherType).weather[0].icon
              }.png`}
              width={128}
              height={128}
              alt="Weather in Ho Chi Minh City, VN"
              className="header-icon"
            />
          </div>
          <div className="body">
            <div className="temperature">
              {(dataCurrentWeather as DataCurrentWeatherType).main.temp}
              <span>°C</span>
            </div>
            <div className="weather">
              <div className="weather-card">
                <table className="table">
                  <tbody>
                    <tr className="items">
                      <th colSpan={2} className="item">
                        Details
                      </th>
                    </tr>
                    <tr className="items">
                      <td className="item">Wind</td>
                      <td className="item wind-speed">
                        <img
                          src="./assets/images/arrow-min.png"
                          alt="wind degree"
                          width={16}
                          height={16}
                          style={{
                            transform: `rotate(${
                              (dataCurrentWeather as DataCurrentWeatherType)
                                .wind.deg - 180
                            }deg)`,
                          }}
                        />
                        {
                          (dataCurrentWeather as DataCurrentWeatherType).wind
                            .speed
                        }
                        m/s
                      </td>
                    </tr>
                    <tr className="items">
                      <td className="item">Humidity</td>
                      <td className="item humidity">
                        {
                          (dataCurrentWeather as DataCurrentWeatherType).main
                            .humidity
                        }
                        %
                      </td>
                    </tr>
                    <tr className="items">
                      <td className="item">Visibility</td>
                      <td className="item humidity">
                        {formatVisibility(
                          (dataCurrentWeather as DataCurrentWeatherType)
                            .visibility
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default CurrentWeather;
