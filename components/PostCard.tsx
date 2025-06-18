import { MOODS } from "@/constants/config"
import type { Post } from "@/types"
import { Ionicons } from "@expo/vector-icons"
import { StyleSheet, Text, View } from "react-native"

type Props = {
  post: Post
  showAuthor?: boolean
}

export default function PostCard({ post, showAuthor = true }: Props) {
  const moodData = MOODS.find((m) => m.value === post.mood)
  const timeAgo = getTimeAgo(post.timestamp)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.locationInfo}>
          <Ionicons name="location" size={16} color="#007AFF" />
          <Text style={styles.city}>{post.city}</Text>
        </View>
        <Text style={styles.timestamp}>{timeAgo}</Text>
      </View>

      <View style={styles.weatherSection}>
        <View style={styles.weatherInfo}>
          <Text style={styles.temperature}>{post.weather.temp}°C</Text>
          <Text style={styles.weatherDescription}>{post.weather.description}</Text>
        </View>
        <View style={styles.humidityInfo}>
          <Ionicons name="water" size={16} color="#007AFF" />
          <Text style={styles.humidity}>{post.weather.humidity}%</Text>
        </View>
      </View>

      <View style={styles.moodSection}>
        <View style={[styles.moodBadge, { backgroundColor: moodData?.color + "20" }]}>
          <Text style={[styles.moodText, { color: moodData?.color }]}>{moodData?.label}</Text>
        </View>
      </View>

      <Text style={styles.comment}>{post.comment}</Text>
    </View>
  )
}

function getTimeAgo(timestamp: string): string {
  const now = new Date()
  const postTime = new Date(timestamp)
  const diffInMinutes = Math.floor((now.getTime() - postTime.getTime()) / (1000 * 60))

  if (diffInMinutes < 1) return "À l'instant"
  if (diffInMinutes < 60) return `Il y a ${diffInMinutes}min`

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `Il y a ${diffInHours}h`

  const diffInDays = Math.floor(diffInHours / 24)
  return `Il y a ${diffInDays}j`
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  locationInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  city: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D1D1F",
  },
  timestamp: {
    fontSize: 12,
    color: "#8E8E93",
  },
  weatherSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    padding: 12,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
  },
  weatherInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  temperature: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
  },
  weatherDescription: {
    fontSize: 14,
    color: "#1D1D1F",
    textTransform: "capitalize",
  },
  humidityInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  humidity: {
    fontSize: 14,
    color: "#007AFF",
  },
  moodSection: {
    marginBottom: 12,
  },
  moodBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  moodText: {
    fontSize: 14,
    fontWeight: "500",
  },
  comment: {
    fontSize: 16,
    lineHeight: 22,
    color: "#1D1D1F",
  },
})
