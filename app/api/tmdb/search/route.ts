import { NextRequest, NextResponse } from "next/server";
import { searchMulti, convertToMovie } from "@/lib/tmdb";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ results: [] });
    }

    const results = await searchMulti(query);
    const movies = results.map((m) => convertToMovie(m, m.media_type));

    return NextResponse.json({ results: movies });
  } catch (error) {
    console.error("TMDB Search Error:", error);
    return NextResponse.json(
      { error: "Failed to search content" },
      { status: 500 }
    );
  }
}
