import type { Weather } from '@/types';

const API_KEY = '11bd9423b7783958d0d1cef64b6dfe4d';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeather = async (lat: number, lon: number): Promise<Weather> => {
  try {
    const response = await fetch(
      `${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch weather data');
    }

    return {
      temp: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      windDeg: data.wind.deg,
      pressure: data.main.pressure,
      clouds: data.clouds.all,
      main: data.weather[0].main,
      icon: data.weather[0].icon,
      // Ces champs ne sont pas disponibles dans l'API gratuite
      uvi: 0,
      sunrise: 0,
      sunset: 0,
      hourly: [],
      daily: [],
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};

export interface WeatherData {
  temp: number
  description: string
  humidity: number
  windSpeed: number
  icon: string
  main: string
}

export interface City {
  name: string
  lat: number
  lon: number
}
