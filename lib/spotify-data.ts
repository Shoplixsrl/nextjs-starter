// Mock data for Spotify Clone

export interface Artist {
  id: string;
  name: string;
  image: string;
  followers: number;
  monthlyListeners: number;
  verified: boolean;
  genres: string[];
  bio: string;
}

export interface Album {
  id: string;
  title: string;
  artist: Artist;
  artistId: string;
  image: string;
  releaseDate: string;
  type: 'album' | 'single' | 'ep';
  totalTracks: number;
  duration: string;
  color: string;
}

export interface Track {
  id: string;
  title: string;
  artist: Artist;
  artistId: string;
  album: Album;
  albumId: string;
  duration: string;
  durationMs: number;
  plays: number;
  explicit: boolean;
  image: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  image: string;
  owner: string;
  followers: number;
  totalTracks: number;
  duration: string;
  tracks: Track[];
  color: string;
  isPublic: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  color: string;
}

// Artists
export const artists: Artist[] = [
  {
    id: 'artist-1',
    name: 'The Weeknd',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    followers: 85420000,
    monthlyListeners: 92500000,
    verified: true,
    genres: ['R&B', 'Pop', 'Alternative'],
    bio: 'Abel Makkonen Tesfaye, known professionally as The Weeknd, is a Canadian singer, songwriter, and record producer.'
  },
  {
    id: 'artist-2',
    name: 'Dua Lipa',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    followers: 65300000,
    monthlyListeners: 78200000,
    verified: true,
    genres: ['Pop', 'Dance', 'Electronic'],
    bio: 'Dua Lipa is a British-Albanian singer and songwriter. Her mezzo-soprano vocal range and disco-influenced production have received critical acclaim.'
  },
  {
    id: 'artist-3',
    name: 'Drake',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    followers: 79800000,
    monthlyListeners: 88100000,
    verified: true,
    genres: ['Hip-Hop', 'Rap', 'R&B'],
    bio: 'Aubrey Drake Graham is a Canadian rapper, singer, and songwriter. Drake initially gained recognition as an actor on the teen drama series Degrassi.'
  },
  {
    id: 'artist-4',
    name: 'Billie Eilish',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    followers: 72100000,
    monthlyListeners: 85600000,
    verified: true,
    genres: ['Pop', 'Electropop', 'Alternative'],
    bio: 'Billie Eilish Pirate Baird OConnell is an American singer and songwriter. She first gained public attention in 2015 with her debut single Ocean Eyes.'
  },
  {
    id: 'artist-5',
    name: 'Ed Sheeran',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    followers: 92500000,
    monthlyListeners: 98700000,
    verified: true,
    genres: ['Pop', 'Folk', 'Acoustic'],
    bio: 'Edward Christopher Sheeran MBE is an English singer-songwriter. Born in Halifax, West Yorkshire and raised in Framlingham, Suffolk.'
  },
  {
    id: 'artist-6',
    name: 'Taylor Swift',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    followers: 95200000,
    monthlyListeners: 102300000,
    verified: true,
    genres: ['Pop', 'Country', 'Folk'],
    bio: 'Taylor Alison Swift is an American singer-songwriter. Her narrative songwriting, which often centers around her personal life, has received widespread critical praise.'
  },
  {
    id: 'artist-7',
    name: 'Bad Bunny',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    followers: 68900000,
    monthlyListeners: 89400000,
    verified: true,
    genres: ['Reggaeton', 'Latin Trap', 'Latin Pop'],
    bio: 'Benito Antonio Martinez Ocasio, known by his stage name Bad Bunny, is a Puerto Rican rapper and singer.'
  },
  {
    id: 'artist-8',
    name: 'Arctic Monkeys',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
    followers: 32500000,
    monthlyListeners: 45600000,
    verified: true,
    genres: ['Indie Rock', 'Alternative', 'Rock'],
    bio: 'Arctic Monkeys are an English rock band formed in Sheffield in 2002. The group consists of Alex Turner, Jamie Cook, Matt Helders, and Nick OMalley.'
  },
  {
    id: 'artist-9',
    name: 'Kendrick Lamar',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    followers: 42800000,
    monthlyListeners: 56700000,
    verified: true,
    genres: ['Hip-Hop', 'Rap', 'Conscious Hip-Hop'],
    bio: 'Kendrick Lamar Duckworth is an American rapper, songwriter, and record producer. He is often cited as one of the greatest rappers of all time.'
  },
  {
    id: 'artist-10',
    name: 'Doja Cat',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop',
    followers: 58600000,
    monthlyListeners: 72400000,
    verified: true,
    genres: ['Pop', 'Hip-Hop', 'R&B'],
    bio: 'Amala Ratna Zandile Dlamini, known professionally as Doja Cat, is an American rapper, singer, and songwriter.'
  }
];

