import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Post } from "../types";

const getMoodEmoji = (mood: Post["mood"]) => {
  switch (mood) {
    case "heureux":
      return "😊";
    case "triste":
      return "😢";
    case "energique":
      return "⚡";
    case "fatigue":
      return "😴";
    default:
      return "😐";
  }
};

const getMoodColor = (mood: Post["mood"]) => {
  switch (mood) {
    case "heureux":
      return "#FFD700";
    case "triste":
      return "#87CEEB";
    case "energique":
      return "#FF4500";
    case "fatigue":
      return "#9370DB";
    default:
      return "#A9A9A9";
  }
};

const getWeatherIcon = (icon: string) => {
  const iconMap: { [key: string]: string } = {
    "01d": "sunny",
    "01n": "moon",
    "02d": "partly-sunny",
    "02n": "cloudy-night",
    "03d": "cloudy",
    "03n": "cloudy",
    "04d": "cloudy",
    "04n": "cloudy",
    "09d": "rainy",
    "09n": "rainy",
    "10d": "rainy",
    "10n": "rainy",
    "11d": "thunderstorm",
    "11n": "thunderstorm",
    "13d": "snow",
    "13n": "snow",
    "50d": "water",
    "50n": "water",
  };
  return iconMap[icon] || "partly-sunny";
};

export const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const formattedDate = format(new Date(post.timestamp), "d MMMM yyyy", {
    locale: fr,
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={20} color="#666" />
          <Text style={styles.location}>{post.city}</Text>
        </View>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>

      <View style={styles.weatherContainer}>
        <View style={styles.weatherInfo}>
          <Ionicons
            name={getWeatherIcon(post.weather.icon)}
            size={40}
            color="#666"
          />
          <View>
            <Text style={styles.temperature}>
              {Math.round(post.weather.temp)}°C
            </Text>
            <Text style={styles.description}>
              {post.weather.description}
            </Text>
          </View>
        </View>
        <View style={styles.weatherDetails}>
          <View style={styles.detail}>
            <Ionicons name="water" size={16} color="#666" />
            <Text style={styles.detailText}>
              {post.weather.humidity}%
            </Text>
          </View>
          <View style={styles.detail}>
            <Ionicons name="speedometer" size={16} color="#666" />
            <Text style={styles.detailText}>
              {post.weather.pressure} hPa
            </Text>
          </View>
          <View style={styles.detail}>
            <Ionicons name="cloud" size={16} color="#666" />
            <Text style={styles.detailText}>
              {post.weather.clouds}%
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.moodContainer}>
        <View
          style={[
            styles.moodBadge,
            { backgroundColor: getMoodColor(post.mood) },
          ]}
        >
          <Text style={styles.moodEmoji}>{getMoodEmoji(post.mood)}</Text>
          <Text style={styles.moodText}>{post.mood}</Text>
        </View>
      </View>

      <Text style={styles.comment}>{post.comment}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 5,
    color: "#333",
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  weatherContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  weatherInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  temperature: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginLeft: 10,
    textTransform: "capitalize",
  },
  weatherDetails: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    marginLeft: 5,
    color: "#666",
    fontSize: 14,
  },
  moodContainer: {
    marginBottom: 15,
  },
  moodBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  moodEmoji: {
    fontSize: 18,
    marginRight: 5,
  },
  moodText: {
    color: "white",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  comment: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
});
