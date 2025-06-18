"use client"

import EmptyState from "@/components/EmptyState"
import PostCard from "@/components/PostCard"
import { useUserPosts } from "@/hooks/usePosts"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { FlatList, RefreshControl, StatusBar, StyleSheet, Text, View } from "react-native"

export default function ProfileScreen() {
  const { userPosts, loading, refreshUserPosts } = useUserPosts()

  return (
    <LinearGradient
      colors={["#1e3c72", "#2a5298"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar barStyle="light-content" backgroundColor="#1e3c72" />

      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={40} color="#FFFFFF" />
        </View>
        <Text style={styles.username}>Mon Profil</Text>
        <Text style={styles.statsText}>{userPosts.length} publications</Text>
      </View>

      <View style={styles.content}>
        <FlatList
          data={userPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PostCard post={item} showAuthor={false} />}
          contentContainerStyle={userPosts.length === 0 ? styles.emptyContainer : styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={refreshUserPosts} tintColor="#fff" />}
          ListEmptyComponent={<EmptyState message="Vous n'avez pas encore publié" icon="person" />}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        />
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  statsText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  content: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  listContainer: {
    padding: 16,
    paddingTop: 16,
  },
  emptyContainer: {
    flex: 1,
    padding: 16,
  },
})
