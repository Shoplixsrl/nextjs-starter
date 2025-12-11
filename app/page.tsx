"use client";

import { useState, useEffect, useCallback } from "react";
import { NetflixHeader } from "@/components/netflix/netflix-header";
import { HeroBanner } from "@/components/netflix/hero-banner";
import { ContentRow } from "@/components/netflix/content-row";
import { MovieModal } from "@/components/netflix/movie-modal";
import { VideoPlayer } from "@/components/netflix/video-player";
import { ProfileSelector } from "@/components/netflix/profile-selector";
import { SearchResults } from "@/components/netflix/search-results";
import { useTMDBBrowse, useTMDBSearch } from "@/hooks/use-tmdb";
import {
  Movie,
  UserProfile,
  userProfiles,
  // Fallback data for loading/error states
  featuredContent as fallbackFeatured,
  contentRows as fallbackRows,
  top10 as fallbackTop10,
} from "@/lib/netflix-data";

export default function Home() {
  // TMDB Data hooks
  const { data: tmdbData, loading: tmdbLoading, error: tmdbError } = useTMDBBrowse();
  const { results: tmdbSearchResults, search: tmdbSearch, clearSearch } = useTMDBSearch();

  // Start with default profile (first user)
  const [currentProfile, setCurrentProfile] = useState<UserProfile>(userProfiles[0]);
  const [showProfileSelector, setShowProfileSelector] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingMovie, setPlayingMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Build content rows from TMDB data
  const contentRows = tmdbData
    ? [
        { title: "Trending Now", data: tmdbData.trendingNow },
        { title: "Popular on Netflix", data: tmdbData.popularOnNetflix },
        { title: "New Releases", data: tmdbData.newReleases },
        { title: "Netflix Originals", data: tmdbData.netflixOriginals },
        { title: "Action & Adventure", data: tmdbData.actionAdventure },
        { title: "Comedy", data: tmdbData.comedy },
        { title: "Sci-Fi & Fantasy", data: tmdbData.sciFiFantasy },
        { title: "Documentaries", data: tmdbData.documentaries },
        { title: "Drama", data: tmdbData.drama },
      ]
    : fallbackRows;

  const featuredContent = tmdbData?.featuredContent || fallbackFeatured;
  const top10 = tmdbData?.top10 || fallbackTop10;

  // Handle profile selection
  const handleProfileSelect = (profile: UserProfile) => {
    setCurrentProfile(profile);
    setShowProfileSelector(false);
  };

  // Handle logout / switch profile
  const handleLogout = () => {
    setShowProfileSelector(true);
    setIsSearching(false);
    setSearchQuery("");
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

  // Handle search with TMDB
  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      if (query.trim()) {
        setIsSearching(true);
        tmdbSearch(query);
      } else {
        setIsSearching(false);
        clearSearch();
      }
    },
    [tmdbSearch, clearSearch]
  );

  // Show profile selector only on logout
  if (showProfileSelector) {
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
    <div className="min-h-screen bg-[#141414] overflow-x-hidden">
      {/* Header */}
      <NetflixHeader
        currentProfile={currentProfile}
        onSearch={handleSearch}
        onProfileClick={handleLogout}
      />

      {/* Loading State */}
      {tmdbLoading && !tmdbData && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      )}

      {/* Error State */}
      {tmdbError && !tmdbData && (
        <div className="flex flex-col items-center justify-center min-h-screen text-white">
          <p className="text-xl mb-4">Unable to load content</p>
          <p className="text-gray-400 text-sm">Using fallback data</p>
        </div>
      )}

      {/* Main Content */}
      {isSearching ? (
        <SearchResults
          query={searchQuery}
          results={tmdbSearchResults}
          onPlay={handlePlay}
          onMoreInfo={handleMoreInfo}
        />
      ) : (
        <main className="relative">
          {/* Hero Banner */}
          <HeroBanner
            content={featuredContent}
            onPlayClick={handlePlay}
            onInfoClick={handleMoreInfo}
          />

          {/* Content Rows */}
          <section className="relative z-10 -mt-40 md:-mt-52 pb-20 space-y-2">
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
          </section>

          {/* Footer */}
          <footer className="px-4 md:px-12 py-10 text-gray-500 text-sm">
            <div className="max-w-5xl">
              <div className="flex gap-4 mb-6">
                <a href="#" className="hover:text-gray-300">Facebook</a>
                <a href="#" className="hover:text-gray-300">Instagram</a>
                <a href="#" className="hover:text-gray-300">Twitter</a>
                <a href="#" className="hover:text-gray-300">YouTube</a>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 text-xs">
                <a href="#" className="hover:underline">Audio Description</a>
                <a href="#" className="hover:underline">Help Center</a>
                <a href="#" className="hover:underline">Gift Cards</a>
                <a href="#" className="hover:underline">Media Center</a>
                <a href="#" className="hover:underline">Investor Relations</a>
                <a href="#" className="hover:underline">Jobs</a>
                <a href="#" className="hover:underline">Terms of Use</a>
                <a href="#" className="hover:underline">Privacy</a>
                <a href="#" className="hover:underline">Legal Notices</a>
                <a href="#" className="hover:underline">Cookie Preferences</a>
                <a href="#" className="hover:underline">Corporate Information</a>
                <a href="#" className="hover:underline">Contact Us</a>
              </div>
              <button className="border border-gray-500 px-2 py-1 text-xs mb-4 hover:text-white">
                Service Code
              </button>
              <p className="text-xs">© 2024 Netflix Clone - Demo Project</p>
            </div>
          </footer>
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
