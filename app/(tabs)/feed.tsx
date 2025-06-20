import { PostCard } from '@/components/PostCard';
import type { Post } from '@/types';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { cities } from '../../constants/cities';
import { useAuth } from '../../hooks/useAuth';
import { getPosts } from '../../lib/mockData';

export default function FeedScreen() {
  const { user } = useAuth();
  const posts = getPosts();
  const [commentText, setCommentText] = useState('');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [postsState, setPostsState] = useState<Post[]>(posts);

  const moodOptions = [
    { value: '', label: 'Toutes les humeurs' },
    { value: 'heureux', label: 'Heureux' },
    { value: 'fatigué', label: 'Fatigué' },
    { value: 'apathique', label: 'Apathique' },
    { value: 'énergique', label: 'Énergique' },
  ];

  const filteredPosts = posts.filter(post => {
    const cityMatch = !selectedCity || post.city === selectedCity;
    const moodMatch = !selectedMood || post.mood === selectedMood;
    return cityMatch && moodMatch;
  });

  const handleLike = (postId: string) => {
    setPostsState(prevPosts => prevPosts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleAddComment = (postId: string) => {
    if (!commentText.trim()) return;
    setPostsState(prevPosts => prevPosts.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: [
              ...post.comments,
              {
                id: Math.random().toString(36).substr(2, 9),
                userId: '1', // utilisateur courant mocké
                content: commentText.trim(),
                createdAt: new Date().toISOString(),
              },
            ],
          }
        : post
    ));
    setCommentText('');
    setSelectedPostId(null);
  };

  const renderPost = ({ item: post }: { item: Post }) => {
    return (
      <View style={styles.post}>
        <PostCard post={post} />
        <View style={styles.likesRow}>
          <TouchableOpacity onPress={() => handleLike(post.id)}>
            <Text style={styles.likeButton}>❤️ {post.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedPostId(post.id)}>
            <Text style={styles.commentIcon}>💬 {post.comments.length}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.commentsSection}>
          {selectedPostId === post.id && (
            <>
              {post.comments.map(comment => (
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
                  onSubmitEditing={() => handleAddComment(post.id)}
                />
                <TouchableOpacity style={styles.commentButton} onPress={() => handleAddComment(post.id)}>
                  <Text style={styles.commentButtonText}>Envoyer</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          <TouchableOpacity onPress={() => setSelectedPostId(post.id)}>
            <Text style={styles.addCommentLink}>Ajouter un commentaire</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ padding: 10, backgroundColor: '#f5f5f5', flexDirection: 'row', gap: 10 }}>
        <View style={{ flex: 1, marginRight: 5 }}>
          <Picker
            selectedValue={selectedCity}
            onValueChange={setSelectedCity}
            style={{ backgroundColor: '#fff', borderRadius: 8 }}
          >
            <Picker.Item label="Toutes les villes" value="" />
            {cities.map(city => (
              <Picker.Item key={city.name} label={city.name} value={city.name} />
            ))}
          </Picker>
        </View>
        <View style={{ flex: 1, marginLeft: 5 }}>
          <Picker
            selectedValue={selectedMood}
            onValueChange={setSelectedMood}
            style={{ backgroundColor: '#fff', borderRadius: 8 }}
          >
            {moodOptions.map(option => (
              <Picker.Item key={option.value} label={option.label} value={option.value} />
            ))}
          </Picker>
        </View>
      </View>
      <FlatList
        data={filteredPosts}
        renderItem={renderPost}
        keyExtractor={(post: Post) => post.id}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  post: {
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#1e3c72',
    marginBottom: 2,
  },
  city: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  postImage: {
    width: '100%',
    height: 400,
  },
  weather: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherIcon: {
    fontSize: 20,
    marginRight: 5,
  },
  temperature: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  weatherDesc: {
    fontSize: 12,
    color: '#666',
  },
  moodRow: {
    padding: 10,
  },
  moodEmoji: {
    fontSize: 20,
  },
  comment: {
    padding: 10,
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
}); 