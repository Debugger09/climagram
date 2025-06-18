import type { Post } from "@/types"

export const mockPosts: Post[] = [
  {
    id: "1",
    city: "Yaoundé",
    lat: 3.848,
    lon: 11.5021,
    mood: "heureux",
    comment: "Belle journée ensoleillée dans la capitale ! 🌞",
    weather: {
      temp: 28,
      description: "ensoleillé",
      icon: "01d",
      humidity: 65,
    },
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    city: "Douala",
    lat: 4.0511,
    lon: 9.7679,
    mood: "fatigué",
    comment: "Temps humide et lourd aujourd'hui... 😴",
    weather: {
      temp: 26,
      description: "nuageux",
      icon: "04d",
      humidity: 85,
    },
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    city: "Kribi",
    lat: 2.9383,
    lon: 9.9107,
    mood: "énergique",
    comment: "Parfait pour une balade sur la plage ! 🏖️",
    weather: {
      temp: 24,
      description: "partiellement nuageux",
      icon: "02d",
      humidity: 70,
    },
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
]
