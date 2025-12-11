"use client";

import { useState, useEffect, useCallback } from "react";
import type { Movie } from "@/lib/netflix-data";

export interface TMDBBrowseData {
  featuredContent: Movie[];
  trendingNow: Movie[];
  popularOnNetflix: Movie[];
  newReleases: Movie[];
  top10: Movie[];
  netflixOriginals: Movie[];
  actionAdventure: Movie[];
  comedy: Movie[];
  horror: Movie[];
  documentaries: Movie[];
  sciFiFantasy: Movie[];
  drama: Movie[];
}

export interface MovieDetails extends Movie {
  tagline?: string;
  trailer?: {
    key: string;
    name: string;
    embedUrl: string;
    site: string;
  } | null;
  cast?: {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }[];
  director?: string;
  creators?: string[];
  similar?: Movie[];
  recommendations?: Movie[];
  allVideos?: {
    key: string;
    name: string;
    type: string;
    site: string;
  }[];
}

// Fetch all browse content
export function useTMDBBrowse() {
  const [data, setData] = useState<TMDBBrowseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch("/api/tmdb/browse");
        if (!response.ok) {
          throw new Error("Failed to fetch browse data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { data, loading, error };
}

// Fetch movie details
export function useMovieDetails(movieId: number | null, mediaType: "movie" | "tv" = "movie") {
  const [data, setData] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) {
      setData(null);
      return;
    }

    async function fetchData() {
      try {
        setLoading(true);
        const endpoint = mediaType === "tv" ? `/api/tmdb/tv/${movieId}` : `/api/tmdb/movie/${movieId}`;
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error("Failed to fetch details");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [movieId, mediaType]);

  return { data, loading, error };
}

// Search content
export function useTMDBSearch() {
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/tmdb/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error("Failed to search");
      }
      const data = await response.json();
      setResults(data.results || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return { results, loading, error, search, clearSearch };
}
