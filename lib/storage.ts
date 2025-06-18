import type { Post } from "@/types";
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@climagram_posts';

// Simulation du stockage local (en production, utiliser AsyncStorage)
let posts: Post[] = []

export const savePosts = async (newPosts: Post[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newPosts));
  } catch (error) {
    console.error('Error saving posts:', error);
  }
}

export const loadPosts = async (): Promise<Post[]> => {
  try {
    const posts = await AsyncStorage.getItem(STORAGE_KEY);
    return posts ? JSON.parse(posts) : [];
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
}

export const getPosts = (): Post[] => {
  return posts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

export const addPost = (post: Post) => {
  posts.unshift(post)
}

export const getUserPosts = (): Post[] => {
  // En production, filtrer par userId
  return posts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}
