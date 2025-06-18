export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

export interface Post {
  id: string;
  userId: string;
  image: string;
  caption: string;
  location: string;
  weather: {
    temperature: number;
    condition: string;
    icon: string;
  };
  likes: number;
  comments: Comment[];
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
}

// Données simulées
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'john_doe',
    email: 'john@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: '2',
    username: 'jane_smith',
    email: 'jane@example.com',
    avatar: 'https://i.pravatar.cc/150?img=2'
  }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    image: 'https://picsum.photos/400/400',
    caption: 'Beautiful sunny day in Paris! ☀️',
    location: 'Paris, France',
    weather: {
      temperature: 25,
      condition: 'Sunny',
      icon: '☀️'
    },
    likes: 42,
    comments: [
      {
        id: '1',
        userId: '2',
        text: 'Looks amazing!',
        createdAt: '2024-03-20T10:00:00Z'
      }
    ],
    createdAt: '2024-03-20T09:00:00Z'
  },
  {
    id: '2',
    userId: '2',
    image: 'https://picsum.photos/400/401',
    caption: 'Rainy day in London 🌧️',
    location: 'London, UK',
    weather: {
      temperature: 15,
      condition: 'Rainy',
      icon: '🌧️'
    },
    likes: 28,
    comments: [],
    createdAt: '2024-03-20T11:00:00Z'
  }
];

// Fonctions pour simuler les opérations CRUD
export const getCurrentUser = (): User | null => {
  // Simuler un utilisateur connecté
  return mockUsers[0];
};

export const getPosts = (): Post[] => {
  return mockPosts;
};

export const createPost = (post: Omit<Post, 'id' | 'createdAt'>): Post => {
  const newPost: Post = {
    ...post,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString()
  };
  mockPosts.unshift(newPost);
  return newPost;
};

export const likePost = (postId: string): void => {
  const post = mockPosts.find(p => p.id === postId);
  if (post) {
    post.likes++;
  }
};

export const addComment = (postId: string, comment: Omit<Comment, 'id' | 'createdAt'>): void => {
  const post = mockPosts.find(p => p.id === postId);
  if (post) {
    post.comments.push({
      ...comment,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    });
  }
}; 