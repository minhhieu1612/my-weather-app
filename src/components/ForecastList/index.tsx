import React, { useEffect, useState } from 'react';
import mock5DaysForecast from '../../assets/datas/mock_5_days_forecast.json';
import './index.scss';
import { useLoading } from '../../hooks/useLoading';
import {
  FiveDaysForecastResponseType,
  getCurrentWeather,
  getFiveDaysForecast,
} from '../../services';
import { useSelector } from 'react-redux';
import { selectQueryLocation } from '../../store/queryLocation';

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

      const response = await getFiveDaysForecast({
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
            <>
              <h4 className="forecast-day">{day}</h4>
              <hr />
              <div className="row forecast-list">
                {(lisItem as any[]).map((item) => (
                  <div className="col">
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
            </>
          ))
        : ''}
    </div>
  );
};

export default ForecastList;
