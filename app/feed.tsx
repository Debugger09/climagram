"use client"

import EmptyState from "@/components/EmptyState"
import PostCard from "@/components/PostCard"
import { mockPosts } from "@/data/mockPosts"
import { usePosts } from "@/hooks/usePosts"
import { savePosts } from "@/lib/storage"
import { useEffect } from "react"
import { FlatList, RefreshControl, StyleSheet, View } from "react-native"

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
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
        contentContainerStyle={posts.length === 0 ? styles.emptyContainer : styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refreshPosts} />}
        ListEmptyComponent={<EmptyState message="Aucune publication pour le moment" />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  listContainer: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    padding: 16,
  },
})
