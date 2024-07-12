import React, { useEffect, useState } from 'react';
import './index.scss';
import { useLoading } from 'src/hooks/useLoading';

import { useSelector } from 'react-redux';
import { selectQueryLocation } from 'src/store/queryLocation';
import { FiveDaysForecastResponseType } from 'src/services/WeatherService.types';
import { weatherService } from 'src/services';

const formatGroupByDay = (data: any[]) => {
  return Object.entries(
    data.reduce((res, item) => {
      let day = new Date(item.dt_txt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

      const currentDay = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

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

const ForecastList = () => {
  const { startLoading, endLoading, Loader } = useLoading();
  const { lat, lon } = useSelector(selectQueryLocation);
  const [dataFiveDaysForecast, setDataFiveDaysForecast] =
    useState<FiveDaysForecastResponseType | null>(null);

  useEffect(() => {
    (async () => {
      startLoading();

      const response = await weatherService.getFiveDaysForecast({
        lattitude: lat,
        longtitude: lon,
      });

      endLoading();

      if (response.success) {
        setDataFiveDaysForecast(response.data as FiveDaysForecastResponseType);
      }
    })();
  }, [lat, lon]);

  return (
    <div>
      {Loader}
      {dataFiveDaysForecast !== null
        ? formatGroupByDay(
            (dataFiveDaysForecast as FiveDaysForecastResponseType).list
          ).map(([day, lisItem]) => (
            <div key={day}>
              <h4 className="forecast-day">{day}</h4>
              <hr />
              <div className="row forecast-list">
                {(lisItem as any[]).map((item) => (
                  <div key={item.dt_txt} className="col">
                    <div className="forecast-list-item">
                      <div className="time">
                        {new Date(item.dt_txt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: 'numeric',
                        })}
                      </div>
                      <img
                        src={`https://openweathermap.org/img/w/${item.weather[0]?.icon}.png`}
                        alt=""
                      />
                      <div className="description">
                        {item.weather[0].description}
                      </div>
                      <div className="temperature">
                        {item.main.temp_max}° / {item.main.temp_min}°
                      </div>
                      <div className="description">
                        {item.weather[0].description}
                      </div>
                      <div className="humidity">
                        Humidity: {item.main.humidity}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        : ''}
    </div>
  );
};

export default ForecastList;
