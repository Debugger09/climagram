"use client"

import { useQuery } from "@tanstack/react-query";
import { getWeather } from "../lib/weather";
import { Weather } from "../types";

interface HourlyData {
  dt: number;
  temp: number;
  weather: Array<{
    icon: string;
    description: string;
  }>;
}

interface DailyData {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  weather: Array<{
    icon: string;
    description: string;
  }>;
}

export const useWeather = (lat: number, lon: number) => {
  return useQuery<Weather, Error>({
    queryKey: ["weather", lat, lon],
    queryFn: () => getWeather(lat, lon),
    enabled: !!lat && !!lon,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
};
