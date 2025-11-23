import { User, Post, Trend } from "@/lib/types/social";

// Current user (local profile)
export const currentUser: User = {
  id: "current-user",
  name: "Marco Rossi",
  username: "@marcorossi",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marco",
  bio: "Designer & Developer | Creating beautiful interfaces",
  followers: 1234,
  following: 567,
  verified: true,
};

// Mock users
const users: User[] = [
  {
    id: "1",
    name: "Sofia Bianchi",
    username: "@sofiabianchi",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
    followers: 5432,
    following: 234,
    verified: true,
  },
  {
    id: "2",
    name: "Luca Ferrari",
    username: "@lucaferrari",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luca",
    followers: 987,
    following: 456,
  },
  {
    id: "3",
    name: "Giulia Romano",
    username: "@giuliaromano",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Giulia",
    followers: 3210,
    following: 890,
    verified: true,
  },
  {
    id: "4",
    name: "Alessandro Conti",
    username: "@alexconti",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alessandro",
    followers: 1543,
    following: 321,
  },
  {
    id: "5",
    name: "Francesca Ricci",
    username: "@francescaricci",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Francesca",
    followers: 8765,
    following: 234,
    verified: true,
  },
];

// Mock posts
export const mockPosts: Post[] = [
  {
    id: "1",
    author: users[0],
    content:
      "Just launched my new portfolio website! 🚀 Check it out and let me know what you think. Built with Next.js and Framer Motion for smooth animations.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
    likes: 234,
    comments: 45,
    shares: 12,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    liked: false,
    bookmarked: false,
  },
  {
    id: "2",
    author: users[1],
    content:
      "Working on a new design system inspired by Behance and Dribbble. Loving the soft gradients and outline icons approach! What's your favorite design trend right now?",
    likes: 156,
    comments: 23,
    shares: 8,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    liked: true,
    bookmarked: false,
  },
  {
    id: "3",
    author: users[2],
    content:
      "The future of web design is here! 🎨 Experimenting with new animation patterns and micro-interactions. Details matter.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    likes: 789,
    comments: 98,
    shares: 45,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    liked: true,
    bookmarked: true,
  },
  {
    id: "4",
    author: users[3],
    content:
      "Hot take: Tailwind CSS has changed the way we write styles forever. No going back to traditional CSS for me! What about you?",
    likes: 432,
    comments: 87,
    shares: 23,
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    liked: false,
    bookmarked: true,
  },
  {
    id: "5",
    author: users[4],
    content:
      "New UI component library just dropped! 📦 Built with React, TypeScript, and shadcn/ui. Clean, accessible, and customizable. Link in bio!",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
    likes: 1023,
    comments: 156,
    shares: 67,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    liked: true,
    bookmarked: false,
  },
  {
    id: "6",
    author: users[0],
    content:
      "Reminder: Good design is invisible. Great design is felt. Amazing design is remembered. Keep pushing boundaries! 💪",
    likes: 567,
    comments: 34,
    shares: 19,
    timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000), // 1.5 days ago
    liked: false,
    bookmarked: false,
  },
];

// Mock trends
export const mockTrends: Trend[] = [
  {
    id: "1",
    topic: "#WebDesign",
    category: "Design",
    posts: 12500,
  },
  {
    id: "2",
    topic: "#NextJS",
    category: "Development",
    posts: 8934,
  },
  {
    id: "3",
    topic: "#UIUXDesign",
    category: "Design",
    posts: 15678,
  },
  {
    id: "4",
    topic: "#ReactJS",
    category: "Development",
    posts: 23456,
  },
  {
    id: "5",
    topic: "#TailwindCSS",
    category: "Development",
    posts: 6789,
  },
  {
    id: "6",
    topic: "#FigmaDesign",
    category: "Design",
    posts: 9876,
  },
  {
    id: "7",
    topic: "#TypeScript",
    category: "Development",
    posts: 11234,
  },
];

// Helper function to format timestamp
export function formatTimestamp(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return `${seconds}s`;
  }
}

// Helper function to format number
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}
