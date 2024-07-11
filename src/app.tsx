import React from 'react';
import './app.scss';
import CurrentWeather from './components/CurrentWeather';
import ForecastList from './components/ForecastList';
import SearchCity from './components/SearchCity';

const App: React.FC = () => {
  return (
    <div className="container">
      <SearchCity />
      <hr />
      <CurrentWeather />
      <br />
      <ForecastList />
    </div>
  );
};

export default App;
