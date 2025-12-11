// TMDB API Client
// Documentation: https://developer.themoviedb.org/docs

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

// Image sizes available from TMDB
export const ImageSizes = {
  backdrop: {
    small: "w300",
    medium: "w780",
    large: "w1280",
    original: "original",
  },
  poster: {
    small: "w154",
    medium: "w342",
    large: "w500",
    original: "original",
  },
  profile: {
    small: "w45",
    medium: "w185",
    large: "h632",
    original: "original",
  },
} as const;

// Helper to build image URLs
export function getImageUrl(
  path: string | null,
  size: string = "original"
): string {
  if (!path) {
    return "/images/netflix/backdrops/placeholder.jpg";
  }
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

// TMDB API response types
export interface TMDBMovie {
  id: number;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  media_type?: "movie" | "tv";
  adult: boolean;
  popularity: number;
}

export interface TMDBMovieDetails extends TMDBMovie {
  runtime?: number;
  number_of_seasons?: number;
  genres: { id: number; name: string }[];
  tagline?: string;
  status: string;
  production_companies: { id: number; name: string; logo_path: string | null }[];
  credits?: {
    cast: TMDBCastMember[];
    crew: TMDBCrewMember[];
  };
  videos?: {
    results: TMDBVideo[];
  };
  similar?: {
    results: TMDBMovie[];
  };
  recommendations?: {
    results: TMDBMovie[];
  };
  content_ratings?: {
    results: { iso_3166_1: string; rating: string }[];
  };
  release_dates?: {
    results: {
      iso_3166_1: string;
      release_dates: { certification: string; type: number }[];
    }[];
  };
}

export interface TMDBCastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface TMDBCrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface TMDBVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// Maturity rating mapping
function getMaturityRating(
  contentRatings?: { results: { iso_3166_1: string; rating: string }[] },
  releaseDates?: {
    results: {
      iso_3166_1: string;
      release_dates: { certification: string; type: number }[];
    }[];
  }
): string {
  // Try to get US TV rating
  if (contentRatings?.results) {
    const usRating = contentRatings.results.find((r) => r.iso_3166_1 === "US");
    if (usRating?.rating) return usRating.rating;
  }
  // Try to get US movie certification
  if (releaseDates?.results) {
    const usRelease = releaseDates.results.find((r) => r.iso_3166_1 === "US");
    const certification = usRelease?.release_dates.find((rd) => rd.certification);
    if (certification?.certification) return certification.certification;
  }
  return "NR";
}

// Calculate match percentage from vote average (scale to Netflix-style percentage)
function calculateMatchPercentage(voteAverage: number): number {
  // TMDB votes are 0-10, convert to 60-99 range for Netflix-style match
  const minMatch = 60;
  const maxMatch = 99;
  const normalized = Math.min(Math.max(voteAverage / 10, 0), 1);
  return Math.round(minMatch + normalized * (maxMatch - minMatch));
}

// API fetch helper
async function tmdbFetch<T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<T> {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.append("api_key", TMDB_API_KEY || "");
  url.searchParams.append("language", "it-IT");

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const response = await fetch(url.toString(), {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Convert TMDB movie to our Movie interface
export function convertToMovie(
  item: TMDBMovie | TMDBMovieDetails,
  mediaType?: "movie" | "tv"
): import("./netflix-data").Movie {
  const isTV = mediaType === "tv" || item.media_type === "tv" || "first_air_date" in item && !("release_date" in item);
  const details = item as TMDBMovieDetails;

  return {
    id: item.id,
    title: item.title || item.name || "Unknown Title",
    overview: item.overview || "No description available.",
    backdrop_path: item.backdrop_path
      ? getImageUrl(item.backdrop_path, ImageSizes.backdrop.large)
      : "/images/netflix/backdrops/placeholder.jpg",
    poster_path: item.poster_path
      ? getImageUrl(item.poster_path, ImageSizes.poster.large)
      : "/images/netflix/backdrops/placeholder.jpg",
    release_date: item.release_date || item.first_air_date || "",
    vote_average: item.vote_average,
    genre_ids: item.genre_ids || details.genres?.map((g) => g.id) || [],
    media_type: isTV ? "tv" : "movie",
    runtime: details.runtime,
    seasons: details.number_of_seasons,
    maturity_rating: getMaturityRating(
      details.content_ratings,
      details.release_dates
    ),
    match_percentage: calculateMatchPercentage(item.vote_average),
  };
}

// API Functions

// Get trending content (movies and TV)
export async function getTrending(
  timeWindow: "day" | "week" = "week"
): Promise<TMDBMovie[]> {
  const response = await tmdbFetch<TMDBResponse<TMDBMovie>>(
    `/trending/all/${timeWindow}`
  );
  return response.results;
}

// Get popular movies
export async function getPopularMovies(): Promise<TMDBMovie[]> {
  const response = await tmdbFetch<TMDBResponse<TMDBMovie>>("/movie/popular");
  return response.results;
}

// Get popular TV shows
export async function getPopularTVShows(): Promise<TMDBMovie[]> {
  const response = await tmdbFetch<TMDBResponse<TMDBMovie>>("/tv/popular");
  return response.results.map((item) => ({ ...item, media_type: "tv" as const }));
}

// Get now playing movies
export async function getNowPlayingMovies(): Promise<TMDBMovie[]> {
  const response = await tmdbFetch<TMDBResponse<TMDBMovie>>("/movie/now_playing");
  return response.results;
}

// Get top rated movies
export async function getTopRatedMovies(): Promise<TMDBMovie[]> {
  const response = await tmdbFetch<TMDBResponse<TMDBMovie>>("/movie/top_rated");
  return response.results;
}

// Get top rated TV shows
export async function getTopRatedTVShows(): Promise<TMDBMovie[]> {
  const response = await tmdbFetch<TMDBResponse<TMDBMovie>>("/tv/top_rated");
  return response.results.map((item) => ({ ...item, media_type: "tv" as const }));
}

// Get movies by genre
export async function getMoviesByGenre(genreId: number): Promise<TMDBMovie[]> {
  const response = await tmdbFetch<TMDBResponse<TMDBMovie>>("/discover/movie", {
    with_genres: genreId.toString(),
    sort_by: "popularity.desc",
  });
  return response.results;
}

// Get TV shows by genre
export async function getTVShowsByGenre(genreId: number): Promise<TMDBMovie[]> {
  const response = await tmdbFetch<TMDBResponse<TMDBMovie>>("/discover/tv", {
    with_genres: genreId.toString(),
    sort_by: "popularity.desc",
  });
  return response.results.map((item) => ({ ...item, media_type: "tv" as const }));
}

// Get Netflix originals (network ID 213 is Netflix)
export async function getNetflixOriginals(): Promise<TMDBMovie[]> {
  const response = await tmdbFetch<TMDBResponse<TMDBMovie>>("/discover/tv", {
    with_networks: "213",
    sort_by: "popularity.desc",
  });
  return response.results.map((item) => ({ ...item, media_type: "tv" as const }));
}

// Get movie details with credits and videos
export async function getMovieDetails(movieId: number): Promise<TMDBMovieDetails> {
  return tmdbFetch<TMDBMovieDetails>(`/movie/${movieId}`, {
    append_to_response: "credits,videos,similar,recommendations,release_dates",
  });
}

// Get TV show details with credits and videos
export async function getTVShowDetails(tvId: number): Promise<TMDBMovieDetails> {
  return tmdbFetch<TMDBMovieDetails>(`/tv/${tvId}`, {
    append_to_response: "credits,videos,similar,recommendations,content_ratings",
  });
}

// Get videos (trailers) for a movie
export async function getMovieVideos(movieId: number): Promise<TMDBVideo[]> {
  const response = await tmdbFetch<{ results: TMDBVideo[] }>(
    `/movie/${movieId}/videos`
  );
  return response.results;
}

// Get videos (trailers) for a TV show
export async function getTVShowVideos(tvId: number): Promise<TMDBVideo[]> {
  const response = await tmdbFetch<{ results: TMDBVideo[] }>(`/tv/${tvId}/videos`);
  return response.results;
}

// Get the best trailer for a movie/show
export function getBestTrailer(videos: TMDBVideo[]): TMDBVideo | null {
  // Priority: Official Trailer > Trailer > Teaser > any video
  const sortedVideos = [...videos].sort((a, b) => {
    const priority = (v: TMDBVideo) => {
      if (v.type === "Trailer" && v.official) return 4;
      if (v.type === "Trailer") return 3;
      if (v.type === "Teaser") return 2;
      return 1;
    };
    return priority(b) - priority(a);
  });

  // Prefer YouTube videos
  const youtubeVideos = sortedVideos.filter((v) => v.site === "YouTube");
  return youtubeVideos[0] || sortedVideos[0] || null;
}

// Get YouTube embed URL for a video
export function getYouTubeEmbedUrl(videoKey: string): string {
  return `https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=0&controls=1&rel=0`;
}

// Get YouTube thumbnail URL
export function getYouTubeThumbnailUrl(
  videoKey: string,
  quality: "default" | "hqdefault" | "mqdefault" | "sddefault" | "maxresdefault" = "hqdefault"
): string {
  return `https://img.youtube.com/vi/${videoKey}/${quality}.jpg`;
}

// Search movies and TV shows
export async function searchMulti(query: string): Promise<TMDBMovie[]> {
  const response = await tmdbFetch<TMDBResponse<TMDBMovie>>("/search/multi", {
    query,
    include_adult: "false",
  });
  // Filter to only movies and TV shows
  return response.results.filter(
    (item) => item.media_type === "movie" || item.media_type === "tv"
  );
}

// Get all genres
export async function getGenres(): Promise<{
  movieGenres: TMDBGenre[];
  tvGenres: TMDBGenre[];
}> {
  const [movieGenres, tvGenres] = await Promise.all([
    tmdbFetch<{ genres: TMDBGenre[] }>("/genre/movie/list"),
    tmdbFetch<{ genres: TMDBGenre[] }>("/genre/tv/list"),
  ]);
  return {
    movieGenres: movieGenres.genres,
    tvGenres: tvGenres.genres,
  };
}

// Genre IDs for common categories
export const GenreIds = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  fantasy: 14,
  history: 36,
  horror: 27,
  music: 10402,
  mystery: 9648,
  romance: 10749,
  scienceFiction: 878,
  tvMovie: 10770,
  thriller: 53,
  war: 10752,
  western: 37,
  // TV specific
  actionAdventure: 10759,
  kids: 10762,
  news: 10763,
  reality: 10764,
  sciFiFantasy: 10765,
  soap: 10766,
  talk: 10767,
  warPolitics: 10768,
} as const;
