// Netflix Clone Mock Data with realistic movie/show information
// Using TMDb image paths for realistic posters and backdrops

export interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  media_type: "movie" | "tv";
  runtime?: number;
  seasons?: number;
  maturity_rating: string;
  match_percentage: number;
}

export interface Genre {
  id: number;
  name: string;
}

export const genres: Genre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

// Featured content for hero banner
export const featuredContent: Movie[] = [
  {
    id: 1,
    title: "Stranger Things",
    overview:
      "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
    backdrop_path:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&q=80",
    release_date: "2016-07-15",
    vote_average: 8.7,
    genre_ids: [18, 9648, 878],
    media_type: "tv",
    seasons: 4,
    maturity_rating: "TV-14",
    match_percentage: 98,
  },
  {
    id: 2,
    title: "The Witcher",
    overview:
      "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
    backdrop_path:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80",
    release_date: "2019-12-20",
    vote_average: 8.2,
    genre_ids: [28, 12, 14],
    media_type: "tv",
    seasons: 3,
    maturity_rating: "TV-MA",
    match_percentage: 95,
  },
  {
    id: 3,
    title: "Oppenheimer",
    overview:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    backdrop_path:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&q=80",
    release_date: "2023-07-21",
    vote_average: 8.5,
    genre_ids: [18, 36],
    media_type: "movie",
    runtime: 180,
    maturity_rating: "R",
    match_percentage: 97,
  },
];

// Trending Now
export const trendingNow: Movie[] = [
  {
    id: 101,
    title: "Wednesday",
    overview:
      "Wednesday Addams is sent to Nevermore Academy, a peculiar boarding school where she attempts to master her psychic powers.",
    backdrop_path:
      "https://images.unsplash.com/photo-1509248961895-40216855ee25?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1509248961895-40216855ee25?w=500&q=80",
    release_date: "2022-11-23",
    vote_average: 8.4,
    genre_ids: [35, 9648, 14],
    media_type: "tv",
    seasons: 1,
    maturity_rating: "TV-14",
    match_percentage: 96,
  },
  {
    id: 102,
    title: "Glass Onion",
    overview:
      "Tech billionaire Miles Bron invites his friends for a getaway on his private Greek island. When someone turns up dead, Detective Blanc is put on the case.",
    backdrop_path:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80",
    release_date: "2022-12-23",
    vote_average: 7.9,
    genre_ids: [35, 80, 9648],
    media_type: "movie",
    runtime: 139,
    maturity_rating: "PG-13",
    match_percentage: 92,
  },
  {
    id: 103,
    title: "All Quiet on the Western Front",
    overview:
      "A young German soldier's terrifying experiences and disillusionment in the trenches of World War I.",
    backdrop_path:
      "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=500&q=80",
    release_date: "2022-10-28",
    vote_average: 7.8,
    genre_ids: [18, 10752, 28],
    media_type: "movie",
    runtime: 148,
    maturity_rating: "R",
    match_percentage: 89,
  },
  {
    id: 104,
    title: "The Crown",
    overview:
      "This drama follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
    backdrop_path:
      "https://images.unsplash.com/photo-1513618827672-0d7c5ad591b1?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1513618827672-0d7c5ad591b1?w=500&q=80",
    release_date: "2016-11-04",
    vote_average: 8.2,
    genre_ids: [18, 36],
    media_type: "tv",
    seasons: 6,
    maturity_rating: "TV-MA",
    match_percentage: 94,
  },
  {
    id: 105,
    title: "Squid Game",
    overview:
      "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits with deadly high stakes.",
    backdrop_path:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500&q=80",
    release_date: "2021-09-17",
    vote_average: 8.0,
    genre_ids: [18, 9648, 28],
    media_type: "tv",
    seasons: 2,
    maturity_rating: "TV-MA",
    match_percentage: 97,
  },
  {
    id: 106,
    title: "Extraction 2",
    overview:
      "After barely surviving his grievous wounds from his mission in Dhaka, Tyler Rake is back, and his team is ready to take on their next mission.",
    backdrop_path:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&q=80",
    release_date: "2023-06-16",
    vote_average: 7.6,
    genre_ids: [28, 53],
    media_type: "movie",
    runtime: 122,
    maturity_rating: "R",
    match_percentage: 91,
  },
];

