import type { Post } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@climagram_posts';

export const savePosts = async (posts: Post[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error('Error saving posts:', error);
  }
};

export const loadPosts = async (): Promise<Post[]> => {
  try {
    const posts = await AsyncStorage.getItem(STORAGE_KEY);
    return posts ? JSON.parse(posts) : [];
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
}; 