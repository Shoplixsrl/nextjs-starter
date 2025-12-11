// Mock data for Spotify Clone
// Using high-quality music-related images

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

// Artists with music-appropriate images
export const artists: Artist[] = [
  {
    id: 'artist-1',
    name: 'The Weeknd',
    image: 'https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb',
    followers: 85420000,
    monthlyListeners: 92500000,
    verified: true,
    genres: ['R&B', 'Pop', 'Alternative'],
    bio: 'Abel Makkonen Tesfaye, known professionally as The Weeknd, is a Canadian singer, songwriter, and record producer.'
  },
  {
    id: 'artist-2',
    name: 'Dua Lipa',
    image: 'https://i.scdn.co/image/ab6761610000e5eb1bbee4a02f85ecc58d385c3e',
    followers: 65300000,
    monthlyListeners: 78200000,
    verified: true,
    genres: ['Pop', 'Dance', 'Electronic'],
    bio: 'Dua Lipa is a British-Albanian singer and songwriter. Her mezzo-soprano vocal range and disco-influenced production have received critical acclaim.'
  },
  {
    id: 'artist-3',
    name: 'Drake',
    image: 'https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9',
    followers: 79800000,
    monthlyListeners: 88100000,
    verified: true,
    genres: ['Hip-Hop', 'Rap', 'R&B'],
    bio: 'Aubrey Drake Graham is a Canadian rapper, singer, and songwriter. Drake initially gained recognition as an actor on the teen drama series Degrassi.'
  },
  {
    id: 'artist-4',
    name: 'Billie Eilish',
    image: 'https://i.scdn.co/image/ab6761610000e5ebd8b9980db67272cb4d2c3daf',
    followers: 72100000,
    monthlyListeners: 85600000,
    verified: true,
    genres: ['Pop', 'Electropop', 'Alternative'],
    bio: 'Billie Eilish Pirate Baird OConnell is an American singer and songwriter. She first gained public attention in 2015 with her debut single Ocean Eyes.'
  },
  {
    id: 'artist-5',
    name: 'Ed Sheeran',
    image: 'https://i.scdn.co/image/ab6761610000e5eb3bcef85e105dfc42399ef0ba',
    followers: 92500000,
    monthlyListeners: 98700000,
    verified: true,
    genres: ['Pop', 'Folk', 'Acoustic'],
    bio: 'Edward Christopher Sheeran MBE is an English singer-songwriter. Born in Halifax, West Yorkshire and raised in Framlingham, Suffolk.'
  },
  {
    id: 'artist-6',
    name: 'Taylor Swift',
    image: 'https://i.scdn.co/image/ab6761610000e5eb5a00969a4698c3bc19f58bd9',
    followers: 95200000,
    monthlyListeners: 102300000,
    verified: true,
    genres: ['Pop', 'Country', 'Folk'],
    bio: 'Taylor Alison Swift is an American singer-songwriter. Her narrative songwriting, which often centers around her personal life, has received widespread critical praise.'
  },
  {
    id: 'artist-7',
    name: 'Bad Bunny',
    image: 'https://i.scdn.co/image/ab6761610000e5eb9ad50e478a469c7f9de8af30',
    followers: 68900000,
    monthlyListeners: 89400000,
    verified: true,
    genres: ['Reggaeton', 'Latin Trap', 'Latin Pop'],
    bio: 'Benito Antonio Martinez Ocasio, known by his stage name Bad Bunny, is a Puerto Rican rapper and singer.'
  },
  {
    id: 'artist-8',
    name: 'Arctic Monkeys',
    image: 'https://i.scdn.co/image/ab6761610000e5eb7da39dea0a72f581535fb11f',
    followers: 32500000,
    monthlyListeners: 45600000,
    verified: true,
    genres: ['Indie Rock', 'Alternative', 'Rock'],
    bio: 'Arctic Monkeys are an English rock band formed in Sheffield in 2002. The group consists of Alex Turner, Jamie Cook, Matt Helders, and Nick OMalley.'
  },
  {
    id: 'artist-9',
    name: 'Kendrick Lamar',
    image: 'https://i.scdn.co/image/ab6761610000e5eb437b9e2a82505b3d93ff1022',
    followers: 42800000,
    monthlyListeners: 56700000,
    verified: true,
    genres: ['Hip-Hop', 'Rap', 'Conscious Hip-Hop'],
    bio: 'Kendrick Lamar Duckworth is an American rapper, songwriter, and record producer. He is often cited as one of the greatest rappers of all time.'
  },
  {
    id: 'artist-10',
    name: 'Doja Cat',
    image: 'https://i.scdn.co/image/ab6761610000e5eb9d5305eb7c7fd96f61e7f991',
    followers: 58600000,
    monthlyListeners: 72400000,
    verified: true,
    genres: ['Pop', 'Hip-Hop', 'R&B'],
    bio: 'Amala Ratna Zandile Dlamini, known professionally as Doja Cat, is an American rapper, singer, and songwriter.'
  }
];