// Popular on Netflix
export const popularOnNetflix: Movie[] = [
  {
    id: 201,
    title: "Money Heist",
    overview:
      "Eight thieves take hostages and lock themselves in the Royal Mint of Spain as a criminal mastermind manipulates the police to carry out his plan.",
    backdrop_path:
      "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500&q=80",
    release_date: "2017-05-02",
    vote_average: 8.3,
    genre_ids: [28, 80, 18],
    media_type: "tv",
    seasons: 5,
    maturity_rating: "TV-MA",
    match_percentage: 96,
  },
  {
    id: 202,
    title: "Don't Look Up",
    overview:
      "Two low-level astronomers must go on a giant media tour to warn mankind of an approaching comet that will destroy planet Earth.",
    backdrop_path:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500&q=80",
    release_date: "2021-12-24",
    vote_average: 7.2,
    genre_ids: [35, 878, 18],
    media_type: "movie",
    runtime: 138,
    maturity_rating: "R",
    match_percentage: 88,
  },
  {
    id: 203,
    title: "Bridgerton",
    overview:
      "Wealth, lust, and betrayal set in the backdrop of Regency era England, seen through the eyes of the powerful Bridgerton family.",
    backdrop_path:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80",
    release_date: "2020-12-25",
    vote_average: 7.3,
    genre_ids: [18, 10749],
    media_type: "tv",
    seasons: 3,
    maturity_rating: "TV-MA",
    match_percentage: 93,
  },
  {
    id: 204,
    title: "The Adam Project",
    overview:
      "After accidentally crash-landing in 2022, time-traveling fighter pilot Adam Reed teams up with his 12-year-old self on a mission to save the future.",
    backdrop_path:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80",
    release_date: "2022-03-11",
    vote_average: 6.7,
    genre_ids: [28, 12, 878],
    media_type: "movie",
    runtime: 106,
    maturity_rating: "PG-13",
    match_percentage: 85,
  },
  {
    id: 205,
    title: "Dark",
    overview:
      "A missing child causes four families to help each other for answers. What they could not imagine is that this mystery would be connected to the fabric of time.",
    backdrop_path:
      "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=500&q=80",
    release_date: "2017-12-01",
    vote_average: 8.7,
    genre_ids: [18, 9648, 878],
    media_type: "tv",
    seasons: 3,
    maturity_rating: "TV-MA",
    match_percentage: 98,
  },
  {
    id: 206,
    title: "Red Notice",
    overview:
      "An Interpol agent tracks the world's most wanted art thief. When a daring heist brings together the FBI's top profiler and two rival criminals.",
    backdrop_path:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=500&q=80",
    release_date: "2021-11-12",
    vote_average: 6.8,
    genre_ids: [28, 35, 80],
    media_type: "movie",
    runtime: 118,
    maturity_rating: "PG-13",
    match_percentage: 86,
  },
];

