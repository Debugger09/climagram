"use client"

import { fetchWeatherData } from "@/lib/weather"
import type { WeatherData } from "@/types"
import { useEffect, useState } from "react"

export const useWeather = (lat: number, lon: number) => {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getWeather = async () => {
      if (!lat || !lon) return

      setLoading(true)
      setError(null)

      try {
        const data = await fetchWeatherData(lat, lon)
        setWeather(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue")
      } finally {
        setLoading(false)
      }
    }

    getWeather()
  }, [lat, lon])

  return { weather, loading, error }
}
