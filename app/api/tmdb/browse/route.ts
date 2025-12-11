import { NextResponse } from "next/server";
import {
  getTrending,
  getPopularMovies,
  getPopularTVShows,
  getNowPlayingMovies,
  getTopRatedMovies,
  getNetflixOriginals,
  getMoviesByGenre,
  getTVShowsByGenre,
  convertToMovie,
  GenreIds,
} from "@/lib/tmdb";

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    // Fetch all categories in parallel
    const [
      trending,
      popularMovies,
      popularTV,
      nowPlaying,
      topRated,
      netflixOriginals,
      actionMovies,
      comedyMovies,
      horrorMovies,
      documentaries,
      sciFi,
      drama,
    ] = await Promise.all([
      getTrending("week"),
      getPopularMovies(),
      getPopularTVShows(),
      getNowPlayingMovies(),
      getTopRatedMovies(),
      getNetflixOriginals(),
      getMoviesByGenre(GenreIds.action),
      getMoviesByGenre(GenreIds.comedy),
      getMoviesByGenre(GenreIds.horror),
      getMoviesByGenre(GenreIds.documentary),
      getMoviesByGenre(GenreIds.scienceFiction),
      getMoviesByGenre(GenreIds.drama),
    ]);

    // Convert to our Movie interface
    const data = {
      featuredContent: trending.slice(0, 5).map((m) => convertToMovie(m)),
      trendingNow: trending.slice(0, 20).map((m) => convertToMovie(m)),
      popularOnNetflix: [...popularMovies.slice(0, 10), ...popularTV.slice(0, 10)]
        .sort(() => Math.random() - 0.5)
        .slice(0, 20)
        .map((m) => convertToMovie(m, m.media_type)),
      newReleases: nowPlaying.slice(0, 20).map((m) => convertToMovie(m, "movie")),
      top10: topRated.slice(0, 10).map((m) => convertToMovie(m, "movie")),
      netflixOriginals: netflixOriginals.slice(0, 20).map((m) => convertToMovie(m, "tv")),
      actionAdventure: actionMovies.slice(0, 20).map((m) => convertToMovie(m, "movie")),
      comedy: comedyMovies.slice(0, 20).map((m) => convertToMovie(m, "movie")),
      horror: horrorMovies.slice(0, 20).map((m) => convertToMovie(m, "movie")),
      documentaries: documentaries.slice(0, 20).map((m) => convertToMovie(m, "movie")),
      sciFiFantasy: sciFi.slice(0, 20).map((m) => convertToMovie(m, "movie")),
      drama: drama.slice(0, 20).map((m) => convertToMovie(m, "movie")),
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("TMDB API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch content from TMDB" },
      { status: 500 }
    );
  }
}