// New Releases
export const newReleases: Movie[] = [
  {
    id: 301,
    title: "Heart of Stone",
    overview:
      "An intelligence operative for a shadowy global peacekeeping agency races to stop a hacker from stealing its most valuable and dangerous weapon.",
    backdrop_path:
      "https://images.unsplash.com/photo-1551817958-d9d86fb29431?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1551817958-d9d86fb29431?w=500&q=80",
    release_date: "2023-08-11",
    vote_average: 6.9,
    genre_ids: [28, 53],
    media_type: "movie",
    runtime: 122,
    maturity_rating: "PG-13",
    match_percentage: 87,
  },
  {
    id: 302,
    title: "ONE PIECE",
    overview:
      "With his straw hat and ragtag crew, young pirate Monkey D. Luffy goes on an epic voyage for treasure in this live-action adaptation of the popular manga.",
    backdrop_path:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80",
    release_date: "2023-08-31",
    vote_average: 8.4,
    genre_ids: [28, 12, 35],
    media_type: "tv",
    seasons: 1,
    maturity_rating: "TV-14",
    match_percentage: 95,
  },
  {
    id: 303,
    title: "The Killer",
    overview:
      "After a fateful near-miss, an assassin battles his employers and himself, on an international manhunt he insists isn't personal.",
    backdrop_path:
      "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=500&q=80",
    release_date: "2023-11-10",
    vote_average: 7.4,
    genre_ids: [28, 80, 53],
    media_type: "movie",
    runtime: 118,
    maturity_rating: "R",
    match_percentage: 90,
  },
  {
    id: 304,
    title: "Bodies",
    overview:
      "Four detectives in four different eras of London find themselves investigating the same murder.",
    backdrop_path:
      "https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=500&q=80",
    release_date: "2023-10-19",
    vote_average: 7.6,
    genre_ids: [18, 9648, 878],
    media_type: "tv",
    seasons: 1,
    maturity_rating: "TV-MA",
    match_percentage: 91,
  },
  {
    id: 305,
    title: "Leave the World Behind",
    overview:
      "A family's vacation is upended when two strangers arrive with news of a cyberattack that has plunged the nation into chaos.",
    backdrop_path:
      "https://images.unsplash.com/photo-1464618663641-bbdd760ae84a?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1464618663641-bbdd760ae84a?w=500&q=80",
    release_date: "2023-12-08",
    vote_average: 6.5,
    genre_ids: [18, 9648, 53],
    media_type: "movie",
    runtime: 138,
    maturity_rating: "R",
    match_percentage: 84,
  },
  {
    id: 306,
    title: "Beef",
    overview:
      "A road rage incident sparks an escalating feud between a contractor and the owner of a home goods business.",
    backdrop_path:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80",
    release_date: "2023-04-06",
    vote_average: 8.1,
    genre_ids: [35, 18],
    media_type: "tv",
    seasons: 1,
    maturity_rating: "TV-MA",
    match_percentage: 94,
  },
];

// Action & Adventure
export const actionAdventure: Movie[] = [
  {
    id: 401,
    title: "The Gray Man",
    overview:
      "When the CIA's most skilled operative — whose true identity is known to none — accidentally uncovers dark agency secrets, a psychopathic former colleague puts a bounty on his head.",
    backdrop_path:
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500&q=80",
    release_date: "2022-07-22",
    vote_average: 7.0,
    genre_ids: [28, 53],
    media_type: "movie",
    runtime: 122,
    maturity_rating: "PG-13",
    match_percentage: 88,
  },
  {
    id: 402,
    title: "Vikings: Valhalla",
    overview:
      "Follow-up series to Vikings set 100 years later and focuses on the adventures of Leif Eriksson, Freydis, Harald Hardrada and the Norman King William the Conqueror.",
    backdrop_path:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=80",
    release_date: "2022-02-25",
    vote_average: 7.8,
    genre_ids: [28, 12, 18],
    media_type: "tv",
    seasons: 3,
    maturity_rating: "TV-MA",
    match_percentage: 92,
  },
  {
    id: 403,
    title: "Army of the Dead",
    overview:
      "Following a zombie outbreak in Las Vegas, a group of mercenaries take the ultimate gamble, venturing into the quarantine zone to pull off the greatest heist ever attempted.",
    backdrop_path:
      "https://images.unsplash.com/photo-1570303363992-7f95ee20ebdb?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1570303363992-7f95ee20ebdb?w=500&q=80",
    release_date: "2021-05-21",
    vote_average: 6.3,
    genre_ids: [28, 27, 878],
    media_type: "movie",
    runtime: 148,
    maturity_rating: "R",
    match_percentage: 82,
  },
  {
    id: 404,
    title: "Outer Banks",
    overview:
      "A tight-knit group of teens unearths a long-buried secret, setting off a chain of illicit events that takes them on an adventure they'll never forget.",
    backdrop_path:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80",
    release_date: "2020-04-15",
    vote_average: 7.6,
    genre_ids: [12, 18, 9648],
    media_type: "tv",
    seasons: 3,
    maturity_rating: "TV-MA",
    match_percentage: 93,
  },
  {
    id: 405,
    title: "Luther: The Fallen Sun",
    overview:
      "A gruesome serial killer is terrorizing London while brilliant but disgraced detective John Luther sits behind bars. Haunted by his failure to capture the cyber psychopath.",
    backdrop_path:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&q=80",
    release_date: "2023-03-10",
    vote_average: 7.2,
    genre_ids: [28, 80, 53],
    media_type: "movie",
    runtime: 129,
    maturity_rating: "R",
    match_percentage: 89,
  },
  {
    id: 406,
    title: "6 Underground",
    overview:
      "Six individuals from all around the globe, each the very best at what they do, have been chosen not only for their skill, but for a unique desire to delete their pasts.",
    backdrop_path:
      "https://images.unsplash.com/photo-1487088678257-3a541e6e3922?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1487088678257-3a541e6e3922?w=500&q=80",
    release_date: "2019-12-13",
    vote_average: 6.1,
    genre_ids: [28, 53],
    media_type: "movie",
    runtime: 128,
    maturity_rating: "R",
    match_percentage: 81,
  },
];

