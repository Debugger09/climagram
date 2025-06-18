"use client"

import WeatherIcon from "@/components/WeatherIcon"
import { cities } from "@/constants/cities"
import { useWeather } from "@/hooks/useWeather"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"
import { useState } from "react"
import { ActivityIndicator, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface CityWeatherCardProps {
  city: (typeof cities)[0]
  onPress: () => void
}

function CityWeatherCard({ city, onPress }: CityWeatherCardProps) {
  const { weather, loading } = useWeather(city.lat, city.lon)

  return (
    <TouchableOpacity style={styles.cityCard} onPress={onPress}>
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.15)", "rgba(255, 255, 255, 0.05)"]}
        style={styles.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardContent}>
          <View style={styles.cityInfo}>
            <Text style={styles.cityName}>{city.name}</Text>
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : weather ? (
              <>
                <Text style={styles.weatherDescription}>{weather.description}</Text>
                <Text style={styles.temperature}>{weather.temp}°C</Text>
              </>
            ) : (
              <Text style={styles.errorText}>N/A</Text>
            )}
          </View>
          <View style={styles.weatherIconContainer}>
            {weather && !loading && <WeatherIcon condition={weather.main} size={40} color="#FFFFFF" />}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default function CitiesScreen() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null)

  const handleCityPress = (city: (typeof cities)[0]) => {
    setSelectedCity(city.name)
    router.push({
      pathname: "/weather-detail",
      params: {
        cityName: city.name,
        lat: city.lat.toString(),
        lon: city.lon.toString(),
      },
    })
  }

  return (
    <LinearGradient
      colors={["#1e3c72", "#2a5298"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar barStyle="light-content" backgroundColor="#1e3c72" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Hello Arian,</Text>
          <Text style={styles.subtitle}>Discover the weather</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.currentLocationCard}>
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.1)"]}
          style={styles.locationGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.locationContent}>
            <View>
              <Text style={styles.locationLabel}>Current location</Text>
              <Text style={styles.locationName}>Yaoundé</Text>
              <Text style={styles.locationWeather}>Thunder</Text>
            </View>
            <View style={styles.locationTemp}>
              <Text style={styles.tempValue}>20°C</Text>
              <WeatherIcon condition="thunderstorm" size={32} color="#FFFFFF" />
            </View>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Around the world</Text>
      </View>

      <FlatList
        data={cities}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <CityWeatherCard city={item} onPress={() => handleCityPress(item)} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerContent: {
    flex: 1,
    marginLeft: 16,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  currentLocationCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    overflow: "hidden",
  },
  locationGradient: {
    padding: 20,
  },
  locationContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 4,
  },
  locationName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  locationWeather: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  locationTemp: {
    alignItems: "center",
    gap: 4,
  },
  tempValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cityCard: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  cardGradient: {
    padding: 16,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cityInfo: {
    flex: 1,
  },
  cityName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  weatherDescription: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    textTransform: "capitalize",
    marginBottom: 2,
  },
  temperature: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  weatherIconContainer: {
    marginLeft: 16,
  },
  errorText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.5)",
  },
})
