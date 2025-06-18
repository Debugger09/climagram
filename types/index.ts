export type City = {
  name: string
  lat: number
  lon: number
}

export type Mood = "heureux" | "triste" | "energique" | "fatigue" | "neutre"

export type Weather = {
  temp: number
  feels_like: number
  description: string
  humidity: number
  windSpeed: number
  windDeg: number
  pressure: number
  clouds: number
  uvi: number
  main: string
  icon: string
  sunrise: number
  sunset: number
  hourly: Array<{
    dt: number
    temp: number
    icon: string
    description: string
  }>
  daily: Array<{
    dt: number
    temp: {
      min: number
      max: number
    }
    icon: string
    description: string
  }>
}

export type Post = {
  id: string
  city: string
  lat: number
  lon: number
  mood: Mood
  comment: string
  weather: Weather
  timestamp: string
}