// Sci-Fi & Fantasy
export const sciFiFantasy: Movie[] = [
  {
    id: 501,
    title: "Black Mirror",
    overview:
      "Over the last ten years, technology has transformed almost every aspect of our lives before we've had time to stop and question it.",
    backdrop_path:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80",
    release_date: "2011-12-04",
    vote_average: 8.4,
    genre_ids: [878, 18, 9648],
    media_type: "tv",
    seasons: 6,
    maturity_rating: "TV-MA",
    match_percentage: 96,
  },
  {
    id: 502,
    title: "Locke & Key",
    overview:
      "After their father is murdered under mysterious circumstances, the three Locke siblings and their mother move into their ancestral home, Keyhouse.",
    backdrop_path:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=500&q=80",
    release_date: "2020-02-07",
    vote_average: 7.6,
    genre_ids: [18, 14, 27],
    media_type: "tv",
    seasons: 3,
    maturity_rating: "TV-14",
    match_percentage: 91,
  },
  {
    id: 503,
    title: "3 Body Problem",
    overview:
      "Across continents and decades, five brilliant friends make earth-shattering discoveries as the laws of science unravel and an existential threat emerges.",
    backdrop_path:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500&q=80",
    release_date: "2024-03-21",
    vote_average: 7.8,
    genre_ids: [878, 18, 9648],
    media_type: "tv",
    seasons: 1,
    maturity_rating: "TV-MA",
    match_percentage: 94,
  },
  {
    id: 504,
    title: "Rebel Moon",
    overview:
      "When a peaceful colony on the edge of the galaxy finds itself threatened by the armies of a tyrannical ruling force, a mysterious stranger living among them becomes their best hope.",
    backdrop_path:
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=500&q=80",
    release_date: "2023-12-22",
    vote_average: 6.5,
    genre_ids: [878, 28, 12],
    media_type: "movie",
    runtime: 134,
    maturity_rating: "PG-13",
    match_percentage: 85,
  },
  {
    id: 505,
    title: "The Sandman",
    overview:
      "After years of imprisonment, Morpheus — the King of Dreams — embarks on a journey across worlds to find what was stolen from him and restore his power.",
    backdrop_path:
      "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=500&q=80",
    release_date: "2022-08-05",
    vote_average: 7.8,
    genre_ids: [14, 18],
    media_type: "tv",
    seasons: 2,
    maturity_rating: "TV-MA",
    match_percentage: 93,
  },
  {
    id: 506,
    title: "Archive 81",
    overview:
      "An archivist takes a job restoring damaged videotapes and gets pulled into the mystery surrounding the director and her documentary about a sinister cult.",
    backdrop_path:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&q=80",
    release_date: "2022-01-14",
    vote_average: 7.4,
    genre_ids: [18, 27, 9648],
    media_type: "tv",
    seasons: 1,
    maturity_rating: "TV-MA",
    match_percentage: 88,
  },
];

