export type LocationType = {
  id: number;
  name: string;
  lat: string;
  lon: string;
  country: string;
};

export type DataCurrentWeatherType = {
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
