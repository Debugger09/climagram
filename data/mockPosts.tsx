import { cities } from "@/constants/cities"
import type { Post } from "@/types/post"

export const mockPosts: Post[] = [
  {
    id: "1",
    city: "Yaoundé",
    lat: cities[0].lat,
    lon: cities[0].lon,
    mood: "heureux",
    comment: "Belle journée ensoleillée dans la capitale. Parfait pour une promenade au parc!",
    weather: {
      temp: 28,
      description: "ciel dégagé",
      humidity: 65,
      windSpeed: 3.2,
      icon: "01d",
      main: "Clear",
    },
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "2",
    city: "Douala",
    lat: cities[1].lat,
    lon: cities[1].lon,
    mood: "fatigué",
    comment: "La chaleur est accablante aujourd'hui. Difficile de rester productif.",
    weather: {
      temp: 32,
      description: "partiellement nuageux",
      humidity: 78,
      windSpeed: 2.1,
      icon: "02d",
      main: "Clouds",
    },
    timestamp: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "3",
    city: "Bafoussam",
    lat: cities[4].lat,
    lon: cities[4].lon,
    mood: "énergique",
    comment: "La fraîcheur des hauts plateaux me donne de l'énergie pour toute la journée!",
    weather: {
      temp: 22,
      description: "légère pluie",
      humidity: 70,
      windSpeed: 4.5,
      icon: "10d",
      main: "Rain",
    },
    timestamp: new Date(Date.now() - 10800000).toISOString(),
  },
]
