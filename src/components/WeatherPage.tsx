import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const WeatherPage: React.FC = () => {
  const { city } = useParams<{ city: string }>();
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = 'your_openweathermap_api_key';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      setWeather(response.data);
    };

    fetchWeather();
  }, [city]);

  return (
    <div>
      {weather ? (
        <div>
          <h1>{weather.name} Weather</h1>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
};

export default WeatherPage;
