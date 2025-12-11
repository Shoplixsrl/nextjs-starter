"use client";

import { Movie } from "@/lib/netflix-data";
import { MovieCard } from "./movie-card";

interface SearchResultsProps {
  query: string;
  results: Movie[];
  onPlay?: (movie: Movie) => void;
  onMoreInfo?: (movie: Movie) => void;
}

export function SearchResults({ query, results, onPlay, onMoreInfo }: SearchResultsProps) {
  if (!query) return null;

  return (
    <div className="min-h-screen bg-[#141414] pt-24 pb-12 px-4 md:px-12">
      <h2 className="text-xl text-gray-400 mb-6">
        {results.length > 0 ? (
          <>
            Results for: <span className="text-white">"{query}"</span>
          </>
        ) : (
          <>
            No results found for: <span className="text-white">"{query}"</span>
          </>
        )}
      </h2>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-3">
          {results.map((movie) => (
            <div key={movie.id} className="aspect-video">
              <MovieCard
                movie={movie}
                onPlay={onPlay}
                onMoreInfo={onMoreInfo}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-400 mb-4">
            Your search for "{query}" did not have any matches.
          </p>
          <p className="text-gray-500 text-sm">
            Suggestions:
          </p>
          <ul className="text-gray-500 text-sm mt-2 space-y-1">
            <li>• Try different keywords</li>
            <li>• Looking for a movie or TV show?</li>
            <li>• Try using a movie, TV show title, an actor or director</li>
            <li>• Try a genre, like comedy, romance, sports, or drama</li>
          </ul>
        </div>
      )}
    </div>
  );
}
