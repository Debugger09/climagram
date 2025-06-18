import WeatherIcon from "@/components/WeatherIcon"
import { useWeather } from "@/hooks/useWeather"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { router, useLocalSearchParams } from "expo-router"
import { ActivityIndicator, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface WeatherMetricProps {
  icon: keyof typeof Ionicons.glyphMap
  value: string
  label: string
}

function WeatherMetric({ icon, value, label }: WeatherMetricProps) {
  return (
    <View style={styles.metricContainer}>
      <View style={styles.metricIcon}>
        <Ionicons name={icon} size={24} color="#FFFFFF" />
      </View>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  )
}

export default function WeatherDetailScreen() {
  const { cityName, lat, lon } = useLocalSearchParams<{
    cityName: string
    lat: string
    lon: string
  }>()

  const { data: weather, isLoading, error } = useWeather(
    parseFloat(lat || "0"),
    parseFloat(lon || "0")
  )

  if (isLoading) {
    return (
      <LinearGradient colors={["#1e3c72", "#2a5298"]} style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1e3c72" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Loading weather data...</Text>
        </View>
      </LinearGradient>
    )
  }

  if (error) {
    return (
      <LinearGradient colors={["#1e3c72", "#2a5298"]} style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1e3c72" />
        <View style={styles.errorContainer}>
          <Ionicons name="cloud-offline" size={64} color="#FFFFFF" />
          <Text style={styles.errorText}>Unable to load weather data</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => router.back()}>
            <Text style={styles.retryButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    )
  }

  if (!weather) {
    return (
      <LinearGradient colors={["#1e3c72", "#2a5298"]} style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1e3c72" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Aucune donnée météo disponible</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => router.back()}>
            <Text style={styles.retryButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    )
  }

  return (
    <LinearGradient
      colors={["#1e3c72", "#2a5298"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar barStyle="light-content" backgroundColor="#1e3c72" />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Today</Text>
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="ellipsis-horizontal" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.mainWeatherCard}>
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.1)"]}
            style={styles.weatherCardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.weatherCardContent}>
              <WeatherIcon description={weather.description} size={80} color="#FFFFFF" />
              <View style={styles.weatherInfo}>
                <Text style={styles.cityName}>{cityName}</Text>
                <Text style={styles.mainTemperature}>{Math.round(weather.temp)}°C</Text>
                <Text style={styles.weatherCondition}>{weather.description}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>Weather now</Text>
        </View>

        <View style={styles.metricsContainer}>
          <WeatherMetric icon="water" value={`${weather.humidity}%`} label="Humidity" />
          <WeatherMetric icon="speedometer" value={`${weather.windSpeed} m/s`} label="Wind Speed" />
        </View>

        <View style={styles.additionalInfo}>
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.15)", "rgba(255, 255, 255, 0.05)"]}
            style={styles.infoCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.infoTitle}>Weather Details</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Feels like</Text>
              <Text style={styles.infoValue}>{weather.temp + 2}°C</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Condition</Text>
              <Text style={styles.infoValue}>{weather.main}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Humidity</Text>
              <Text style={styles.infoValue}>{weather.humidity}%</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Wind Speed</Text>
              <Text style={styles.infoValue}>{weather.windSpeed} m/s</Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.forecast}>
          <Text style={styles.sectionTitle}>Prévisions horaires</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {weather.hourly.map((hour, index) => (
              <View key={index} style={styles.hourlyItem}>
                <Text style={styles.hourlyTime}>
                  {new Date(hour.dt * 1000).getHours()}h
                </Text>
                <Text style={styles.hourlyTemp}>{Math.round(hour.temp)}°</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.forecast}>
          <Text style={styles.sectionTitle}>Prévisions sur 7 jours</Text>
          {weather.daily.map((day, index) => (
            <View key={index} style={styles.dailyItem}>
              <Text style={styles.dailyDay}>
                {new Date(day.dt * 1000).toLocaleDateString("fr-FR", {
                  weekday: "long",
                })}
              </Text>
              <View style={styles.dailyTemp}>
                <Text style={styles.dailyTempMax}>{Math.round(day.temp.max)}°</Text>
                <Text style={styles.dailyTempMin}>{Math.round(day.temp.min)}°</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  errorText: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  menuButton: {
    padding: 8,
  },
  mainWeatherCard: {
    marginHorizontal: 20,
    marginBottom: 32,
    borderRadius: 20,
    overflow: "hidden",
  },
  weatherCardGradient: {
    padding: 32,
  },
  weatherCardContent: {
    alignItems: "center",
  },
  weatherInfo: {
    alignItems: "center",
    marginTop: 16,
  },
  cityName: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 8,
  },
  mainTemperature: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  weatherCondition: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    textTransform: "capitalize",
  },
  sectionTitle: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  metricsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 32,
  },
  metricContainer: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
  },
  additionalInfo: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  infoCard: {
    borderRadius: 16,
    padding: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  forecast: {
    backgroundColor: "white",
    marginTop: 10,
    padding: 20,
  },
  hourlyItem: {
    alignItems: "center",
    marginRight: 20,
  },
  hourlyTime: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  hourlyTemp: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e3c72",
  },
  dailyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dailyDay: {
    fontSize: 16,
    color: "#333",
  },
  dailyTemp: {
    flexDirection: "row",
    alignItems: "center",
  },
  dailyTempMax: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e3c72",
    marginRight: 10,
  },
  dailyTempMin: {
    fontSize: 16,
    color: "#666",
  },
})
