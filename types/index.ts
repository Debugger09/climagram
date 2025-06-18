export type City = {
  name: string
  lat: number
  lon: number
}

export type Mood = "heureux" | "triste" | "energique" | "fatigue" | "neutre"

export type Weather = {
  temp: number
  description: string
  humidity: number
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
