"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/netflix/video-player";
import { Movie } from "@/lib/netflix-data";

// Kids content (mock data)
const kidsContent: Movie[] = [
  {
    id: 901,
    title: "Paw Patrol: The Movie",
    overview: "Ryder and the pups are called to Adventure City to stop Mayor Humdinger from turning the bustling metropolis into a state of chaos.",
    backdrop_path: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80",
    poster_path: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
    release_date: "2021-08-20",
    vote_average: 7.2,
    genre_ids: [16, 10751, 12],
    media_type: "movie",
    runtime: 88,
    maturity_rating: "G",
    match_percentage: 95,
  },
  {
    id: 902,
    title: "Cocomelon",
    overview: "Learn letters, numbers, animal sounds, colors, and more with JJ in this sing-along series that's great for little ones.",
    backdrop_path: "https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=1920&q=80",
    poster_path: "https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=500&q=80",
    release_date: "2020-06-01",
    vote_average: 6.8,
    genre_ids: [16, 10751],
    media_type: "tv",
    seasons: 8,
    maturity_rating: "TV-Y",
    match_percentage: 98,
  },
  {
    id: 903,
    title: "Bluey",
    overview: "Bluey is an inexhaustible six year-old Blue Heeler dog, who loves to play and turns everyday family life into extraordinary adventures.",
    backdrop_path: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=1920&q=80",
    poster_path: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=500&q=80",
    release_date: "2018-10-01",
    vote_average: 9.0,
    genre_ids: [16, 10751, 35],
    media_type: "tv",
    seasons: 3,
    maturity_rating: "TV-Y",
    match_percentage: 99,
  },
  {
    id: 904,
    title: "Moana",
    overview: "In ancient Polynesia, when a terrible curse incurred by the Demigod Maui reaches Moana's island, she answers the Ocean's call to seek out the Demigod to set things right.",
    backdrop_path: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80",
    poster_path: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80",
    release_date: "2016-11-23",
    vote_average: 8.1,
    genre_ids: [16, 10751, 12, 14],
    media_type: "movie",
    runtime: 107,
    maturity_rating: "PG",
    match_percentage: 97,
  },
  {
    id: 905,
    title: "Encanto",
    overview: "A Colombian teenage girl has to face the frustration of being the only member of her family without magical powers.",
    backdrop_path: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
    poster_path: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80",
    release_date: "2021-11-24",
    vote_average: 7.7,
    genre_ids: [16, 10751, 14, 35],
    media_type: "movie",
    runtime: 102,
    maturity_rating: "PG",
    match_percentage: 96,
  },
  {
    id: 906,
    title: "Luca",
    overview: "On the Italian Riviera, an unlikely but strong friendship grows between a human being and a sea monster disguised as a human.",
    backdrop_path: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1920&q=80",
    poster_path: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=500&q=80",
    release_date: "2021-06-17",
    vote_average: 7.8,
    genre_ids: [16, 10751, 14, 35],
    media_type: "movie",
    runtime: 95,
    maturity_rating: "PG",
    match_percentage: 94,
  },
];

const featuredKids = kidsContent[2]; // Bluey as featured

