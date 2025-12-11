"use client";

import { useState } from "react";
import Link from "next/link";
import { NetflixHeader } from "@/components/netflix/netflix-header";
import { MovieCard } from "@/components/netflix/movie-card";
import { MovieModal } from "@/components/netflix/movie-modal";
import { VideoPlayer } from "@/components/netflix/video-player";
import {
  Movie,
  UserProfile,
  trendingNow,
  popularOnNetflix,
  userProfiles,
} from "@/lib/netflix-data";

// Mock "My List" data - combination of some trending and popular
const myListContent = [...trendingNow.slice(0, 4), ...popularOnNetflix.slice(0, 4)];

export default function MyListPage() {
  const [currentProfile] = useState<UserProfile>(userProfiles[0]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingMovie, setPlayingMovie] = useState<Movie | null>(null);

  const handlePlay = (movie: Movie) => {
    setPlayingMovie(movie);
    setIsPlaying(true);
    setIsModalOpen(false);
  };

  const handleMoreInfo = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  if (isPlaying && playingMovie) {
    return (
      <VideoPlayer
        movie={playingMovie}
        onClose={() => {
          setIsPlaying(false);
          setPlayingMovie(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#141414]">
      <NetflixHeader currentProfile={currentProfile} />

      <main className="pt-24 pb-20 px-4 md:px-12">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-8">My List</h1>

        {myListContent.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-3">
            {myListContent.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onPlay={handlePlay}
                onMoreInfo={handleMoreInfo}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl mb-4">
              You haven't added any titles to your list yet
            </p>
            <Link
              href="/netflix"
              className="text-white underline hover:text-gray-300 transition-colors"
            >
              Browse titles to add to your list
            </Link>
          </div>
        )}
      </main>

      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedMovie(null);
        }}
        onPlay={handlePlay}
      />
    </div>
  );
}
