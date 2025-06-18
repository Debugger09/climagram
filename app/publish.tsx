"use client"

import WeatherIcon from "@/components/WeatherIcon"
import { cities } from "@/constants/cities"
import { MOODS } from "@/constants/moods"
import { usePosts } from "@/hooks/usePosts"
import { useWeather } from "@/hooks/useWeather"
import type { Mood } from "@/types/post"
import { Ionicons } from "@expo/vector-icons"
import { Picker } from "@react-native-picker/picker"
import { LinearGradient } from "expo-linear-gradient"
import { useState } from "react"
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

export default function PublishScreen() {
  const [selectedCity, setSelectedCity] = useState(cities[0])
  const [selectedMood, setSelectedMood] = useState<Mood>("heureux")
  const [comment, setComment] = useState("")
  const [isPublishing, setIsPublishing] = useState(false)

  const { weather, loading: weatherLoading } = useWeather(selectedCity.lat, selectedCity.lon)
  const { addPost } = usePosts()

  const handlePublish = async () => {
    if (!comment.trim()) {
      Alert.alert("Erreur", "Veuillez ajouter un commentaire")
      return
    }

    if (!weather) {
      Alert.alert("Erreur", "Données météo non disponibles")
      return
    }

    setIsPublishing(true)

    try {
      const newPost = {
        id: Date.now().toString(),
        city: selectedCity.name,
        lat: selectedCity.lat,
        lon: selectedCity.lon,
        mood: selectedMood,
        comment: comment.trim(),
        weather,
        timestamp: new Date().toISOString(),
      }

      await addPost(newPost)
      setComment("")
      Alert.alert("Succès", "Publication ajoutée avec succès !")
    } catch (error) {
      Alert.alert("Erreur", "Impossible de publier")
    } finally {
      setIsPublishing(false)
    }
  }

  const selectedMoodData = MOODS.find((m) => m.value === selectedMood) || MOODS[0]

  return (
    <LinearGradient
      colors={["#1e3c72", "#2a5298"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>Partagez votre humeur météo</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Ville</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedCity.name}
                onValueChange={(cityName) => {
                  const city = cities.find((c) => c.name === cityName)
                  if (city) setSelectedCity(city)
                }}
                style={styles.picker}
                dropdownIconColor="#1e3c72"
              >
                {cities.map((city) => (
                  <Picker.Item key={city.name} label={city.name} value={city.name} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Comment vous sentez-vous ?</Text>
            <View style={styles.moodContainer}>
              {MOODS.map((mood) => (
                <TouchableOpacity
                  key={mood.value}
                  style={[
                    styles.moodButton,
                    selectedMood === mood.value && { backgroundColor: mood.color + "20", borderColor: mood.color },
                  ]}
                  onPress={() => setSelectedMood(mood.value)}
                >
                  <Text style={[styles.moodText, selectedMood === mood.value && { color: mood.color }]}>
                    {mood.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Commentaire</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Partagez votre ressenti météo..."
              value={comment}
              onChangeText={setComment}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor="#999"
            />
          </View>

          {weatherLoading ? (
            <View style={styles.weatherLoading}>
              <ActivityIndicator size="small" color="#1e3c72" />
              <Text style={styles.weatherLoadingText}>Chargement de la météo...</Text>
            </View>
          ) : weather ? (
            <View style={styles.weatherPreview}>
              <View style={styles.weatherHeader}>
                <Text style={styles.weatherTitle}>Météo actuelle - {selectedCity.name}</Text>
                <WeatherIcon condition={weather.main} size={32} color="#FFFFFF" />
              </View>
              <View style={styles.weatherInfo}>
                <Text style={styles.temperature}>{weather.temp}°C</Text>
                <Text style={styles.description}>{weather.description}</Text>
                <Text style={styles.humidity}>Humidité: {weather.humidity}%</Text>
              </View>
            </View>
          ) : null}

          <TouchableOpacity
            style={[styles.publishButton, (!weather || isPublishing) && styles.publishButtonDisabled]}
            onPress={handlePublish}
            disabled={!weather || isPublishing || weatherLoading}
          >
            {isPublishing ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Ionicons name="send" size={18} color="#FFFFFF" />
                <Text style={styles.publishButtonText}>Publier</Text>
              </>
            )}
          </TouchableOpacity>
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
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e3c72",
    marginBottom: 20,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  pickerContainer: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  picker: {
    height: 50,
  },
  moodContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  moodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    backgroundColor: "#F8F9FA",
  },
  moodText: {
    fontSize: 14,
    color: "#333",
  },
  textInput: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    padding: 16,
    fontSize: 16,
    minHeight: 100,
    color: "#333",
  },
  weatherLoading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
  },
  weatherLoadingText: {
    color: "#666",
    fontSize: 14,
  },
  weatherPreview: {
    backgroundColor: "#1e3c72",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  weatherHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  weatherTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  weatherInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  temperature: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    color: "#FFFFFF",
    fontSize: 16,
    textTransform: "capitalize",
  },
  humidity: {
    color: "#FFFFFF",
    fontSize: 14,
    opacity: 0.8,
  },
  publishButton: {
    backgroundColor: "#1e3c72",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  publishButtonDisabled: {
    backgroundColor: "#8E8E93",
  },
  publishButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
})