export default function KidsPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingMovie, setPlayingMovie] = useState<Movie | null>(null);

  const handlePlay = (movie: Movie) => {
    setPlayingMovie(movie);
    setIsPlaying(true);
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
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e]">
      {/* Kids Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#1a1a2e] to-transparent">
        <div className="flex items-center justify-between px-4 md:px-12 py-4">
          <Link href="/" className="flex items-center gap-2">
            <svg
              viewBox="0 0 111 30"
              className="h-6 md:h-8 fill-[#e50914]"
              aria-label="Netflix"
            >
              <path d="M105.062 14.28L111 30c-1.75-.25-3.499-.563-5.28-.845l-3.345-8.686-3.437 7.969c-1.687-.282-3.344-.376-5.031-.595l6.031-13.75L94.468 0h5.063l3.062 7.874L105.875 0h5.124l-5.937 14.28zM90.47 0h-4.594v27.25c1.5.094 3.062.156 4.594.343V0zm-8.563 26.937c-4.187-.281-8.375-.53-12.656-.625V0h4.687v21.875c2.688.062 5.375.28 7.969.405v4.657zM64.25 10.657v4.687h-6.406V26H53.22V0h13.125v4.687h-8.5v5.97h6.406zm-18.906-5.97V26.25c-1.563 0-3.156 0-4.688.062V4.687h-4.844V0h14.406v4.687h-4.874zM30.75 15.593c-2.062 0-4.5 0-6.25.095v6.968c2.75-.188 5.5-.406 8.281-.5v4.5l-12.968 1.032V0H32.78v4.687H24.5V11c1.813 0 4.594-.094 6.25-.094v4.688zM4.78 12.968v16.375C3.094 29.531 1.593 29.75 0 30V0h4.469l6.093 17.032V0h4.688v28.062c-1.656.282-3.344.376-5.125.625L4.78 12.968z" />
            </svg>
            <span className="text-[#e50914] font-bold text-xl tracking-wider">KIDS</span>
          </Link>

          <Link
            href="/"
            className="text-white text-sm hover:text-gray-300 transition-colors"
          >
            Exit Kids
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-[70vh] pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${featuredKids.backdrop_path})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e]/90 via-[#1a1a2e]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#16213e] via-transparent to-[#1a1a2e]/50" />

        <div className="relative z-10 h-full flex flex-col justify-center px-4 md:px-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                #1 for Kids
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {featuredKids.title}
            </h1>

            <p className="text-lg text-gray-200 mb-6 line-clamp-3">
              {featuredKids.overview}
            </p>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => handlePlay(featuredKids)}
                className="bg-white hover:bg-white/80 text-black font-semibold px-8 py-6 text-lg rounded-full"
              >
                <Play className="h-6 w-6 mr-2 fill-black" />
                Play
              </Button>
            </div>
          </div>
        </div>

        {/* Fun decorative elements */}
        <div className="absolute bottom-10 right-10 hidden lg:block">
          <div className="text-8xl">🎈</div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="relative z-10 -mt-20 pb-20 px-4 md:px-12">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center">
          Popular with Kids
          <ChevronRight className="h-6 w-6 ml-1" />
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {kidsContent.map((item) => (
            <button
              key={item.id}
              onClick={() => handlePlay(item)}
              className="group relative aspect-video rounded-lg overflow-hidden bg-[#2a2a4a] hover:scale-105 transition-transform duration-300"
            >
              <img
                src={item.backdrop_path}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-white font-semibold text-sm truncate">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-300 mt-1">
                  <span className="bg-yellow-400 text-black px-1 rounded text-[10px] font-bold">
                    {item.maturity_rating}
                  </span>
                  {item.seasons ? `${item.seasons} Seasons` : `${item.runtime}m`}
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                  <Play className="h-7 w-7 text-black fill-black ml-1" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Characters Section */}
        <div className="mt-16">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
            Browse by Character
          </h2>

          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {["🦁", "🐶", "🦄", "🐱", "🐰", "🦊", "🐻", "🐼"].map((emoji, index) => (
              <button
                key={index}
                className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl md:text-5xl hover:scale-110 transition-transform"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Age Groups */}
        <div className="mt-16">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
            Shows & Movies for Ages
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { age: "0-2", color: "from-pink-400 to-rose-500", emoji: "👶" },
              { age: "3-4", color: "from-purple-400 to-indigo-500", emoji: "🧒" },
              { age: "5-7", color: "from-blue-400 to-cyan-500", emoji: "👦" },
              { age: "8-12", color: "from-green-400 to-emerald-500", emoji: "🧑" },
            ].map((group) => (
              <button
                key={group.age}
                className={`p-6 rounded-xl bg-gradient-to-br ${group.color} text-white font-bold text-xl hover:scale-105 transition-transform flex flex-col items-center gap-2`}
              >
                <span className="text-4xl">{group.emoji}</span>
                <span>Ages {group.age}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
