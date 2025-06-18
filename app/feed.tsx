"use client"

import EmptyState from "@/components/EmptyState"
import PostCard from "@/components/PostCard"
import { mockPosts } from "@/data/mockPosts"
import { savePosts, usePosts } from "@/hooks/usePosts"
import { LinearGradient } from "expo-linear-gradient"
import { useEffect } from "react"
import { FlatList, RefreshControl, StatusBar, StyleSheet, View } from "react-native"

export default function FeedScreen() {
  const { posts, loading, refreshPosts } = usePosts()

  useEffect(() => {
    // Initialiser avec des posts mockés si aucun post n'existe
    if (posts.length === 0) {
      savePosts(mockPosts)
      refreshPosts()
    }
  }, [])

  return (
    <LinearGradient
      colors={["#1e3c72", "#2a5298"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar barStyle="light-content" backgroundColor="#1e3c72" />
      <View style={styles.content}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PostCard post={item} />}
          contentContainerStyle={posts.length === 0 ? styles.emptyContainer : styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={refreshPosts} tintColor="#fff" />}
          ListEmptyComponent={<EmptyState message="Aucune publication pour le moment" icon="newspaper" />}
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
