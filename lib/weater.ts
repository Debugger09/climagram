import { API_BASE_URL, API_KEY } from "@/constants/config"
import type { WeatherData } from "@/types"

export const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  const url = `${API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Erreur météo: ${response.status}`)
  }

  const data = await response.json()

  return {
    temp: Math.round(data.main.temp),
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    humidity: data.main.humidity,
  }
}
