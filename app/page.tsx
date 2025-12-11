"use client";

import { useState } from "react";
import { NetflixHeader } from "@/components/netflix/netflix-header";
import { HeroBanner } from "@/components/netflix/hero-banner";
import { ContentRow } from "@/components/netflix/content-row";
import { MovieModal } from "@/components/netflix/movie-modal";
import { VideoPlayer } from "@/components/netflix/video-player";
import { ProfileSelector } from "@/components/netflix/profile-selector";
import { SearchResults } from "@/components/netflix/search-results";
import {
  Movie,
  UserProfile,
  featuredContent,
  contentRows,
  top10,
  searchContent,
} from "@/lib/netflix-data";

export default function Home() {
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingMovie, setPlayingMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Handle profile selection
  const handleProfileSelect = (profile: UserProfile) => {
    setCurrentProfile(profile);
  };

  // Handle play
  const handlePlay = (movie: Movie) => {
    setPlayingMovie(movie);
    setIsPlaying(true);
    setIsModalOpen(false);
  };

  // Handle more info
  const handleMoreInfo = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setIsSearching(true);
      const results = searchContent(query);
      setSearchResults(results);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  // Show profile selector if no profile selected
  if (!currentProfile) {
    return <ProfileSelector onSelectProfile={handleProfileSelect} />;
  }

  // Show video player if playing
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
      {/* Header */}
      <NetflixHeader
        currentProfile={currentProfile}
        onSearch={handleSearch}
        onProfileClick={() => setCurrentProfile(null)}
      />

      {/* Main Content */}
      {isSearching ? (
        <SearchResults
          query={searchQuery}
          results={searchResults}
          onPlay={handlePlay}
          onMoreInfo={handleMoreInfo}
        />
      ) : (
        <main>
          {/* Hero Banner */}
          <HeroBanner
            content={featuredContent}
            onPlayClick={handlePlay}
            onInfoClick={handleMoreInfo}
          />

          {/* Content Rows */}
          <div className="relative z-10 -mt-32 pb-20">
            {/* Top 10 Row */}
            <ContentRow
              title="Top 10 in Italy Today"
              movies={top10.slice(0, 10)}
              isTop10={true}
              onPlay={handlePlay}
              onMoreInfo={handleMoreInfo}
            />

            {/* Other Content Rows */}
            {contentRows.map((row) => (
              <ContentRow
                key={row.title}
                title={row.title}
                movies={row.data}
                onPlay={handlePlay}
                onMoreInfo={handleMoreInfo}
              />
            ))}
          </div>
        </main>
      )}

      {/* Movie Modal */}
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
