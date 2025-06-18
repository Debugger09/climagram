import EmptyState from "@/components/EmptyState"
import PostCard from "@/components/PostCard"
import { useUserPosts } from "@/hooks/usePosts"
import { FlatList, RefreshControl, StyleSheet, View } from "react-native"

export default function ProfileScreen() {
  const { userPosts, loading, refreshUserPosts } = useUserPosts()

  return (
    <View style={styles.container}>
      <FlatList
        data={userPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} showAuthor={false} />}
        contentContainerStyle={userPosts.length === 0 ? styles.emptyContainer : styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refreshUserPosts} />}
        ListEmptyComponent={<EmptyState message="Vous n'avez pas encore publié" />}
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
