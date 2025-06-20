"use client"

import EmptyState from "@/components/EmptyState"
import { PostCard } from "@/components/PostCard"
import { useAuth } from "@/hooks/useAuth"
import { useUserPosts } from "@/hooks/usePosts"
import type { Post } from '@/types'
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"
import React, { useEffect, useState } from 'react'
import { FlatList, Image, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

export default function ProfileScreen() {
  const { userPosts, loading, refreshUserPosts } = useUserPosts()
  const { signOut, user } = useAuth()
  const [commentText, setCommentText] = useState('')
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null)
  const [postsState, setPostsState] = useState<Post[]>(userPosts)

  // Synchronise postsState avec userPosts quand userPosts change
  useEffect(() => {
    setPostsState(userPosts)
  }, [userPosts])

  const handleLogout = async () => {
    await signOut()
    router.replace("/login")
  }

  const handleLike = (postId: string) => {
    setPostsState(prevPosts => prevPosts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ))
  }

  const handleAddComment = (postId: string) => {
    if (!commentText.trim()) return
    setPostsState(prevPosts => prevPosts.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: [
              ...post.comments,
              {
                id: Math.random().toString(36).substr(2, 9),
                userId: '1',
                content: commentText.trim(),
                createdAt: new Date().toISOString(),
              },
            ],
          }
        : post
    ))
    setCommentText('')
    setSelectedPostId(null)
  }

  const renderPost = ({ item: post }: { item: Post }) => {
    // Sécurise les propriétés pour éviter les undefined
    const safePost = {
      ...post,
      likes: typeof post.likes === 'number' ? post.likes : 0,
      comments: Array.isArray(post.comments) ? post.comments : [],
      avatar: user?.avatar || 'https://i.pravatar.cc/150?img=11',
    }
    return (
      <View style={styles.post}>
        <PostCard post={safePost} />
        <View style={styles.likesRow}>
          <TouchableOpacity onPress={() => handleLike(safePost.id)}>
            <Text style={styles.likeButton}>❤️ {safePost.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedPostId(safePost.id)}>
            <Text style={styles.commentIcon}>💬 {safePost.comments.length}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.commentsSection}>
          {selectedPostId === safePost.id && (
            <>
              {safePost.comments.map((comment: any) => (
                <Text key={comment.id} style={styles.commentLine}>
                  <Text style={styles.commentAuthor}>{comment.userId === '1' ? 'Moi' : 'Autre'}: </Text>
                  {comment.content}
                </Text>
              ))}
              <View style={styles.commentInputRow}>
                <TextInput
                  style={styles.input}
                  placeholder="Ajouter un commentaire..."
                  value={commentText}
                  onChangeText={setCommentText}
                  onSubmitEditing={() => handleAddComment(safePost.id)}
                />
                <TouchableOpacity style={styles.commentButton} onPress={() => handleAddComment(safePost.id)}>
                  <Text style={styles.commentButtonText}>Envoyer</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
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
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.profileHeader}>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/150?img=11' }}
                style={styles.avatarContainerSmall}
              />
              <Text style={styles.username}>Kuito Ouandji Ange Lugresse</Text>
            </View>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutIconButtonSmall}>
              <Ionicons name="log-out-outline" size={22} color="rgba(255,255,255,0.85)" />
            </TouchableOpacity>
          </View>
          <Text style={styles.statsText}>{userPosts.length} publications</Text>
        </View>
        <View style={styles.content}>
          <FlatList
            data={postsState}
            keyExtractor={(item) => item.id}
            renderItem={renderPost}
            contentContainerStyle={userPosts.length === 0 ? styles.emptyContainer : styles.listContainer}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={loading} onRefresh={refreshUserPosts} tintColor="#fff" />}
            ListEmptyComponent={<EmptyState message="Vous n'avez pas encore publié" icon="person" />}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          />
        </View>
      </ScrollView>
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
  avatarContainerSmall: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.10)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logoutIconButtonSmall: {
    padding: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.10)',
    marginLeft: 8,
  },
  post: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  likesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 4,
  },
  likeButton: {
    fontSize: 16,
    color: '#e74c3c',
    marginRight: 12,
  },
  commentsSection: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  commentLine: {
    fontSize: 13,
    color: '#333',
    marginBottom: 2,
  },
  commentAuthor: {
    fontWeight: 'bold',
    color: '#1e3c72',
  },
  commentInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 6,
  },
  addCommentLink: {
    color: '#1a73e8',
    fontSize: 13,
    marginTop: 4,
  },
  commentButton: {
    marginLeft: 8,
    backgroundColor: '#1a73e8',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  commentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 14,
  },
  commentIcon: {
    fontSize: 16,
    color: '#1a73e8',
    marginLeft: 12,
  },
})
