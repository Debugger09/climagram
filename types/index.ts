export type City = {
  name: string
  lat: number
  lon: number
}

export type Mood = "heureux" | "fatigué" | "apathique" | "énergique"

export interface Weather {
  temp: number
  feels_like: number
  description: string
  humidity: number
  windSpeed: number
  windDeg: number
  pressure: number
  clouds: number
  main: string
  icon: string
  uvi: number
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

export interface Post {
  id: string
  city: string
  lat: number
  lon: number
  mood: Mood
  comment: string
  weather: Weather
  timestamp: string
  image: string
  likes: number
  comments: Comment[]
  username: string
  avatar?: string
}

export interface Comment {
  id: string
  userId: string
  content: string
  createdAt: string
}
