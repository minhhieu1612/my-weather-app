import React, { useEffect, useState } from 'react';
import './index.scss';
import { useLoading } from 'src/hooks/useLoading';
import { useSelector } from 'react-redux';
import { selectQueryLocation } from 'src/store/queryLocation';
import { FiveDaysForecastResponseType } from 'src/services/WeatherService.types';
import { weatherService } from 'src/services';
import { groupDataForecastByDay } from 'src/utils/common';
import { getFormattedLocaleTime } from 'src/utils/formatDateTime';

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
        ? groupDataForecastByDay(
            (dataFiveDaysForecast as FiveDaysForecastResponseType).list
          ).map(([day, lisItem]) => (
            <div className="forecast-list" key={day}>
              <h4 className="forecast-list__day">{day}</h4>
              <hr />
              <div className="row h-mt-2">
                {(lisItem as any[]).map((item) => (
                  <div key={item.dt_txt} className="col">
                    <div className="forecast-list__card">
                      <div className="forecast-list__time">
                        {getFormattedLocaleTime(item.dt_txt)}
                      </div>
                      <img
                        className="forecast-list__weather-icon"
                        src={`https://openweathermap.org/img/w/${item.weather[0]?.icon}.png`}
                        alt=""
                      />
                      <div className="forecast-list__description is-hidden-mobile-only">
                        {item.weather[0].description}
                      </div>
                      <div className="forecast-list__temperature">
                        {item.main.temp_max}° / {item.main.temp_min}°
                      </div>
                      <div className="forecast-list__description is-visible-mobile-only">
                        {item.weather[0].description}
                      </div>
                      <div className="forecast-list__humidity">
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
