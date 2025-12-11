import { NextRequest, NextResponse } from "next/server";
import {
  getTVShowDetails,
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
    const tvId = parseInt(id, 10);

    if (isNaN(tvId)) {
      return NextResponse.json({ error: "Invalid TV show ID" }, { status: 400 });
    }

    const details = await getTVShowDetails(tvId);
    const show = convertToMovie(details, "tv");

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

    // Get creators
    const creators = details.credits?.crew
      ?.filter((c) => c.job === "Creator" || c.job === "Executive Producer")
      .slice(0, 3)
      .map((c) => c.name);

    // Get similar shows
    const similar = details.similar?.results?.slice(0, 12).map((m) => convertToMovie(m, "tv"));

    // Get recommendations
    const recommendations = details.recommendations?.results
      ?.slice(0, 12)
      .map((m) => convertToMovie(m, "tv"));

    return NextResponse.json({
      ...show,
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
      creators,
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
    console.error("TMDB TV Details Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch TV show details" },
      { status: 500 }
    );
  }
}
