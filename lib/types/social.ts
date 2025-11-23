export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  followers: number;
  following: number;
  verified?: boolean;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: Date;
  liked?: boolean;
  bookmarked?: boolean;
}

export interface Trend {
  id: string;
  topic: string;
  category: string;
  posts: number;
}

export interface CreatePostData {
  content: string;
  image?: File | null;
}
