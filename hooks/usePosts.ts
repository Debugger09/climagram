"use client"

import type { Post } from "@/types/post"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useCallback, useEffect, useState } from "react"

const POSTS_STORAGE_KEY = "climagram_posts"

export async function savePosts(posts: Post[]) {
  try {
    await AsyncStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts))
  } catch (error) {
    console.error("Error saving posts:", error)
  }
}

export async function loadPosts(): Promise<Post[]> {
  try {
    const postsJson = await AsyncStorage.getItem(POSTS_STORAGE_KEY)
    return postsJson ? JSON.parse(postsJson) : []
  } catch (error) {
    console.error("Error loading posts:", error)
    return []
  }
}

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  const refreshPosts = useCallback(async () => {
    setLoading(true)
    try {
      const loadedPosts = await loadPosts()
      setPosts(loadedPosts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()))
    } catch (error) {
      console.error("Error refreshing posts:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  const addPost = useCallback(
    async (post: Post) => {
      const updatedPosts = [post, ...posts]
      setPosts(updatedPosts)
      await savePosts(updatedPosts)
    },
    [posts],
  )

  useEffect(() => {
    refreshPosts()
  }, [refreshPosts])

  return { posts, loading, refreshPosts, addPost }
}

export function useUserPosts() {
  const { posts, loading, refreshPosts } = usePosts()

  // Dans une vraie app, on filtrerait par l'ID de l'utilisateur connecté
  // Ici on simule que tous les posts sont de l'utilisateur actuel
  const userPosts = posts

  const refreshUserPosts = useCallback(() => {
    refreshPosts()
  }, [refreshPosts])

  return { userPosts, loading, refreshUserPosts }
}
