import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectQueryLocation } from 'src/store/queryLocation';
import './index.scss';
import { useLoading } from 'src/hooks/useLoading';
import { CurrentWeatherResponseType } from 'src/services/WeatherService.types';
import { weatherService } from 'src/services';
import { formatCurrentWeatherData, formatDistance } from 'src/utils/common';
import { DataCurrentWeatherType } from 'src/types';
import { getFormattedLocaleDate } from 'src/utils/formatDateTime';

const CurrentWeather = () => {
  const { lat, lon } = useSelector(selectQueryLocation);
  const [dataCurrentWeather, setDataCurrentWeather] = useState<
    DataCurrentWeatherType | undefined
  >();
  const { startLoading, endLoading, Loader } = useLoading();

  useEffect(() => {
    (async () => {
      startLoading();

      const response = await weatherService.getCurrentWeather({
        lattitude: lat,
        longtitude: lon,
      });

      endLoading();

      if (response.success) {
        setDataCurrentWeather(
          formatCurrentWeatherData(response.data as CurrentWeatherResponseType)
        );
      }
    })();
  }, [lat, lon]);

  return (
    <div className="current-weather">
      {Loader}
      {dataCurrentWeather !== undefined ? (
        <>
          <h4 className="date">
            {getFormattedLocaleDate(dataCurrentWeather.dt * 1000)}
          </h4>
          <div className="header">
            <div className="header-info">
              <div>
                <h2 className="title">
                  {dataCurrentWeather.name}, {dataCurrentWeather.sys.country}
                </h2>
                <p className="description">
                  {dataCurrentWeather.weather[0].description}
                </p>
              </div>
            </div>
            <img
              src={`https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${dataCurrentWeather.weather[0].icon}.png`}
              width={128}
              height={128}
              alt="Weather in Ho Chi Minh City, VN"
              className="header-icon"
            />
          </div>
          <div className="body">
            <div className="temperature">
              {dataCurrentWeather.main.temp}
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
                          src="./assets/images/arrow.png"
                          alt="wind degree"
                          width={16}
                          height={16}
                          style={{
                            transform: `rotate(${
                              dataCurrentWeather.wind.deg - 180
                            }deg)`,
                          }}
                        />
                        {dataCurrentWeather.wind.speed}
                        m/s
                      </td>
                    </tr>
                    <tr className="items">
                      <td className="item">Humidity</td>
                      <td className="item humidity">
                        {dataCurrentWeather.main.humidity}%
                      </td>
                    </tr>
                    <tr className="items">
                      <td className="item">Visibility</td>
                      <td className="item humidity">
                        {formatDistance(dataCurrentWeather.visibility)}
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
