"use client"

import { getPosts, getUserPosts, addPost as savePost } from "@/lib/storage"
import type { Post } from "@/types"
import { useEffect, useState } from "react"

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPosts = () => {
      const allPosts = getPosts()
      setPosts(allPosts)
      setLoading(false)
    }

    loadPosts()
  }, [])

  const addPost = (post: Post) => {
    savePost(post)
    setPosts(getPosts())
  }

  const refreshPosts = () => {
    setPosts(getPosts())
  }

  return { posts, loading, addPost, refreshPosts }
}

export const useUserPosts = () => {
  const [userPosts, setUserPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUserPosts = () => {
      const posts = getUserPosts()
      setUserPosts(posts)
      setLoading(false)
    }

    loadUserPosts()
  }, [])

  const refreshUserPosts = () => {
    setUserPosts(getUserPosts())
  }

  return { userPosts, loading, refreshUserPosts }
}
