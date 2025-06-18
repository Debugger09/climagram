import { citiesForClimagram } from "@/constants/cities"
import { MOODS } from "@/constants/config"
import { usePosts } from "@/hooks/usePosts"
import { useWeather } from "@/hooks/useWeather"
import type { City, Mood } from "@/types"
import { Picker } from "@react-native-picker/picker"
import { useState } from "react"
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

export default function PublishScreen() {
  const [selectedCity, setSelectedCity] = useState<City>(citiesForClimagram[0])
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

      addPost(newPost)
      setComment("")
      Alert.alert("Succès", "Publication ajoutée avec succès !")
    } catch (error) {
      Alert.alert("Erreur", "Impossible de publier")
    } finally {
      setIsPublishing(false)
    }
  }

  const selectedMoodData = MOODS.find((m) => m.value === selectedMood)

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.section}>
          <Text style={styles.label}>Ville</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedCity.name}
              onValueChange={(cityName) => {
                const city = citiesForClimagram.find((c) => c.name === cityName)
                if (city) setSelectedCity(city)
              }}
              style={styles.picker}
            >
              {citiesForClimagram.map((city) => (
                <Picker.Item key={city.name} label={city.name} value={city.name} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Humeur</Text>
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

        <View style={styles.section}>
          <Text style={styles.label}>Commentaire</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Partagez votre ressenti météo..."
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {weather && (
          <View style={styles.weatherPreview}>
            <Text style={styles.weatherTitle}>Météo actuelle - {selectedCity.name}</Text>
            <View style={styles.weatherInfo}>
              <Text style={styles.temperature}>{weather.temp}°C</Text>
              <Text style={styles.description}>{weather.description}</Text>
              <Text style={styles.humidity}>Humidité: {weather.humidity}%</Text>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={[styles.publishButton, (!weather || isPublishing) && styles.publishButtonDisabled]}
          onPress={handlePublish}
          disabled={!weather || isPublishing || weatherLoading}
        >
          {isPublishing ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.publishButtonText}>Publier</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  form: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#1D1D1F",
  },
  pickerContainer: {
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#FFFFFF",
  },
  moodText: {
    fontSize: 14,
    color: "#1D1D1F",
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    padding: 16,
    fontSize: 16,
    minHeight: 100,
  },
  weatherPreview: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  weatherTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
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
    backgroundColor: "#007AFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
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
