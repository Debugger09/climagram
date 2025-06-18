import { Ionicons } from "@expo/vector-icons"
import React from "react"

interface WeatherIconProps {
  description?: string
  condition?: string
  size?: number
  color?: string
}

export default function WeatherIcon({ 
  description, 
  condition, 
  size = 36, 
  color = "#007AFF" 
}: WeatherIconProps) {
  let icon = "partly-sunny"
  const desc = (description || condition || "").toLowerCase()
  
  if (desc.includes("soleil") || desc.includes("clear")) icon = "sunny"
  else if (desc.includes("pluie") || desc.includes("rain")) icon = "rainy"
  else if (desc.includes("orage") || desc.includes("thunder")) icon = "thunderstorm"
  else if (desc.includes("neige") || desc.includes("snow")) icon = "snow"
  else if (desc.includes("brume") || desc.includes("mist") || desc.includes("fog")) icon = "cloud-outline"
  else if (desc.includes("nuage") || desc.includes("cloud")) icon = "cloud"
  
  return <Ionicons name={icon as any} size={size} color={color} />
}
