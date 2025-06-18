import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { addComment, getPosts, likePost, Post } from '../../lib/mockData';

export default function FeedScreen() {
  const { user } = useAuth();
  const posts = getPosts();
  const [commentText, setCommentText] = useState('');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const handleLike = (postId: string) => {
    likePost(postId);
  };

  const handleAddComment = (postId: string) => {
    if (!commentText.trim()) return;

    addComment(postId, {
      userId: user?.id || '1',
      text: commentText.trim(),
    });

    setCommentText('');
    setSelectedPostId(null);
  };

  const renderPost = ({ item: post }: { item: Post }) => (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <Image
          source={{ uri: post.userId === '1' ? 'https://i.pravatar.cc/150?img=1' : 'https://i.pravatar.cc/150?img=2' }}
          style={styles.avatar}
        />
        <View style={styles.postInfo}>
          <Text style={styles.username}>{post.userId === '1' ? 'john_doe' : 'jane_smith'}</Text>
          <Text style={styles.location}>{post.location}</Text>
        </View>
        <View style={styles.weather}>
          <Text style={styles.weatherIcon}>{post.weather.icon}</Text>
          <Text style={styles.temperature}>{post.weather.temperature}°C</Text>
        </View>
      </View>

      <Image source={{ uri: post.image }} style={styles.postImage} />

      <View style={styles.postActions}>
        <TouchableOpacity onPress={() => handleLike(post.id)}>
          <Text style={styles.actionButton}>❤️ {post.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedPostId(post.id)}>
          <Text style={styles.actionButton}>💬 {post.comments.length}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.postCaption}>
        <Text style={styles.captionText}>
          <Text style={styles.username}>{post.userId === '1' ? 'john_doe' : 'jane_smith'}</Text> {post.caption}
        </Text>
      </View>

      {post.comments.length > 0 && (
        <View style={styles.comments}>
          {post.comments.map(comment => (
            <Text key={comment.id} style={styles.comment}>
              <Text style={styles.username}>{comment.userId === '1' ? 'john_doe' : 'jane_smith'}</Text> {comment.text}
            </Text>
          ))}
        </View>
      )}

      {selectedPostId === post.id && (
        <View style={styles.commentInput}>
          <TextInput
            style={styles.input}
            placeholder="Add a comment..."
            value={commentText}
            onChangeText={setCommentText}
            onSubmitEditing={() => handleAddComment(post.id)}
          />
          <TouchableOpacity 
            style={styles.commentButton}
            onPress={() => handleAddComment(post.id)}
          >
            <Text style={styles.commentButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={post => post.id}
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
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  postInfo: {
    marginLeft: 10,
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  location: {
    fontSize: 12,
    color: '#666',
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
  postImage: {
    width: '100%',
    height: 400,
  },
  postActions: {
    flexDirection: 'row',
    padding: 10,
  },
  actionButton: {
    marginRight: 20,
    fontSize: 16,
  },
  postCaption: {
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  captionText: {
    fontSize: 14,
  },
  comments: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  comment: {
    fontSize: 14,
    marginBottom: 5,
  },
  commentInput: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    fontSize: 14,
  },
  commentButton: {
    justifyContent: 'center',
  },
  commentButtonText: {
    color: '#1a73e8',
    fontWeight: 'bold',
  },
}); 