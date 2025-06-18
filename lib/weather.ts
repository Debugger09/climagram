import type { Weather } from '@/types';

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Remplacez par votre clé API
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeather = async (lat: number, lon: number): Promise<Weather> => {
  try {
    const response = await fetch(
      `${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    const data = await response.json();

    return {
      temp: Math.round(data.main.temp),
      description: data.weather[0].description,
      humidity: data.main.humidity,
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
}; 