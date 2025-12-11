"use client";

import { useEffect } from "react";
import { X, Play, Plus, ThumbsUp, ThumbsDown, Share2, Check } from "lucide-react";
import { Movie, getGenreNames, trendingNow } from "@/lib/netflix-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  onPlay?: (movie: Movie) => void;
}

// Mock episodes for TV shows
const mockEpisodes = [
  {
    number: 1,
    title: "Chapter One: The Vanishing of Will Byers",
    duration: "49m",
    description:
      "On his way home from a friend's house, young Will sees something terrifying. Nearby, a sinister secret lurks in the depths of a government lab.",
    thumbnail: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&q=80",
  },
  {
    number: 2,
    title: "Chapter Two: The Weirdo on Maple Street",
    duration: "56m",
    description:
      "Lucas, Mike and Dustin try to talk to the girl they found in the woods. Hopper questions an anxious Joyce about an unsettling phone call.",
    thumbnail: "https://images.unsplash.com/photo-1509248961895-40216855ee25?w=400&q=80",
  },
  {
    number: 3,
    title: "Chapter Three: Holly, Jolly",
    duration: "52m",
    description:
      "An increasingly concerned Nancy looks for Barb and finds out what Jonathan's been up to. Joyce is convinced Will is trying to talk to her.",
    thumbnail: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=400&q=80",
  },
  {
    number: 4,
    title: "Chapter Four: The Body",
    duration: "51m",
    description:
      "Refusing to believe Will is dead, Joyce tries to connect with her son. The boys give Eleven a makeover. Nancy and Jonathan form an unlikely alliance.",
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&q=80",
  },
  {
    number: 5,
    title: "Chapter Five: The Flea and the Acrobat",
    duration: "52m",
    description:
      "Hopper breaks into the lab while Nancy and Jonathan confront the force that took Will. The boys ask Mr. Clarke about other dimensions.",
    thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80",
  },
];

