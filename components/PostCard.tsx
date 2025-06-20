import type { Post } from "@/types";
import React from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";

const getMoodEmoji = (mood: Post["mood"]) => {
  switch (mood) {
    case "heureux":
      return "😊";
    case "fatigué":
      return "😴";
    case "apathique":
      return "😐";
    case "énergique":
      return "⚡";
    default:
      return "";
  }
};

export const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const date = new Date(post.timestamp);
  const formattedDate = date.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: post.image || 'https://picsum.photos/400/400?blur=2&grayscale' }}
        style={styles.postImage}
      />
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={{ uri: post.avatar || 'https://i.pravatar.cc/150?img=1' }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.city}>{post.city}</Text>
            <Text style={styles.username}>{post.username}</Text>
          </View>
        </View>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
      <View style={styles.weatherRow}>
        <Image
          source={{ uri: `https://openweathermap.org/img/wn/${post.weather.icon}@2x.png` }}
          style={{ width: 32, height: 32, marginRight: 8 }}
        />
        <Text style={styles.temp}>{Math.round(post.weather.temp)}°C</Text>
        <Text style={styles.weatherDesc}>{post.weather.description}</Text>
      </View>
      <View style={styles.moodRow}>
        <Text style={styles.moodEmoji}>{getMoodEmoji(post.mood)}</Text>
        <Text style={styles.moodText}>{post.mood}</Text>
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
    ...(Platform.OS === 'web'
      ? { boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }
      : {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
          elevation: 5,
        }),
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  city: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e3c72",
  },
  date: {
    fontSize: 13,
    color: "#666",
  },
  weatherRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  temp: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2a5298",
    marginRight: 8,
  },
  weatherDesc: {
    fontSize: 15,
    color: "#666",
    textTransform: "capitalize",
  },
  moodRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  moodEmoji: {
    fontSize: 18,
    marginRight: 5,
  },
  moodText: {
    fontSize: 15,
    color: "#333",
    textTransform: "capitalize",
  },
  comment: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    backgroundColor: '#eee',
  },
  username: {
    fontSize: 13,
    color: '#444',
  },
});