// Albums
export const albums: Album[] = [
  {
    id: 'album-1',
    title: 'After Hours',
    artist: artists[0],
    artistId: 'artist-1',
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop',
    releaseDate: '2020-03-20',
    type: 'album',
    totalTracks: 14,
    duration: '56:16',
    color: '#e8115b'
  },
  {
    id: 'album-2',
    title: 'Future Nostalgia',
    artist: artists[1],
    artistId: 'artist-2',
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop',
    releaseDate: '2020-03-27',
    type: 'album',
    totalTracks: 11,
    duration: '37:17',
    color: '#e91429'
  },
  {
    id: 'album-3',
    title: 'Certified Lover Boy',
    artist: artists[2],
    artistId: 'artist-3',
    image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=400&h=400&fit=crop',
    releaseDate: '2021-09-03',
    type: 'album',
    totalTracks: 21,
    duration: '1:26:00',
    color: '#1e3264'
  },
  {
    id: 'album-4',
    title: 'Happier Than Ever',
    artist: artists[3],
    artistId: 'artist-4',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
    releaseDate: '2021-07-30',
    type: 'album',
    totalTracks: 16,
    duration: '56:31',
    color: '#608108'
  },
  {
    id: 'album-5',
    title: '= (Equals)',
    artist: artists[4],
    artistId: 'artist-5',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop',
    releaseDate: '2021-10-29',
    type: 'album',
    totalTracks: 14,
    duration: '51:47',
    color: '#ba5d07'
  },
  {
    id: 'album-6',
    title: 'Midnights',
    artist: artists[5],
    artistId: 'artist-6',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop',
    releaseDate: '2022-10-21',
    type: 'album',
    totalTracks: 13,
    duration: '44:02',
    color: '#477d95'
  },
  {
    id: 'album-7',
    title: 'Un Verano Sin Ti',
    artist: artists[6],
    artistId: 'artist-7',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    releaseDate: '2022-05-06',
    type: 'album',
    totalTracks: 23,
    duration: '1:22:14',
    color: '#dc148c'
  },
  {
    id: 'album-8',
    title: 'AM',
    artist: artists[7],
    artistId: 'artist-8',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    releaseDate: '2013-09-06',
    type: 'album',
    totalTracks: 12,
    duration: '41:23',
    color: '#1e3264'
  },
  {
    id: 'album-9',
    title: 'Mr. Morale & The Big Steppers',
    artist: artists[8],
    artistId: 'artist-9',
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop',
    releaseDate: '2022-05-13',
    type: 'album',
    totalTracks: 18,
    duration: '1:13:37',
    color: '#8c1932'
  },
  {
    id: 'album-10',
    title: 'Planet Her',
    artist: artists[9],
    artistId: 'artist-10',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop',
    releaseDate: '2021-06-25',
    type: 'album',
    totalTracks: 14,
    duration: '44:22',
    color: '#7358ff'
  }
];