// Documentaries
export const documentaries: Movie[] = [
  {
    id: 601,
    title: "Our Planet",
    overview:
      "Experience our planet's natural beauty and examine how climate change impacts all living creatures in this ambitious documentary of unprecedented scope.",
    backdrop_path:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
    release_date: "2019-04-05",
    vote_average: 9.3,
    genre_ids: [99],
    media_type: "tv",
    seasons: 2,
    maturity_rating: "TV-G",
    match_percentage: 98,
  },
  {
    id: 602,
    title: "The Social Dilemma",
    overview:
      "This documentary-drama hybrid explores the dangerous human impact of social networking, with tech experts sounding the alarm on their own creations.",
    backdrop_path:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&q=80",
    release_date: "2020-09-09",
    vote_average: 7.6,
    genre_ids: [99, 18],
    media_type: "movie",
    runtime: 94,
    maturity_rating: "PG-13",
    match_percentage: 92,
  },
  {
    id: 603,
    title: "Formula 1: Drive to Survive",
    overview:
      "Drivers, managers and team owners live life in the fast lane — both on and off the track — during each cutthroat season of Formula 1 racing.",
    backdrop_path:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
    release_date: "2019-03-08",
    vote_average: 8.2,
    genre_ids: [99],
    media_type: "tv",
    seasons: 6,
    maturity_rating: "TV-MA",
    match_percentage: 95,
  },
  {
    id: 604,
    title: "Abstract: The Art of Design",
    overview:
      "Step inside the minds of the most innovative designers in a variety of disciplines and learn how design impacts every aspect of life.",
    backdrop_path:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=500&q=80",
    release_date: "2017-02-10",
    vote_average: 8.4,
    genre_ids: [99],
    media_type: "tv",
    seasons: 2,
    maturity_rating: "TV-PG",
    match_percentage: 94,
  },
  {
    id: 605,
    title: "American Factory",
    overview:
      "In post-industrial Ohio, a Chinese billionaire opens a new factory in the husk of an abandoned GM plant, hiring two thousand blue-collar Americans.",
    backdrop_path:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    release_date: "2019-08-21",
    vote_average: 7.5,
    genre_ids: [99],
    media_type: "movie",
    runtime: 110,
    maturity_rating: "PG-13",
    match_percentage: 89,
  },
  {
    id: 606,
    title: "Night on Earth",
    overview:
      "This nature series' new technology reveals the wonders of the nocturnal world, from lions hunting in pitch darkness to bats snatching prey on the wing.",
    backdrop_path:
      "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=500&q=80",
    release_date: "2020-01-29",
    vote_average: 8.6,
    genre_ids: [99],
    media_type: "tv",
    seasons: 1,
    maturity_rating: "TV-G",
    match_percentage: 96,
  },
];

// Comedy
export const comedyMovies: Movie[] = [
  {
    id: 701,
    title: "Murder Mystery 2",
    overview:
      "Full-time detectives Nick and Audrey are struggling to get their private eye agency off the ground. A friend's wedding gives them a chance to shine.",
    backdrop_path:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=500&q=80",
    release_date: "2023-03-31",
    vote_average: 5.8,
    genre_ids: [28, 35, 9648],
    media_type: "movie",
    runtime: 89,
    maturity_rating: "PG-13",
    match_percentage: 79,
  },
  {
    id: 702,
    title: "Sex Education",
    overview:
      "Insecure teen Otis has all the answers when it comes to sex advice, thanks to his therapist mother. So he and a friend set up a school clinic.",
    backdrop_path:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&q=80",
    release_date: "2019-01-11",
    vote_average: 8.2,
    genre_ids: [35, 18],
    media_type: "tv",
    seasons: 4,
    maturity_rating: "TV-MA",
    match_percentage: 95,
  },
  {
    id: 703,
    title: "The Bubble",
    overview:
      "Sneaking out. Hooking up. Melting down. The cast and crew of a blockbuster action franchise attempt to shoot a sequel while quarantining at a posh hotel.",
    backdrop_path:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&q=80",
    release_date: "2022-04-01",
    vote_average: 4.6,
    genre_ids: [35],
    media_type: "movie",
    runtime: 126,
    maturity_rating: "R",
    match_percentage: 68,
  },
  {
    id: 704,
    title: "Never Have I Ever",
    overview:
      "After a traumatic year, all an Indian-American teen wants is to go from pariah to popular — but friends, family and feelings won't make it easy on her.",
    backdrop_path:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80",
    release_date: "2020-04-27",
    vote_average: 7.8,
    genre_ids: [35, 18],
    media_type: "tv",
    seasons: 4,
    maturity_rating: "TV-14",
    match_percentage: 93,
  },
  {
    id: 705,
    title: "You People",
    overview:
      "A new couple and their families find themselves examining modern love and family dynamics amidst clashing cultures, societal expectations and generational differences.",
    backdrop_path:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500&q=80",
    release_date: "2023-01-27",
    vote_average: 5.5,
    genre_ids: [35, 10749],
    media_type: "movie",
    runtime: 117,
    maturity_rating: "R",
    match_percentage: 76,
  },
  {
    id: 706,
    title: "Big Mouth",
    overview:
      "Teenage friends find their lives upended by the wonders and horrors of puberty in this animated comedy from real-life best friends.",
    backdrop_path:
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=500&q=80",
    release_date: "2017-09-29",
    vote_average: 7.8,
    genre_ids: [16, 35],
    media_type: "tv",
    seasons: 7,
    maturity_rating: "TV-MA",
    match_percentage: 91,
  },
];