export function MovieModal({ movie, isOpen, onClose, onPlay }: MovieModalProps) {
  const genres = movie ? getGenreNames(movie.genre_ids) : [];

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!movie || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="absolute inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 top-8 md:top-12 max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg bg-[#181818] shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#181818] flex items-center justify-center hover:bg-gray-700 transition-colors"
        >
          <X className="h-5 w-5 text-white" />
        </button>

        {/* Hero Section */}
        <div className="relative aspect-video">
          <img
            src={movie.backdrop_path}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/30" />

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {movie.title}
            </h1>

            <div className="flex items-center gap-3 flex-wrap">
              <Button
                onClick={() => onPlay?.(movie)}
                className="bg-white hover:bg-white/80 text-black font-semibold px-6 py-5 text-base rounded"
              >
                <Play className="h-5 w-5 mr-2 fill-black" />
                Play
              </Button>
              <button className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors bg-black/30">
                <Plus className="h-5 w-5 text-white" />
              </button>
              <button className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors bg-black/30">
                <ThumbsUp className="h-4 w-4 text-white" />
              </button>
              <button className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors bg-black/30">
                <ThumbsDown className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6 md:p-10 pt-0 md:pt-0">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="md:col-span-2 space-y-4">
              {/* Metadata */}
              <div className="flex items-center gap-3 text-sm flex-wrap">
                <span className="text-green-500 font-semibold">
                  {movie.match_percentage}% Match
                </span>
                <span className="text-gray-400">
                  {new Date(movie.release_date).getFullYear()}
                </span>
                <span className="border border-gray-500 px-1 text-xs text-gray-400">
                  {movie.maturity_rating}
                </span>
                {movie.seasons ? (
                  <span className="text-gray-400">
                    {movie.seasons} Season{movie.seasons > 1 ? "s" : ""}
                  </span>
                ) : (
                  <span className="text-gray-400">
                    {movie.runtime && `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
                  </span>
                )}
                <span className="border border-gray-500 px-1 text-xs text-gray-400">
                  HD
                </span>
                <span className="border border-gray-500 px-1 text-xs text-gray-400">
                  5.1
                </span>
              </div>

              {/* Top 10 Badge */}
              <div className="flex items-center gap-2">
                <span className="text-[#e50914] font-bold text-2xl">#1</span>
                <span className="text-white text-lg">in TV Shows Today</span>
              </div>

              {/* Description */}
              <p className="text-gray-200 text-base leading-relaxed">
                {movie.overview}
              </p>
            </div>

            {/* Right Column - Additional Info */}
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-500">Cast: </span>
                <span className="text-gray-300">
                  Millie Bobby Brown, Finn Wolfhard, Winona Ryder, David Harbour
                </span>
              </div>
              <div>
                <span className="text-gray-500">Genres: </span>
                <span className="text-gray-300">{genres.join(", ")}</span>
              </div>
              <div>
                <span className="text-gray-500">This show is: </span>
                <span className="text-gray-300">
                  Suspenseful, Exciting, Scary
                </span>
              </div>
            </div>
          </div>

          {/* Episodes Section (for TV shows) */}
          {movie.media_type === "tv" && (
            <div className="mt-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Episodes</h3>
                <select className="bg-[#242424] text-white text-sm px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-white">
                  <option>Season 1</option>
                  <option>Season 2</option>
                  <option>Season 3</option>
                  <option>Season 4</option>
                </select>
              </div>

              <div className="space-y-4">
                {mockEpisodes.map((episode, idx) => (
                  <div
                    key={episode.number}
                    className={cn(
                      "flex gap-4 p-4 rounded hover:bg-[#2a2a2a] transition-colors cursor-pointer group",
                      idx === 0 && "border border-gray-600"
                    )}
                  >
                    {/* Episode Number */}
                    <div className="flex-shrink-0 w-8 text-2xl text-gray-500 flex items-center justify-center">
                      {episode.number}
                    </div>

                    {/* Thumbnail */}
                    <div className="relative flex-shrink-0 w-32 aspect-video rounded overflow-hidden">
                      <img
                        src={episode.thumbnail}
                        alt={episode.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                        <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center">
                          <Play className="h-5 w-5 text-white fill-white" />
                        </div>
                      </div>
                    </div>

                    {/* Episode Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-white font-medium truncate">
                          {episode.title}
                        </h4>
                        <span className="text-gray-400 text-sm flex-shrink-0 ml-2">
                          {episode.duration}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {episode.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* More Like This Section */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-white mb-4">
              More Like This
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {trendingNow.slice(0, 6).map((item) => (
                <div
                  key={item.id}
                  className="bg-[#2a2a2a] rounded overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                >
                  <div className="relative aspect-video">
                    <img
                      src={item.backdrop_path}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-green-500 text-xs font-semibold">
                        {item.match_percentage}% Match
                      </span>
                      <span className="border border-gray-500 px-1 text-[10px] text-gray-400">
                        {item.maturity_rating}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs line-clamp-3">
                      {item.overview}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* About Section */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-white mb-4">
              About {movie.title}
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-500">Creators: </span>
                <span className="text-gray-300">The Duffer Brothers</span>
              </div>
              <div>
                <span className="text-gray-500">Cast: </span>
                <span className="text-gray-300">
                  Millie Bobby Brown, Finn Wolfhard, Winona Ryder, David Harbour,
                  Gaten Matarazzo, Caleb McLaughlin, Noah Schnapp, Sadie Sink
                </span>
              </div>
              <div>
                <span className="text-gray-500">Genres: </span>
                <span className="text-gray-300">{genres.join(", ")}</span>
              </div>
              <div>
                <span className="text-gray-500">This show is: </span>
                <span className="text-gray-300">
                  Suspenseful, Exciting, Scary, Ominous
                </span>
              </div>
              <div>
                <span className="text-gray-500">Maturity rating: </span>
                <span className="border border-gray-500 px-1 text-xs text-gray-400 mr-2">
                  {movie.maturity_rating}
                </span>
                <span className="text-gray-300">
                  fear, language, smoking, substances, violence
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
