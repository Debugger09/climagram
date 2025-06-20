import { cities } from "@/constants/cities";
import type { Post } from "@/types";

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
}

// Données simulées
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'kuito_ouandji',
    email: 'kuitoange@gmail.com',
    avatar: 'https://i.pravatar.cc/150?img=11'
  },
  {
    id: '2',
    username: 'ange_lugresse',
    email: 'kuitoange01@gmmail.com',
    avatar: 'https://i.pravatar.cc/150?img=12'
  }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    city: 'Yaoundé',
    lat: cities[0].lat,
    lon: cities[0].lon,
    mood: 'heureux',
    comment: 'Belle journée ensoleillée à Yaoundé ! ☀️',
    weather: {
      temp: 28,
      feels_like: 29,
      description: 'ciel dégagé',
      humidity: 65,
      windSpeed: 3.2,
      windDeg: 120,
      pressure: 1012,
      clouds: 10,
      main: 'Clear',
      icon: '01d',
      uvi: 7,
      sunrise: 0,
      sunset: 0,
      hourly: [],
      daily: [],
    },
    timestamp: '2024-07-24T09:00:00Z',
    image: 'https://picsum.photos/400/400?random=1',
    likes: 5,
    comments: [
      { id: 'c1', userId: '2', content: 'Super ambiance à Yaoundé !', createdAt: '2024-07-24T10:00:00Z' }
    ],
    username: 'Kuito Ange',
    avatar: 'https://i.pravatar.cc/150?img=11',
  },
  {
    id: '2',
    city: 'Douala',
    lat: cities[1].lat,
    lon: cities[1].lon,
    mood: 'fatigué',
    comment: 'Pluie rafraîchissante à Douala 🌧️',
    weather: {
      temp: 24,
      feels_like: 25,
      description: 'partiellement nuageux',
      humidity: 78,
      windSpeed: 2.1,
      windDeg: 90,
      pressure: 1008,
      clouds: 40,
      main: 'Clouds',
      icon: '02d',
      uvi: 9,
      sunrise: 0,
      sunset: 0,
      hourly: [],
      daily: [],
    },
    timestamp: '2024-07-24T11:00:00Z',
    image: 'https://picsum.photos/400/400?random=2',
    likes: 2,
    comments: [
      { id: 'c2', userId: '1', content: 'Courage avec la pluie !', createdAt: '2024-07-24T12:00:00Z' }
    ],
    username: 'Ouandji Lugresse',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: '3',
    city: 'Bafoussam',
    lat: cities[4].lat,
    lon: cities[4].lon,
    mood: 'énergique',
    comment: 'Un matin frais à Bafoussam, parfait pour un café chaud ☕',
    weather: {
      temp: 18,
      feels_like: 18,
      description: 'nuageux',
      humidity: 70,
      windSpeed: 4.5,
      windDeg: 150,
      pressure: 1015,
      clouds: 60,
      main: 'Clouds',
      icon: '03d',
      uvi: 5,
      sunrise: 0,
      sunset: 0,
      hourly: [],
      daily: [],
    },
    timestamp: '2024-07-24T07:30:00Z',
    image: 'https://picsum.photos/400/400?random=3',
    likes: 3,
    comments: [
      { id: 'c3', userId: '2', content: "J'adore l'énergie de Bafoussam !", createdAt: '2024-07-24T08:00:00Z' }
    ],
    username: 'Ange Lugresse',
    avatar: 'https://i.pravatar.cc/150?img=13',
  },
];

// Fonctions pour simuler les opérations CRUD
export const getCurrentUser = (): User | null => {
  // Simuler un utilisateur connecté
  return mockUsers[0];
};

export const getPosts = (): Post[] => {
  return mockPosts;
};

export const createPost = (post: Omit<Post, 'id'>): Post => {
  const newPost: Post = {
    ...post,
    id: Math.random().toString(36).substr(2, 9),
  };
  mockPosts.unshift(newPost);
  return newPost;
}; 