// Top 10 in Your Country
export const top10: Movie[] = [
  {
    id: 801,
    title: "Reacher",
    overview:
      "Jack Reacher, a veteran military police investigator, has just entered civilian life. Reacher is a drifter, carrying no phone and the barest of essentials as he travels the country.",
    backdrop_path:
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500&q=80",
    release_date: "2022-02-04",
    vote_average: 8.1,
    genre_ids: [28, 80, 18],
    media_type: "tv",
    seasons: 2,
    maturity_rating: "TV-MA",
    match_percentage: 94,
  },
  {
    id: 802,
    title: "The Night Agent",
    overview:
      "While monitoring an emergency line, an FBI agent answers a call that thrusts him into a deadly conspiracy involving a mole at the White House.",
    backdrop_path:
      "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=500&q=80",
    release_date: "2023-03-23",
    vote_average: 7.8,
    genre_ids: [28, 18, 53],
    media_type: "tv",
    seasons: 1,
    maturity_rating: "TV-MA",
    match_percentage: 92,
  },
  {
    id: 803,
    title: "Fool Me Once",
    overview:
      "After her husband is shot dead, Maya sees him on a nanny cam. She doesn't know what to believe — and her search for the truth leads to more questions.",
    backdrop_path:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?w=500&q=80",
    release_date: "2024-01-01",
    vote_average: 7.2,
    genre_ids: [18, 9648, 53],
    media_type: "tv",
    seasons: 1,
    maturity_rating: "TV-MA",
    match_percentage: 88,
  },
  {
    id: 804,
    title: "Lift",
    overview:
      "A master thief is wooed by his ex-girlfriend and the FBI to pull off an impossible heist with his international crew on a 777 flying from London to Zurich.",
    backdrop_path:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&q=80",
    release_date: "2024-01-12",
    vote_average: 6.4,
    genre_ids: [28, 35, 80],
    media_type: "movie",
    runtime: 107,
    maturity_rating: "PG-13",
    match_percentage: 83,
  },
  {
    id: 805,
    title: "Society of the Snow",
    overview:
      "In 1972, the Uruguayan Air Force Flight 571 crashed into the Andes. The survivors are faced with a harrowing choice: to endure or to surrender.",
    backdrop_path:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=80",
    release_date: "2024-01-04",
    vote_average: 8.1,
    genre_ids: [18, 36],
    media_type: "movie",
    runtime: 144,
    maturity_rating: "R",
    match_percentage: 95,
  },
  {
    id: 806,
    title: "Griselda",
    overview:
      "Griselda Blanco, a Colombian drug lord who rose to power during the cocaine boom of the 1970s and 1980s, is portrayed in this biographical drama.",
    backdrop_path:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500&q=80",
    release_date: "2024-01-25",
    vote_average: 7.5,
    genre_ids: [80, 18],
    media_type: "tv",
    seasons: 1,
    maturity_rating: "TV-MA",
    match_percentage: 91,
  },
  {
    id: 807,
    title: "Damsel",
    overview:
      "A dutiful damsel agrees to marry a handsome prince, only to find the royal family has recruited her as a sacrifice to repay an ancient debt.",
    backdrop_path:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&q=80",
    release_date: "2024-03-08",
    vote_average: 6.8,
    genre_ids: [12, 14, 28],
    media_type: "movie",
    runtime: 109,
    maturity_rating: "PG-13",
    match_percentage: 86,
  },
  {
    id: 808,
    title: "Avatar: The Last Airbender",
    overview:
      "In a war-torn world of elemental magic, a young boy must master the powers of earth, water, fire and air to save the world.",
    backdrop_path:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
    release_date: "2024-02-22",
    vote_average: 7.9,
    genre_ids: [12, 14, 28],
    media_type: "tv",
    seasons: 1,
    maturity_rating: "TV-PG",
    match_percentage: 94,
  },
  {
    id: 809,
    title: "All the Light We Cannot See",
    overview:
      "The paths of a blind French girl and a German soldier collide in occupied France as both try to survive the devastation of World War II.",
    backdrop_path:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=500&q=80",
    release_date: "2023-11-02",
    vote_average: 7.1,
    genre_ids: [18, 10752],
    media_type: "tv",
    seasons: 1,
    maturity_rating: "TV-MA",
    match_percentage: 87,
  },
  {
    id: 810,
    title: "Maestro",
    overview:
      "A towering and complex figure, Leonard Bernstein touched every aspect of American music during his rise to become one of the most influential conductors of his time.",
    backdrop_path:
      "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1920&q=80",
    poster_path:
      "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=500&q=80",
    release_date: "2023-12-20",
    vote_average: 7.0,
    genre_ids: [18, 10749, 10402],
    media_type: "movie",
    runtime: 129,
    maturity_rating: "R",
    match_percentage: 84,
  },
];