// Albums with official-looking cover art
export const albums: Album[] = [
  {
    id: 'album-1',
    title: 'After Hours',
    artist: artists[0],
    artistId: 'artist-1',
    image: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
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
    image: 'https://i.scdn.co/image/ab67616d0000b273d4daf28d55fe4197ede848be',
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
    image: 'https://i.scdn.co/image/ab67616d0000b273cd945b4e3de57edd28481a3f',
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
    image: 'https://i.scdn.co/image/ab67616d0000b2732a038d3bf875d23e4aeaa84e',
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
    image: 'https://i.scdn.co/image/ab67616d0000b273ef24c3fdbf856340d55cfeb2',
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
    image: 'https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5',
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
    image: 'https://i.scdn.co/image/ab67616d0000b273cc5d2f3e411b2e8e8b12f8e8',
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
    image: 'https://i.scdn.co/image/ab67616d0000b2734ae1c4c5c45aabe565499163',
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
    image: 'https://i.scdn.co/image/ab67616d0000b2732e02117d76426a08ac7c174f',
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
    image: 'https://i.scdn.co/image/ab67616d0000b2734df3245f26298a1579ecc321',
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

// Playlists with Spotify-style cover images
export const playlists: Playlist[] = [
  {
    id: 'playlist-1',
    title: 'Today\'s Top Hits',
    description: 'The hottest tracks right now. Updated daily.',
    image: 'https://i.scdn.co/image/ab67706f000000027ea4d505212b9de1f72c5112',
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
    image: 'https://i.scdn.co/image/ab67706f00000002b101f5e0a6f76a5e1e051f47',
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
    image: 'https://i.scdn.co/image/ab67706f00000002b0fe40a6e1692822f5a9d8f1',
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
    image: 'https://i.scdn.co/image/ab67706f00000002eac46f0eb2d1c5c8e3b4e814',
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
    image: 'https://i.scdn.co/image/ab67706f000000025f0ff9251e3cfe641160dc31',
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
    image: 'https://i.scdn.co/image/ab67706f00000002fe6d8d1019d5b302213e3730',
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
    image: 'https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663a6',
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
    image: 'https://i.scdn.co/image/ab67706f00000002a3cea6ef06c6ed89b1e1c638',
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
    image: 'https://i.scdn.co/image/ab67706f00000002bd0e19e810bb4b55ab164a95',
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
    image: 'https://newjams-images.scdn.co/image/ab676477000033ad/dt/v3/discover-weekly/aAbca4VNfzWuUCQ_FGiEFA==/bmVuZW5lbmVuZW5lbmVuZQ==',
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
    image: 'https://dailymix-images.scdn.co/v2/img/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb/1/en/default',
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
    image: 'https://dailymix-images.scdn.co/v2/img/ab6761610000e5eb7da39dea0a72f581535fb11f/2/en/default',
    owner: 'Spotify',
    followers: 0,
    totalTracks: 50,
    duration: '2 hr 45 min',
    tracks: tracks.slice(25, 50),
    color: '#8d67ab',
    isPublic: false
  }
];

// Categories for Browse with Spotify colors
export const categories: Category[] = [
  { id: 'cat-1', name: 'Pop', image: 'https://i.scdn.co/image/ab67fb8200005caf7e11c8413dc33c00740579c1', color: '#dc148c' },
  { id: 'cat-2', name: 'Hip-Hop', image: 'https://i.scdn.co/image/ab67fb8200005caf7e11c8413dc33c00740579c1', color: '#ba5d07' },
  { id: 'cat-3', name: 'Rock', image: 'https://i.scdn.co/image/ab67fb8200005cafae7e69beb88f16969641b53e', color: '#e61e32' },
  { id: 'cat-4', name: 'Latin', image: 'https://i.scdn.co/image/ab67fb8200005caf7bdf5f8a310edc90773a9a92', color: '#e1118b' },
  { id: 'cat-5', name: 'Dance/Electronic', image: 'https://i.scdn.co/image/ab67fb8200005cafdfdaac1cf9574a196ca25196', color: '#148a08' },
  { id: 'cat-6', name: 'R&B', image: 'https://i.scdn.co/image/ab67fb8200005caf5eb2a7ce555f226db2dc1377', color: '#dc148c' },
  { id: 'cat-7', name: 'Indie', image: 'https://i.scdn.co/image/ab67fb8200005caf6827a98ed8e41c84d1e2e743', color: '#8d67ab' },
  { id: 'cat-8', name: 'Country', image: 'https://i.scdn.co/image/ab67fb8200005cafe914a07d20cec7a65e2e5dad', color: '#ba5d07' },
  { id: 'cat-9', name: 'Jazz', image: 'https://i.scdn.co/image/ab67fb8200005caf80c11f37bfa6e142fba64632', color: '#477d95' },
  { id: 'cat-10', name: 'Classical', image: 'https://i.scdn.co/image/ab67fb8200005caf12809992dfc5b318892ea07b', color: '#7358ff' },
  { id: 'cat-11', name: 'Workout', image: 'https://i.scdn.co/image/ab67fb8200005cafbb0e4a466e7b0f5c4b8d9e80', color: '#e8115b' },
  { id: 'cat-12', name: 'Chill', image: 'https://i.scdn.co/image/ab67fb8200005cafe914a07d20cec7a65e2e5dad', color: '#608108' },
  { id: 'cat-13', name: 'Party', image: 'https://i.scdn.co/image/ab67fb8200005caf4b36a2c31432ace68d90c4f2', color: '#af2896' },
  { id: 'cat-14', name: 'Sleep', image: 'https://i.scdn.co/image/ab67fb8200005caf9249b35cd1a20b4288089d69', color: '#1e3264' },
  { id: 'cat-15', name: 'Focus', image: 'https://i.scdn.co/image/ab67fb8200005cafe49aabe1e1b141d9dc06e05b', color: '#503750' },
  { id: 'cat-16', name: 'Podcasts', image: 'https://i.scdn.co/image/ab6765630000ba8a81f07e1ead0317ee3c285f4c', color: '#1e3264' }
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
