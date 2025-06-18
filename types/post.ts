export type MoodOption = {
  value: string;
  label: string;
  color: string;
};

export type Weather = {
  temp: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  main: string;
};

export type Post = {
  id: string;
  content?: string;
  comment: string;
  mood: MoodOption;
  city: string;
  lat: number;
  lon: number;
  weather: Weather;
  timestamp: string;
  userId?: string;
  likes?: number;
  comments?: Comment[];
};

export type Comment = {
  id: string;
  content: string;
  userId: string;
  createdAt: Date;
}; 