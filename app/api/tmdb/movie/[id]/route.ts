import { NextRequest, NextResponse } from "next/server";
import {
  getMovieDetails,
  convertToMovie,
  getBestTrailer,
  getYouTubeEmbedUrl,
  getImageUrl,
  ImageSizes,
} from "@/lib/tmdb";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const movieId = parseInt(id, 10);

    if (isNaN(movieId)) {
      return NextResponse.json({ error: "Invalid movie ID" }, { status: 400 });
    }

    const details = await getMovieDetails(movieId);
    const movie = convertToMovie(details, "movie");

    // Get best trailer
    const trailer = details.videos?.results
      ? getBestTrailer(details.videos.results)
      : null;

    // Get cast (top 10)
    const cast = details.credits?.cast?.slice(0, 10).map((c) => ({
      id: c.id,
      name: c.name,
      character: c.character,
      profile_path: c.profile_path
        ? getImageUrl(c.profile_path, ImageSizes.profile.medium)
        : null,
    }));

    // Get director
    const director = details.credits?.crew?.find((c) => c.job === "Director");

    // Get similar movies
    const similar = details.similar?.results?.slice(0, 12).map((m) => convertToMovie(m, "movie"));

    // Get recommendations
    const recommendations = details.recommendations?.results
      ?.slice(0, 12)
      .map((m) => convertToMovie(m, "movie"));

    return NextResponse.json({
      ...movie,
      tagline: details.tagline,
      trailer: trailer
        ? {
            key: trailer.key,
            name: trailer.name,
            embedUrl: getYouTubeEmbedUrl(trailer.key),
            site: trailer.site,
          }
        : null,
      cast,
      director: director?.name,
      similar,
      recommendations,
      allVideos: details.videos?.results?.map((v) => ({
        key: v.key,
        name: v.name,
        type: v.type,
        site: v.site,
      })),
    });
  } catch (error) {
    console.error("TMDB Movie Details Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch movie details" },
      { status: 500 }
    );
  }
}
