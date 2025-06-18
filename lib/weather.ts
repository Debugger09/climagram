import type { Weather } from '@/types';

const API_KEY = '11bd9423b7783958d0d1cef64b6dfe4d';
const BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';

export const getWeather = async (lat: number, lon: number): Promise<Weather> => {
  try {
    const response = await fetch(
      `${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    const data = await response.json();

    // On utilise les données actuelles (current)
    const current = data.current;
    const weather = current.weather[0];

    return {
      temp: Math.round(current.temp),
      feels_like: Math.round(current.feels_like),
      description: weather.description,
      humidity: current.humidity,
      windSpeed: current.wind_speed,
      windDeg: current.wind_deg,
      pressure: current.pressure,
      clouds: current.clouds,
      uvi: current.uvi,
      main: weather.main,
      icon: weather.icon,
      sunrise: data.current.sunrise,
      sunset: data.current.sunset,
      // Prévisions pour les prochaines heures
      hourly: data.hourly.slice(0, 24).map((hour: any) => ({
        dt: hour.dt,
        temp: Math.round(hour.temp),
        icon: hour.weather[0].icon,
        description: hour.weather[0].description,
      })),
      // Prévisions pour les prochains jours
      daily: data.daily.slice(0, 7).map((day: any) => ({
        dt: day.dt,
        temp: {
          min: Math.round(day.temp.min),
          max: Math.round(day.temp.max),
        },
        icon: day.weather[0].icon,
        description: day.weather[0].description,
      })),
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
