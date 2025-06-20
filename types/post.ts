// Ce fichier ne doit plus contenir de type Post ou MoodOption. Utilise uniquement les types de types/index.ts.

export type Weather = {
  temp: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  main: string;
};

export type Comment = {
  id: string;
  content: string;
  userId: string;
  createdAt: Date;
}; 