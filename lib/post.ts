import type { WeatherData } from "./weather"

export type Mood = "heureux" | "fatigué" | "apathique" | "énergique"

export interface MoodOption {
  value: Mood
  label: string
  color: string
}

export interface Post {
  id: string
  city: string
  lat: number
  lon: number
  mood: Mood
  comment: string
  weather: WeatherData
  timestamp: string
}