// User profiles
export interface UserProfile {
  id: number;
  name: string;
  avatar: string;
  isKids: boolean;
}

export const userProfiles: UserProfile[] = [
  {
    id: 1,
    name: "Marco",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
    isKids: false,
  },
  {
    id: 2,
    name: "Sofia",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    isKids: false,
  },
  {
    id: 3,
    name: "Kids",
    avatar:
      "https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=200&h=200&fit=crop",
    isKids: true,
  },
  {
    id: 4,
    name: "Guest",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    isKids: false,
  },
];

// Helper function to get genre names from IDs
export function getGenreNames(genreIds: number[]): string[] {
  return genreIds
    .map((id) => genres.find((g) => g.id === id)?.name)
    .filter((name): name is string => !!name);
}

// Get all movies combined
export function getAllContent(): Movie[] {
  return [
    ...featuredContent,
    ...trendingNow,
    ...popularOnNetflix,
    ...newReleases,
    ...actionAdventure,
    ...sciFiFantasy,
    ...documentaries,
    ...comedyMovies,
    ...top10,
  ];
}

// Search content
export function searchContent(query: string): Movie[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllContent().filter(
    (movie) =>
      movie.title.toLowerCase().includes(lowercaseQuery) ||
      movie.overview.toLowerCase().includes(lowercaseQuery)
  );
}

// Get content by ID
export function getContentById(id: number): Movie | undefined {
  return getAllContent().find((movie) => movie.id === id);
}

// Content rows for browsing
export const contentRows = [
  { title: "Trending Now", data: trendingNow },
  { title: "Popular on Netflix", data: popularOnNetflix },
  { title: "New Releases", data: newReleases },
  { title: "Top 10 in Italy Today", data: top10 },
  { title: "Action & Adventure", data: actionAdventure },
  { title: "Sci-Fi & Fantasy", data: sciFiFantasy },
  { title: "Documentaries", data: documentaries },
  { title: "Comedy", data: comedyMovies },
];