// Helper function to generate tracks
function generateTracks(): Track[] {
  const trackNames = [
    'Blinding Lights', 'Save Your Tears', 'Starboy', 'The Hills', 'Call Out My Name',
    'Levitating', 'Dont Start Now', 'Physical', 'Break My Heart', 'New Rules',
    'God\'s Plan', 'Hotline Bling', 'One Dance', 'Passionfruit', 'Nice For What',
    'Bad Guy', 'Therefore I Am', 'Lovely', 'Ocean Eyes', 'Bury a Friend',
    'Shape of You', 'Perfect', 'Thinking Out Loud', 'Photograph', 'Castle on the Hill',
    'Anti-Hero', 'Shake It Off', 'Blank Space', 'Love Story', 'All Too Well',
    'Titi Me Pregunto', 'Me Porto Bonito', 'Ojitos Lindos', 'Moscow Mule', 'Efecto',
    'Do I Wanna Know?', 'R U Mine?', 'Arabella', 'Fluorescent Adolescent', '505',
    'HUMBLE.', 'DNA.', 'LOYALTY.', 'Money Trees', 'Swimming Pools',
    'Kiss Me More', 'Say So', 'Need to Know', 'Woman', 'Streets'
  ];

  const tracks: Track[] = [];
  let trackId = 1;

  albums.forEach((album, albumIndex) => {
    const numTracks = Math.min(5, album.totalTracks);
    for (let i = 0; i < numTracks; i++) {
      const nameIndex = (albumIndex * 5 + i) % trackNames.length;
      tracks.push({
        id: `track-${trackId}`,
        title: trackNames[nameIndex],
        artist: album.artist,
        artistId: album.artistId,
        album: album,
        albumId: album.id,
        duration: `${Math.floor(Math.random() * 2) + 3}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        durationMs: (Math.floor(Math.random() * 120) + 180) * 1000,
        plays: Math.floor(Math.random() * 2000000000) + 100000000,
        explicit: Math.random() > 0.5,
        image: album.image
      });
      trackId++;
    }
  });

  return tracks;
}

export const tracks = generateTracks();

// Playlists
export const playlists: Playlist[] = [
  {
    id: 'playlist-1',
    title: 'Today\'s Top Hits',
    description: 'The hottest tracks right now. Updated daily.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
    owner: 'Spotify',
    followers: 34582000,
    totalTracks: 50,
    duration: '2 hr 45 min',
    tracks: tracks.slice(0, 20),
    color: '#e8115b',
    isPublic: true
  },
  {
    id: 'playlist-2',
    title: 'RapCaviar',
    description: 'New music from Drake, Lil Baby, and more.',
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop',
    owner: 'Spotify',
    followers: 14852000,
    totalTracks: 50,
    duration: '2 hr 58 min',
    tracks: tracks.filter(t => t.artist.genres.includes('Hip-Hop') || t.artist.genres.includes('Rap')).slice(0, 15),
    color: '#b49bc8',
    isPublic: true
  },
  {
    id: 'playlist-3',
    title: 'All Out 2010s',
    description: 'The biggest songs of the 2010s.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop',
    owner: 'Spotify',
    followers: 8234000,
    totalTracks: 100,
    duration: '5 hr 32 min',
    tracks: tracks.slice(10, 30),
    color: '#1e3264',
    isPublic: true
  },
  {
    id: 'playlist-4',
    title: 'Chill Hits',
    description: 'Kick back to the best new and recent chill hits.',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop',
    owner: 'Spotify',
    followers: 12450000,
    totalTracks: 75,
    duration: '4 hr 12 min',
    tracks: tracks.slice(5, 25),
    color: '#608108',
    isPublic: true
  },
  {
    id: 'playlist-5',
    title: 'Viva Latino',
    description: 'Today\'s top Latin hits, refreshed every week.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    owner: 'Spotify',
    followers: 15678000,
    totalTracks: 50,
    duration: '2 hr 48 min',
    tracks: tracks.filter(t => t.artist.genres.includes('Reggaeton') || t.artist.genres.includes('Latin')).slice(0, 10),
    color: '#dc148c',
    isPublic: true
  },
  {
    id: 'playlist-6',
    title: 'Rock Classics',
    description: 'Rock legends & iconic bands.',
    image: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&h=400&fit=crop',
    owner: 'Spotify',
    followers: 23456000,
    totalTracks: 85,
    duration: '5 hr 15 min',
    tracks: tracks.filter(t => t.artist.genres.includes('Rock')).slice(0, 10),
    color: '#e61e32',
    isPublic: true
  },
  {
    id: 'playlist-7',
    title: 'Peaceful Piano',
    description: 'Relax and indulge with beautiful piano pieces.',
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=400&fit=crop',
    owner: 'Spotify',
    followers: 7890000,
    totalTracks: 200,
    duration: '12 hr 30 min',
    tracks: tracks.slice(20, 35),
    color: '#477d95',
    isPublic: true
  },
  {
    id: 'playlist-8',
    title: 'Hot Country',
    description: 'Today\'s hottest country hits.',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=400&fit=crop',
    owner: 'Spotify',
    followers: 9876000,
    totalTracks: 50,
    duration: '2 hr 55 min',
    tracks: tracks.filter(t => t.artist.genres.includes('Country')).slice(0, 10),
    color: '#ba5d07',
    isPublic: true
  },
  {
    id: 'playlist-9',
    title: 'Mood Booster',
    description: 'Get happy with today\'s dose of feel-good songs!',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=400&fit=crop',
    owner: 'Spotify',
    followers: 11234000,
    totalTracks: 75,
    duration: '3 hr 45 min',
    tracks: tracks.slice(15, 35),
    color: '#f037a5',
    isPublic: true
  },
  {
    id: 'playlist-10',
    title: 'Discover Weekly',
    description: 'Your weekly mixtape of fresh music. Updated every Monday.',
    image: 'https://images.unsplash.com/photo-1484755560615-a4c64e778a6c?w=400&h=400&fit=crop',
    owner: 'Spotify',
    followers: 0,
    totalTracks: 30,
    duration: '1 hr 52 min',
    tracks: tracks.slice(0, 30),
    color: '#1DB954',
    isPublic: false
  },
  {
    id: 'playlist-11',
    title: 'Daily Mix 1',
    description: 'The Weeknd, Dua Lipa, Drake and more',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    owner: 'Spotify',
    followers: 0,
    totalTracks: 50,
    duration: '2 hr 30 min',
    tracks: tracks.slice(0, 25),
    color: '#2e77d0',
    isPublic: false
  },
  {
    id: 'playlist-12',
    title: 'Daily Mix 2',
    description: 'Arctic Monkeys, Kendrick Lamar and more',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop',
    owner: 'Spotify',
    followers: 0,
    totalTracks: 50,
    duration: '2 hr 45 min',
    tracks: tracks.slice(25, 50),
    color: '#8d67ab',
    isPublic: false
  }
];

// Categories for Browse
export const categories: Category[] = [
  { id: 'cat-1', name: 'Pop', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop', color: '#dc148c' },
  { id: 'cat-2', name: 'Hip-Hop', image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop', color: '#ba5d07' },
  { id: 'cat-3', name: 'Rock', image: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&h=400&fit=crop', color: '#e61e32' },
  { id: 'cat-4', name: 'Latin', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop', color: '#1e3264' },
  { id: 'cat-5', name: 'Electronic', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop', color: '#148a08' },
  { id: 'cat-6', name: 'R&B', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop', color: '#dc148c' },
  { id: 'cat-7', name: 'Indie', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop', color: '#8d67ab' },
  { id: 'cat-8', name: 'Country', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=400&fit=crop', color: '#ba5d07' },
  { id: 'cat-9', name: 'Jazz', image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=400&fit=crop', color: '#477d95' },
  { id: 'cat-10', name: 'Classical', image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=400&fit=crop', color: '#7358ff' },
  { id: 'cat-11', name: 'Workout', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop', color: '#e8115b' },
  { id: 'cat-12', name: 'Chill', image: 'https://images.unsplash.com/photo-1484755560615-a4c64e778a6c?w=400&h=400&fit=crop', color: '#608108' },
  { id: 'cat-13', name: 'Party', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=400&fit=crop', color: '#af2896' },
  { id: 'cat-14', name: 'Sleep', image: 'https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=400&h=400&fit=crop', color: '#1e3264' },
  { id: 'cat-15', name: 'Focus', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=400&fit=crop', color: '#503750' },
  { id: 'cat-16', name: 'Podcasts', image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop', color: '#1e3264' }
];

// User Library (for "Your Library" section)
export const userLibrary = {
  playlists: playlists.filter(p => !p.isPublic || p.followers > 10000000).slice(0, 8),
  likedSongs: {
    id: 'liked-songs',
    title: 'Liked Songs',
    totalTracks: 342,
    tracks: tracks.slice(0, 30)
  },
  recentlyPlayed: [
    ...playlists.slice(0, 4),
    ...albums.slice(0, 4)
  ],
  followedArtists: artists.slice(0, 6),
  savedAlbums: albums.slice(0, 6)
};

// Recent searches
export const recentSearches = [
  { type: 'artist' as const, item: artists[0] },
  { type: 'playlist' as const, item: playlists[0] },
  { type: 'album' as const, item: albums[5] },
  { type: 'artist' as const, item: artists[3] }
];

// Format numbers
export function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Get playlist by ID
export function getPlaylistById(id: string): Playlist | undefined {
  return playlists.find(p => p.id === id);
}

// Get album by ID
export function getAlbumById(id: string): Album | undefined {
  return albums.find(a => a.id === id);
}

// Get artist by ID
export function getArtistById(id: string): Artist | undefined {
  return artists.find(a => a.id === id);
}

// Get tracks by artist
export function getTracksByArtist(artistId: string): Track[] {
  return tracks.filter(t => t.artistId === artistId);
}

// Get albums by artist
export function getAlbumsByArtist(artistId: string): Album[] {
  return albums.filter(a => a.artistId === artistId);
}

// Search function
export function searchAll(query: string) {
  const lowerQuery = query.toLowerCase();
  return {
    tracks: tracks.filter(t =>
      t.title.toLowerCase().includes(lowerQuery) ||
      t.artist.name.toLowerCase().includes(lowerQuery)
    ),
    artists: artists.filter(a =>
      a.name.toLowerCase().includes(lowerQuery)
    ),
    albums: albums.filter(a =>
      a.title.toLowerCase().includes(lowerQuery) ||
      a.artist.name.toLowerCase().includes(lowerQuery)
    ),
    playlists: playlists.filter(p =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
    )
  };
}
